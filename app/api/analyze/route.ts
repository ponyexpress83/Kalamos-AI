import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { schedaSchema, type AnalysisResult } from "@/lib/schema";
import { imprints, getImprint } from "@/config/imprints";
import { getManuscriptText, getManuscriptMeta } from "@/lib/manuscripts";
import { buildExcerpt } from "@/lib/extract";
import { getDemoScheda } from "@/lib/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";

const SYSTEM_PROMPT = `Sei un lettore editoriale senior italiano. Valuti manoscritti per case editrici trade. Sei rigoroso, concreto, mai compiacente. Non scrivi né riscrivi il libro: lo valuti. Rispetti il giudizio dell'editor: la tua è una raccomandazione, non una decisione. Rispondi SOLO con il JSON dello schema richiesto, in italiano.`;

interface AnalyzeBody {
  manuscriptId?: string;
  text?: string;
  pdfBase64?: string;
  fileName?: string;
  titolo?: string;
  imprintIds?: string[];
}

function collaneBlock(ids: string[]): { nomi: string[]; testo: string } {
  const scelte = ids
    .map((id) => getImprint(id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const testo = scelte
    .map((i) => `- ${i.nome} (${i.gruppo}): ${i.descrizione}`)
    .join("\n");
  return { nomi: scelte.map((i) => i.nome), testo };
}

function buildUserPrompt(testo: string, collane: string): string {
  return `Valuta il seguente manoscritto (o estratto) e produci la scheda di lettura strutturata.

COLLANE TARGET (calcola un fit-score per ciascuna):
${collane}

Per OGNI collana elencata sopra calcola uno score da 0 a 1 (dove 1 = fit perfetto) e una motivazione di 1-2 frasi specifica del catalogo e dell'identità di quella collana. Usa ESATTAMENTE il nome della collana come indicato. Lo stesso testo deve poter ricevere punteggi diversi a seconda della collana: il fit misura il rapporto testo-collana, non una qualità astratta.

Compila tutti i campi dello schema. La sintesi sia di 4-6 frasi (trama, struttura, voce). Indica 2-3 comparable italiani o internazionali con il motivo del paragone. Sii concreto e mai compiacente.

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

  // Collane selezionate (default: tutte)
  const imprintIds =
    body.imprintIds && body.imprintIds.length > 0
      ? body.imprintIds
      : imprints.map((i) => i.id);
  const validIds = imprintIds.filter((id) => getImprint(id));
  if (validIds.length === 0) {
    return NextResponse.json(
      { error: "Seleziona almeno una collana valida." },
      { status: 400 },
    );
  }

  // ── Manoscritto demo: se è una richiesta "instant" sulle collane di default,
  //    rispondiamo dalla cache. Altrimenti ri-analizziamo dal vivo.
  let testoCompleto: string | undefined;
  let titoloInput = body.titolo;
  let autore: string | undefined;

  if (body.manuscriptId) {
    const meta = getManuscriptMeta(body.manuscriptId);
    if (!meta) {
      return NextResponse.json(
        { error: "Manoscritto demo non trovato." },
        { status: 404 },
      );
    }
    titoloInput = meta.titolo;
    autore = meta.autore;
    testoCompleto = getManuscriptText(body.manuscriptId);
    if (!testoCompleto) {
      return NextResponse.json(
        { error: "Impossibile leggere il manoscritto demo." },
        { status: 500 },
      );
    }
  } else if (body.text && body.text.trim().length > 0) {
    testoCompleto = body.text;
  } else if (!body.pdfBase64) {
    return NextResponse.json(
      { error: "Incolla un testo, carica un file o scegli un manoscritto demo." },
      { status: 400 },
    );
  }

  // Chiave API
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "ANTHROPIC_API_KEY non configurata. Imposta la chiave nell'ambiente per l'analisi dal vivo (le schede demo restano disponibili).",
      },
      { status: 503 },
    );
  }

  const { nomi, testo: collaneTesto } = collaneBlock(validIds);
  const client = new Anthropic({ apiKey, timeout: 55_000, maxRetries: 1 });

  const t0 = Date.now();

  try {
    let parsed;
    let suEstratto = false;
    let paroleTotali = 0;
    let paroleInviate = 0;

    if (body.pdfBase64) {
      // Manoscritto in PDF: lo mandiamo come documento (Claude legge il PDF).
      const userPrompt = buildUserPrompt(
        "(il testo del manoscritto è allegato come documento PDF)",
        collaneTesto,
      );
      const res = await client.messages.parse({
        model: MODEL,
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        output_config: { format: zodOutputFormat(schedaSchema), effort: "medium" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: {
                  type: "base64",
                  media_type: "application/pdf",
                  data: body.pdfBase64,
                },
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
      const userPrompt = buildUserPrompt(ex.testo, collaneTesto);
      const res = await client.messages.parse({
        model: MODEL,
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        output_config: { format: zodOutputFormat(schedaSchema), effort: "medium" },
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
        collane_richieste: nomi,
        tempo_secondi: Math.max(1, Math.round((Date.now() - t0) / 1000)),
        fonte: "live",
      },
    };

    return NextResponse.json(result);
  } catch (err) {
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
