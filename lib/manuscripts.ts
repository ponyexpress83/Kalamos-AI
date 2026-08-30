import { readFileSync } from "fs";
import path from "path";

/**
 * Manoscritti demo precaricati.
 *
 * I testi sono ORIGINALI (nessun copyright) e vivono in /data/manuscripts.
 * Sono scelti per coprire l'intera gamma di esiti e far divergere i fit-score:
 *  - 01 letterario forte         → prioritario, fit alto sulle collane d'autore
 *  - 02 commercial feel-good     → seconda lettura
 *  - 03 slush debole             → scarta, fit basso ovunque
 *  - 04 noir d'autore ambiguo    → spacca i fit-score tra le collane
 *
 * I metadati qui sotto sono "client-safe" (niente testo). Il testo si legge
 * lato server con getManuscriptText().
 */

export interface ManuscriptMeta {
  id: string;
  file: string;
  titolo: string;
  autore: string;
  genere: string;
  parole: number; // conteggio reale dell'estratto demo
  /** Provenienza simulata: rappresenta come il manoscritto è arrivato in redazione. */
  provenienza: string;
  /** Giorno di arrivo (simulato) per l'ordine della coda. */
  arrivato: string;
}

export const manuscripts: ManuscriptMeta[] = [
  {
    id: "01_il-giardino-di-vetro",
    file: "01_il-giardino-di-vetro.txt",
    titolo: "Il giardino di vetro",
    autore: "Marta Bevilacqua",
    genere: "Narrativa letteraria",
    parole: 662,
    provenienza: "email · manoscritti@",
    arrivato: "lun 3 ago",
  },
  {
    id: "02_sette-giorni-a-portofino",
    file: "02_sette-giorni-a-portofino.txt",
    titolo: "Sette giorni a Portofino",
    autore: "Carla Montersino",
    genere: "Commercial / feel-good",
    parole: 586,
    provenienza: "email · manoscritti@",
    arrivato: "lun 3 ago",
  },
  {
    id: "03_le-ombre-del-passato",
    file: "03_le-ombre-del-passato.txt",
    titolo: "Le ombre del passato",
    autore: "R. Vinci",
    genere: "Thriller / giallo",
    parole: 501,
    provenienza: "portale proposte",
    arrivato: "dom 2 ago",
  },
  {
    id: "04_la-stagione-delle-locuste",
    file: "04_la-stagione-delle-locuste.txt",
    titolo: "La stagione delle locuste",
    autore: "Nuccio Carbè",
    genere: "Noir / narrativa civile",
    parole: 562,
    provenienza: "agenzia letteraria",
    arrivato: "sab 1 ago",
  },
];

export function getManuscriptMeta(id: string): ManuscriptMeta | undefined {
  return manuscripts.find((m) => m.id === id);
}

/** Legge il testo completo del manoscritto demo (solo lato server). */
export function getManuscriptText(id: string): string | undefined {
  const meta = getManuscriptMeta(id);
  if (!meta) return undefined;
  const filePath = path.join(process.cwd(), "data", "manuscripts", meta.file);
  return readFileSync(filePath, "utf-8");
}
