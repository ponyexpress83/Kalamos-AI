/**
 * Gestione manoscritti lunghi e controllo costi.
 *
 * Se il testo supera ~12k token (~48k caratteri) non lo mandiamo intero: ne
 * costruiamo un estratto rappresentativo (incipit + campioni interni + finale)
 * e lo dichiariamo, così la scheda può segnalare "valutato su estratto".
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

  const incipit = testo.slice(0, incipitLen);

  const centroStart = Math.floor(testo.length / 2 - centroLen / 2);
  const centro = testo.slice(centroStart, centroStart + centroLen);

  const finale = testo.slice(testo.length - finaleLen);

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
