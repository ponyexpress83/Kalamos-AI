/**
 * Tetti di dimensione e di spesa per una singola richiesta di analisi.
 *
 * Il motivo di questo file: `/api/analyze` chiama un modello a pagamento con la
 * nostra chiave. Senza un tetto stimato PRIMA della chiamata, un solo PDF di
 * trecento pagine costa più di tutta la demo di un mese.
 *
 * I numeri qui sotto non sono scelti a occhio: sono ricavati dal listino
 * pubblico Anthropic e dai limiti già presenti nel codice (vedi il conto in
 * `06-product/limiti-e-costi.md`).
 */

import { prezzoModello } from "./pricing";

/** Tetto sul testo incollato o sul `.txt`. Oltre: 413. */
export const MAX_TEXT_CHARS = 1_200_000;

/** Tetto sul PDF, misurato sui byte decodificati. Oltre: 413. */
export const MAX_PDF_BYTES = 6 * 1024 * 1024;

/**
 * Tetto di spesa per singola richiesta, in dollari. Superato il tetto la
 * richiesta viene rifiutata prima di chiamare l'API, non dopo.
 */
export const MAX_COSTO_USD = Number(process.env.KALAMOS_MAX_COST_USD ?? "1.00");

/** Tetto dell'estratto, allineato a `lib/extract.ts`: oltre non si manda. */
const TOKEN_ESTRATTO = 12_000;
/** Catalogo completo + istruzioni di sistema, misurati sul prompt reale. */
const TOKEN_SCAFFOLDING = 1_700;
/** `max_tokens` dichiarato nella route. */
const TOKEN_OUTPUT_MAX = 5_000;
/**
 * Token per pagina di PDF. Anthropic converte ogni pagina in testo + immagine:
 * la forbice osservata in documentazione è 1.500-3.000. Usiamo il limite ALTO,
 * perché una stima prudente che sbaglia deve sbagliare rifiutando, non
 * spendendo.
 */
const TOKEN_PER_PAGINA_PDF = 3_000;

export interface StimaCosto {
  tokenInput: number;
  tokenOutput: number;
  costoUSD: number;
  /** Come sono state contate le pagine, quando si tratta di un PDF. */
  metodo?: "marcatori" | "dimensione";
  pagine?: number;
}

/**
 * Pagine di un PDF. Primo tentativo sui marcatori `/Type /Page`; se il PDF
 * comprime gli oggetti (object stream) i marcatori non si vedono e si ripiega
 * sulla dimensione. In entrambi i casi si sceglie la stima più ALTA fra le due,
 * perché sottostimare le pagine significa sottostimare la spesa.
 */
export function stimaPaginePdf(buf: Buffer): { pagine: number; metodo: "marcatori" | "dimensione" } {
  const testa = buf.toString("latin1");
  const marcatori = (testa.match(/\/Type\s*\/Page(?![s])/g) ?? []).length;
  const daDimensione = Math.max(1, Math.ceil(buf.length / 60_000));
  if (marcatori > 0) {
    return marcatori >= daDimensione
      ? { pagine: marcatori, metodo: "marcatori" }
      : { pagine: daDimensione, metodo: "dimensione" };
  }
  return { pagine: daDimensione, metodo: "dimensione" };
}

/** Costo massimo stimato per un'analisi su testo (l'estratto è già limitato). */
export function stimaCostoTesto(caratteri: number, modello: string): StimaCosto {
  const p = prezzoModello(modello);
  const tokenTesto = Math.min(TOKEN_ESTRATTO, Math.ceil(caratteri / 4));
  const tokenInput = tokenTesto + TOKEN_SCAFFOLDING;
  const costoUSD =
    (tokenInput / 1_000_000) * p.input + (TOKEN_OUTPUT_MAX / 1_000_000) * p.output;
  return { tokenInput, tokenOutput: TOKEN_OUTPUT_MAX, costoUSD };
}

/** Costo massimo stimato per un'analisi su PDF: qui il testo NON viene tagliato. */
export function stimaCostoPdf(buf: Buffer, modello: string): StimaCosto {
  const p = prezzoModello(modello);
  const { pagine, metodo } = stimaPaginePdf(buf);
  const tokenInput = pagine * TOKEN_PER_PAGINA_PDF + TOKEN_SCAFFOLDING;
  const costoUSD =
    (tokenInput / 1_000_000) * p.input + (TOKEN_OUTPUT_MAX / 1_000_000) * p.output;
  return { tokenInput, tokenOutput: TOKEN_OUTPUT_MAX, costoUSD, pagine, metodo };
}

export const formattaUSD = (n: number) => `$${n.toFixed(2)}`;
