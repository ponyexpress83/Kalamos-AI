/**
 * Gestione manoscritti lunghi e controllo costi.
 *
 * Se il testo supera ~12k token (~48k caratteri) non lo mandiamo intero: ne
 * costruiamo un estratto rappresentativo (incipit + campioni interni + finale)
 * e lo dichiariamo, così la scheda può segnalare "valutato su estratto".
 *
 * I tagli cadono su confini di paragrafo o di frase, mai a metà periodo:
 * troncare una scena a metà rende inaffidabile qualunque giudizio su voce e
 * struttura, che è esattamente ciò che la scheda deve valutare.
 */

const CHARS_PER_TOKEN = 4; // stima prudente per l'italiano
const MAX_TOKENS = 12_000;
const MAX_CHARS = MAX_TOKENS * CHARS_PER_TOKEN;

export interface ExtractResult {
  testo: string; // testo da inviare al modello
  suEstratto: boolean; // true se è un estratto, non il testo intero
  paroleTotali: number;
  paroleInviate: number;
}

function contaParole(s: string): number {
  const t = s.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

/** Tolleranza entro cui si cerca un confine naturale attorno a un indice. */
const FINESTRA = 600;

/**
 * Sposta un indice di taglio sul confine naturale più vicino: prima uno stacco
 * di paragrafo, poi una fine di frase. Se non ne trova, taglia dov'era.
 */
function confine(testo: string, indice: number, verso: "avanti" | "indietro"): number {
  const lo = Math.max(0, indice - (verso === "indietro" ? FINESTRA : 0));
  const hi = Math.min(testo.length, indice + (verso === "avanti" ? FINESTRA : 0));
  const finestra = testo.slice(lo, hi);
  if (finestra.length === 0) return indice;

  const paragrafo = verso === "indietro"
    ? finestra.lastIndexOf("\n\n")
    : finestra.indexOf("\n\n");
  if (paragrafo >= 0) return lo + paragrafo + (verso === "indietro" ? 0 : 2);

  const frasi: number[] = [];
  const re = /[.!?…»"]\s/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(finestra)) !== null) frasi.push(m.index);
  if (frasi.length > 0) {
    const scelto = verso === "indietro" ? frasi[frasi.length - 1] : frasi[0];
    return lo + scelto + 2;
  }
  return indice;
}

export function buildExcerpt(testoCompleto: string): ExtractResult {
  const testo = testoCompleto.trim();
  const paroleTotali = contaParole(testo);

  if (testo.length <= MAX_CHARS) {
    return {
      testo,
      suEstratto: false,
      paroleTotali,
      paroleInviate: paroleTotali,
    };
  }

  // Budget diviso in tre finestre: incipit (50%), centro (30%), finale (20%).
  const incipitLen = Math.floor(MAX_CHARS * 0.5);
  const centroLen = Math.floor(MAX_CHARS * 0.3);
  const finaleLen = Math.floor(MAX_CHARS * 0.2);

  const incipit = testo.slice(0, confine(testo, incipitLen, "indietro"));

  const centroGrezzo = Math.floor(testo.length / 2 - centroLen / 2);
  const centroStart = confine(testo, centroGrezzo, "avanti");
  const centro = testo.slice(
    centroStart,
    confine(testo, centroStart + centroLen, "indietro"),
  );

  const finale = testo.slice(confine(testo, testo.length - finaleLen, "avanti"));

  const estratto = [
    "[INCIPIT]",
    incipit,
    "\n\n[...campione dalla parte centrale...]\n",
    centro,
    "\n\n[...campione dal finale...]\n",
    finale,
  ].join("\n");

  return {
    testo: estratto,
    suEstratto: true,
    paroleTotali,
    paroleInviate: contaParole(estratto),
  };
}
