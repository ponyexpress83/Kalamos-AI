import type { Controlli, Scheda } from "./schema";

/**
 * Controlli DETERMINISTICI sull'output del modello.
 *
 * Sono verifiche di codice, non un secondo modello che giudica il primo:
 * costano zero e intercettano la classe di errori che in redazione fa più
 * danno — una collana che non esiste nel catalogo, una citazione che nel
 * manoscritto non c'è. Lo schema garantisce la FORMA della risposta; questo
 * modulo ne garantisce l'ANCORAGGIO al catalogo reale e al testo caricato.
 */

export interface CollanaAmmessa {
  editore: string;
  collana: string;
}

const normalizza = (s: string) =>
  s
    .toLowerCase()
    .replace(/[«»"“”'’`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Il modello non ha proposto NESSUNA collana esistente: output inutilizzabile. */
export class SchedaFuoriCatalogoError extends Error {
  constructor(readonly proposte: string[]) {
    super(
      `Nessuna delle collane proposte esiste nel catalogo: ${proposte.join(", ")}`,
    );
    this.name = "SchedaFuoriCatalogoError";
  }
}

/**
 * Verifica che la citazione compaia davvero nel testo inviato al modello.
 * Tollera differenze di virgolette e spaziatura; su citazioni lunghe accetta
 * anche il solo incipit, perché i troncamenti con "…" sono legittimi.
 */
function citazionePresente(citazione: string, testo: string): boolean | null {
  const c = normalizza(citazione).replace(/\.{3}|…/g, "").trim();
  if (c.length < 15) return null; // troppo corta per dire qualcosa
  const t = normalizza(testo);
  if (t.includes(c)) return true;
  return t.includes(c.slice(0, 40));
}

/**
 * Applica i controlli e restituisce la scheda ripulita.
 * Le collane inventate vengono SCARTATE prima di arrivare all'editor.
 */
export function verificaScheda(
  scheda: Scheda,
  opts: { collaneAmmesse: CollanaAmmessa[]; testoInviato?: string },
): { scheda: Scheda; controlli: Controlli } {
  const ammesse = new Set(
    opts.collaneAmmesse.map((a) => `${normalizza(a.editore)}|${normalizza(a.collana)}`),
  );

  const valide = scheda.fit_collane.filter((f) =>
    ammesse.has(`${normalizza(f.editore)}|${normalizza(f.collana)}`),
  );
  const scartate = scheda.fit_collane
    .filter((f) => !ammesse.has(`${normalizza(f.editore)}|${normalizza(f.collana)}`))
    .map((f) => `${f.editore} — ${f.collana}`);

  if (valide.length === 0) {
    throw new SchedaFuoriCatalogoError(scartate);
  }

  const citazione_verificata = opts.testoInviato
    ? citazionePresente(scheda.passaggio_a_sostegno, opts.testoInviato)
    : null;

  return {
    scheda: { ...scheda, fit_collane: valide },
    controlli: {
      collane_valide: scartate.length === 0,
      collane_scartate: scartate,
      citazione_verificata,
    },
  };
}
