/**
 * Profili editoriali (collane).
 *
 * Ogni profilo è una descrizione che viene iniettata nel prompt di analisi per
 * calcolare il fit-score e la motivazione specifica. Le descrizioni sono scritte
 * perché DIVERGANO: lo stesso manoscritto deve ricevere punteggi diversi a
 * seconda della collana.
 *
 * Per aggiungere o modificare una collana: edita questo array. Nient'altro da
 * toccare — l'UI e l'API leggono da qui.
 */

export interface Imprint {
  id: string;
  nome: string;
  gruppo: string;
  /** Descrizione iniettata nel prompt: identità, cosa cerca, cosa rifiuta. */
  descrizione: string;
}

export const imprints: Imprint[] = [
  {
    id: "sperling-kupfer",
    nome: "Sperling & Kupfer",
    gruppo: "Mondadori",
    descrizione:
      "Narrativa commerciale e mainstream a vocazione bestseller: feel-good, romance, women's fiction, thriller e crime di largo pubblico, oltre a non-fiction divulgativa, self-help e benessere. Cerca leggibilità immediata, un hook forte nelle prime pagine, dialoghi brillanti, ritmo che tiene il lettore, potenziale commerciale ampio e trasversale. Premia la chiarezza e l'efficacia narrativa più della sperimentazione. Rifiuta i testi ostici, lenti, troppo letterari o di nicchia, e quelli privi di un gancio di mercato chiaro.",
  },
  {
    id: "einaudi-stile-libero",
    nome: "Einaudi Stile Libero",
    gruppo: "Mondadori",
    descrizione:
      "Narrativa contemporanea di qualità con piglio pop: noir e crime d'autore, voci forti e civili, romanzi di impegno e di realtà italiana, sperimentazione controllata. Cerca prima di tutto la voce — una cifra stilistica riconoscibile — e la rilevanza culturale: testi che dicono qualcosa sul presente. Apprezza il genere quando è elevato da uno sguardo autoriale. Rifiuta il commerciale puro senza ambizione, il feel-good levigato, la prosa derivativa e i testi che non rischiano nulla.",
  },
  {
    id: "mondadori-strade-blu",
    nome: "Mondadori Strade Blu",
    gruppo: "Mondadori",
    descrizione:
      "Narrativa italiana e internazionale di qualità upmarket: ambizione letteraria con tenuta di mercato, grandi voci d'autore, romanzi che uniscono spessore e leggibilità. Cerca la qualità della scrittura e la statura dell'autore, ma con un occhio alla vendibilità — meno radicale di una collana puramente letteraria, più esigente di una commerciale. Rifiuta sia il genere di puro intrattenimento sia lo sperimentalismo senza pubblico.",
  },
];

export function getImprint(id: string): Imprint | undefined {
  return imprints.find((i) => i.id === id);
}

export const defaultImprintIds = imprints.map((i) => i.id);
