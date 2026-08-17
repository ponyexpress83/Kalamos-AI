import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { schedaSchema, type AnalysisResult } from "@/lib/schema";
import { publishers, getPublisher } from "@/config/publishers";
import { getManuscriptText, getManuscriptMeta } from "@/lib/manuscripts";
import { buildExcerpt } from "@/lib/extract";
import { analyzeHeuristic, type HeuristicPublisher } from "@/lib/heuristic";
import { verificaScheda, type CollanaAmmessa } from "@/lib/verifica";
import { consumaQuota, chiaveChiamante } from "@/lib/rate-limit";
import {
  MAX_TEXT_CHARS,
  MAX_PDF_BYTES,
  MAX_COSTO_USD,
  stimaCostoTesto,
  stimaCostoPdf,
  formattaUSD,
} from "@/lib/limiti";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Vercel Hobby limita le serverless function a 10s. Su Pro si può alzare a 60.
export const maxDuration = 60;

// Default rapido per la demo dal vivo. Su Pro puoi impostare
// ANTHROPIC_MODEL=claude-opus-4-8 per la massima qualità.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

const SYSTEM_PROMPT = `Sei un lettore editoriale senior italiano. Valuti manoscritti per case editrici trade. Sei rigoroso, concreto, mai compiacente. Non scrivi né riscrivi il libro: lo valuti. Rispetti il giudizio dell'editor: la tua è una raccomandazione, non una decisione. Rispondi SOLO con il JSON dello schema richiesto, in italiano.`;

interface AnalyzeBody {
  manuscriptId?: string;
  text?: string;
  pdfBase64?: string;
  fileName?: string;
  titolo?: string;
  publisherIds?: string[];
}

function publishersBlock(ids: string[]): {
  editori: string[];
  testo: string;
  heur: HeuristicPublisher[];
  ammesse: CollanaAmmessa[];
} {
  const scelti = ids
    .map((id) => getPublisher(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const testo = scelti
    .map((p) => {
      const collane = p.collane
        .map((c) => `    - ${c.nome}: ${c.descrizione}`)
        .join("\n");
      return `CASA EDITRICE: ${p.nome} — ${p.descrizione}\n  collane:\n${collane}`;
    })
    .join("\n\n");
  return {
    editori: scelti.map((p) => p.nome),
    testo,
    heur: scelti.map((p) => ({
      nome: p.nome,
      collane: p.collane.map((c) => ({ nome: c.nome, profilo: c.profilo })),
    })),
    // Whitelist per il controllo deterministico: solo queste collane esistono.
    ammesse: scelti.flatMap((p) =>
      p.collane.map((c) => ({ editore: p.nome, collana: c.nome })),
    ),
  };
}

function buildUserPrompt(testo: string, caseEditrici: string): string {
  return `Valuta il seguente manoscritto (o estratto) e produci la scheda di lettura strutturata.

CASE EDITRICI E LORO COLLANE (calcola un fit per OGNI collana di OGNI casa):
${caseEditrici}

Per ciascuna casa editrice individua la collana con il fit migliore. Popola "fit_collane" così: per OGNI casa includi la collana suggerita e AL MASSIMO 2 collane alternative della stessa casa (le più rilevanti) — quindi al massimo 3 voci per casa, non tutte le collane. Per ogni voce indica "editore" e "collana" con i nomi ESATTI qui sopra, uno "score" da 0 a 1 e una "motivazione": 1 frase per la collana suggerita, molto breve (max 10 parole) per le alternative. Lo stesso testo può avere score molto diversi tra collane e tra case: il fit misura il rapporto testo-collana.

Compila tutti gli altri campi dello schema. La sintesi sia di 4-6 frasi (trama/impianto, struttura, voce). Indica 2-3 comparable con il motivo del paragone. Sii concreto, sintetico e mai compiacente.

In "passaggio_a_sostegno" riporta UNA citazione LETTERALE del manoscritto (una o due frasi, copiate esattamente come sono nel testo, senza riscriverle) che sostiene il tuo giudizio sulla prosa e sul fit. L'editor deve poterla ritrovare nel testo: se non copi alla lettera, la scheda viene scartata.

=== TESTO DEL MANOSCRITTO ===
${testo}
=== FINE TESTO ===`;
}

/**
 * Token condiviso. Se `KALAMOS_API_TOKEN` è impostata, ogni richiesta deve
 * portarla. Se non è impostata, l'endpoint resta aperto com'è oggi, così il
 * deploy pubblico non si rompe.
 *
 * Nota di onestà: quando l'applicazione chiama sé stessa dal browser il token
 * viaggia nel bundle (`NEXT_PUBLIC_KALAMOS_API_TOKEN`), quindi non è un
 * segreto. Ferma l'uso da script esterni e il ciclo accidentale; non ferma chi
 * apre gli strumenti di sviluppo. Il segreto vero resta la chiave Anthropic,
 * che non lascia mai il server.
 */
function tokenValido(req: Request): boolean {
  const atteso = process.env.KALAMOS_API_TOKEN;
  if (!atteso) return true;
  const header = req.headers.get("x-kalamos-token");
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return header === atteso || bearer === atteso;
}

/** Se `KALAMOS_ALLOWED_ORIGIN` è impostata, filtra le richieste di altra origine. */
function origineAmmessa(req: Request): boolean {
  const ammessa = process.env.KALAMOS_ALLOWED_ORIGIN;
  if (!ammessa) return true;
  const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(ammessa).host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  // 1. Token condiviso, se configurato.
  if (!tokenValido(req)) {
    return NextResponse.json(
      { error: "Accesso non autorizzato: token mancante o errato." },
      { status: 401 },
    );
  }
  if (!origineAmmessa(req)) {
    return NextResponse.json(
      { error: "Richiesta rifiutata: origine non ammessa." },
      { status: 403 },
    );
  }

  // 2. Rate limit per chiamante, a finestra scorrevole.
  const quota = consumaQuota(chiaveChiamante(req));
  if (!quota.ammessa) {
    return NextResponse.json(
      {
        error: `Troppe analisi in poco tempo. Riprova fra ${quota.riprovaFraSecondi} secondi.`,
      },
      {
        status: 429,
        headers: { "retry-after": String(quota.riprovaFraSecondi ?? 60) },
      },
    );
  }

  let body: AnalyzeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  // 3. Tetti di dimensione, prima di qualunque elaborazione.
  if (body.text && body.text.length > MAX_TEXT_CHARS) {
    return NextResponse.json(
      {
        error: `Testo troppo lungo: ${body.text.length.toLocaleString("it-IT")} caratteri, il limite è ${MAX_TEXT_CHARS.toLocaleString("it-IT")}. Invia il manoscritto in più parti o carica un file.`,
      },
      { status: 413 },
    );
  }
  let pdfBuffer: Buffer | undefined;
  if (body.pdfBase64) {
    pdfBuffer = Buffer.from(body.pdfBase64, "base64");
    if (pdfBuffer.length > MAX_PDF_BYTES) {
      return NextResponse.json(
        {
          error: `PDF troppo grande: ${(pdfBuffer.length / 1024 / 1024).toFixed(1)} MB, il limite è ${(MAX_PDF_BYTES / 1024 / 1024).toFixed(0)} MB. Esporta il testo in .txt oppure invia una porzione.`,
        },
        { status: 413 },
      );
    }
  }

  const publisherIds =
    body.publisherIds && body.publisherIds.length > 0
      ? body.publisherIds
      : publishers.map((p) => p.id);
  const validIds = publisherIds.filter((id) => getPublisher(id));
  if (validIds.length === 0) {
    return NextResponse.json(
      { error: "Seleziona almeno una casa editrice valida." },
      { status: 400 },
    );
  }

  let testoCompleto: string | undefined;
  let titoloInput = body.titolo;
  let autore: string | undefined;

  if (body.manuscriptId) {
    const meta = getManuscriptMeta(body.manuscriptId);
    if (!meta) {
      return NextResponse.json({ error: "Manoscritto demo non trovato." }, { status: 404 });
    }
    titoloInput = meta.titolo;
    autore = meta.autore;
    testoCompleto = getManuscriptText(body.manuscriptId);
    if (!testoCompleto) {
      return NextResponse.json({ error: "Impossibile leggere il manoscritto demo." }, { status: 500 });
    }
  } else if (body.text && body.text.trim().length > 0) {
    testoCompleto = body.text;
  } else if (!body.pdfBase64) {
    return NextResponse.json(
      { error: "Incolla un testo, carica un file o scegli un manoscritto demo." },
      { status: 400 },
    );
  }

  const { editori, testo: caseEditrici, heur, ammesse } = publishersBlock(validIds);

  // 4. Tetto di spesa: la stima si fa PRIMA di chiamare l'API, non dopo.
  //    Sul testo il costo è già limitato dall'estratto; sui PDF no, perché il
  //    documento viene passato intero al modello: è lì che sta il rischio.
  const stima = pdfBuffer
    ? stimaCostoPdf(pdfBuffer, MODEL)
    : stimaCostoTesto((testoCompleto ?? "").length, MODEL);
  if (stima.costoUSD > MAX_COSTO_USD) {
    const dettaglio = stima.pagine
      ? ` Il documento risulta di circa ${stima.pagine} pagine (stima da ${stima.metodo === "marcatori" ? "struttura del PDF" : "dimensione del file"}).`
      : "";
    return NextResponse.json(
      {
        error: `Analisi troppo costosa: stimati ${formattaUSD(stima.costoUSD)} contro un tetto di ${formattaUSD(MAX_COSTO_USD)}.${dettaglio} Carica il testo in .txt — viene valutato su estratto e costa una frazione — oppure alza il tetto in configurazione.`,
        stima: { tokenInput: stima.tokenInput, costoUSD: Number(stima.costoUSD.toFixed(4)) },
      },
      { status: 413 },
    );
  }


  // Chiave API. Senza chiave, se abbiamo il testo ripieghiamo sull'euristica
  // offline (fonte "simulata"). Per i soli PDF (niente testo estratto qui) serve la chiave.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    if (testoCompleto) {
      return NextResponse.json(
        analyzeHeuristic(testoCompleto, { titolo: titoloInput, autore, publishers: heur }),
      );
    }
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY non configurata. Imposta la chiave per l'analisi dal vivo, oppure usa la modalità dimostrativa offline (testo/.txt).",
      },
      { status: 503 },
    );
  }

  const client = new Anthropic({ apiKey, timeout: 55_000, maxRetries: 1 });
  const t0 = Date.now();

  try {
    let parsed;
    let usage: { input_tokens: number; output_tokens: number } | undefined;
    let suEstratto = false;
    let paroleTotali = 0;
    let paroleInviate = 0;
    // Testo effettivamente passato al modello: serve a verificare la citazione.
    let testoInviato: string | undefined;

    if (body.pdfBase64) {
      const userPrompt = buildUserPrompt(
        "(il testo del manoscritto è allegato come documento PDF)",
        caseEditrici,
      );
      const res = await client.messages.parse({
        model: MODEL,
        max_tokens: 5000,
        system: SYSTEM_PROMPT,
        thinking: { type: "disabled" },
        output_config: { format: zodOutputFormat(schedaSchema) },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: { type: "base64", media_type: "application/pdf", data: body.pdfBase64 },
              },
              { type: "text", text: userPrompt },
            ],
          },
        ],
      });
      parsed = res.parsed_output;
      usage = { input_tokens: res.usage.input_tokens, output_tokens: res.usage.output_tokens };
    } else {
      const ex = buildExcerpt(testoCompleto as string);
      suEstratto = ex.suEstratto;
      paroleTotali = ex.paroleTotali;
      paroleInviate = ex.paroleInviate;
      testoInviato = ex.testo;
      const userPrompt = buildUserPrompt(ex.testo, caseEditrici);
      const res = await client.messages.parse({
        model: MODEL,
        max_tokens: 5000,
        system: SYSTEM_PROMPT,
        thinking: { type: "disabled" },
        output_config: { format: zodOutputFormat(schedaSchema) },
        messages: [{ role: "user", content: userPrompt }],
      });
      parsed = res.parsed_output;
      usage = { input_tokens: res.usage.input_tokens, output_tokens: res.usage.output_tokens };
    }

    if (!parsed) {
      return NextResponse.json(
        { error: "Il modello non ha prodotto una scheda valida. Riprova." },
        { status: 502 },
      );
    }

    // Controlli deterministici: la collana deve esistere davvero nel catalogo,
    // la citazione deve trovarsi nel testo caricato. Se il modello ha inventato
    // tutte le collane, l'errore risale al catch e si ripiega sull'euristica.
    const { scheda, controlli } = verificaScheda(parsed, {
      collaneAmmesse: ammesse,
      testoInviato,
    });

    const result: AnalysisResult = {
      scheda,
      meta: {
        titolo_input: titoloInput || scheda.titolo_presunto,
        autore,
        parole: paroleTotali,
        valutato_su_estratto: suEstratto,
        parole_inviate: paroleInviate,
        editori_richiesti: editori,
        tempo_secondi: Math.max(1, Math.round((Date.now() - t0) / 1000)),
        fonte: "live",
        modello: MODEL,
        usage,
        controlli,
      },
    };

    return NextResponse.json(result);
  } catch (err) {
    // Chiave errata → la segnaliamo. Altri errori → se abbiamo il testo,
    // ripieghiamo sull'euristica offline per non lasciare la demo senza risposta.
    if (!(err instanceof Anthropic.AuthenticationError) && testoCompleto) {
      return NextResponse.json(
        analyzeHeuristic(testoCompleto, { titolo: titoloInput, autore, publishers: heur }),
      );
    }
    const status =
      err instanceof Anthropic.AuthenticationError
        ? 401
        : err instanceof Anthropic.RateLimitError
          ? 429
          : err instanceof Anthropic.APIError
            ? err.status || 502
            : 500;
    const message =
      err instanceof Anthropic.AuthenticationError
        ? "Chiave API non valida."
        : err instanceof Anthropic.RateLimitError
          ? "Troppe richieste: riprova tra qualche secondo."
          : err instanceof Anthropic.APIConnectionError
            ? "Impossibile raggiungere il servizio di analisi. Controlla la connessione."
            : "Errore durante l'analisi. Riprova.";
    return NextResponse.json({ error: message }, { status });
  }
}
