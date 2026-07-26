import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { schedaSchema, type AnalysisResult } from "@/lib/schema";
import { publishers, getPublisher } from "@/config/publishers";
import { getManuscriptText, getManuscriptMeta } from "@/lib/manuscripts";
import { buildExcerpt } from "@/lib/extract";
import { analyzeHeuristic, type HeuristicPublisher } from "@/lib/heuristic";

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
  };
}

function buildUserPrompt(testo: string, caseEditrici: string): string {
  return `Valuta il seguente manoscritto (o estratto) e produci la scheda di lettura strutturata.

CASE EDITRICI E LORO COLLANE (calcola un fit per OGNI collana di OGNI casa):
${caseEditrici}

Per OGNI collana elencata sopra calcola uno score da 0 a 1 (1 = fit perfetto) e una motivazione di 1-2 frasi specifica di quella collana. Popola "fit_collane" con un elemento per ciascuna collana, indicando "editore" e "collana" con i nomi ESATTI qui sopra. Per ciascuna casa editrice, la collana con lo score più alto è quella che stai suggerendo: assicurati che il migliore fit rifletta davvero l'identità della collana. Lo stesso testo può avere score molto diversi tra collane e tra case: il fit misura il rapporto testo-collana, non una qualità astratta.

Compila tutti i campi dello schema. La sintesi sia di 4-6 frasi (trama/impianto, struttura, voce). Indica 2-3 comparable con il motivo del paragone. Sii concreto e mai compiacente.

=== TESTO DEL MANOSCRITTO ===
${testo}
=== FINE TESTO ===`;
}

export async function POST(req: Request) {
  let body: AnalyzeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
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

  const { editori, testo: caseEditrici, heur } = publishersBlock(validIds);

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
    let suEstratto = false;
    let paroleTotali = 0;
    let paroleInviate = 0;

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
    } else {
      const ex = buildExcerpt(testoCompleto as string);
      suEstratto = ex.suEstratto;
      paroleTotali = ex.paroleTotali;
      paroleInviate = ex.paroleInviate;
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
    }

    if (!parsed) {
      return NextResponse.json(
        { error: "Il modello non ha prodotto una scheda valida. Riprova." },
        { status: 502 },
      );
    }

    const result: AnalysisResult = {
      scheda: parsed,
      meta: {
        titolo_input: titoloInput || parsed.titolo_presunto,
        autore,
        parole: paroleTotali,
        valutato_su_estratto: suEstratto,
        parole_inviate: paroleInviate,
        editori_richiesti: editori,
        tempo_secondi: Math.max(1, Math.round((Date.now() - t0) / 1000)),
        fonte: "live",
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
