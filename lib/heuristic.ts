import type { AnalysisResult, Raccomandazione, Scheda } from "./schema";
import type { Profilo } from "../config/imprints";

/**
 * Valutazione EURISTICA offline (nessuna inferenza AI).
 *
 * Rende la demo sempre provabile — senza chiave API, offline, o quando
 * l'analisi dal vivo va in timeout. Deriva una scheda plausibile da segnali
 * testuali di superficie (lunghezza, dialogo, versi, cliché, avverbi, lessico
 * di genere) e fa divergere i fit-score in base al `profilo` di ogni collana.
 *
 * Modulo PURO (niente fs / API): gira sia lato client sia lato server. Il
 * risultato è sempre `fonte: "simulata"` e la scheda lo dichiara.
 */

const CLICHES = [
  "notte buia e tempestosa",
  "gelare il sangue",
  "cuore spezzato",
  "occhi azzurri penetranti",
  "un uomo di poche parole",
  "silenzio irreale",
  "un brivido lungo la schiena",
  "il destino aveva deciso",
  "non credeva nelle coincidenze",
  "sangue nelle vene",
  "una lacrima solitaria",
  "come un fulmine a ciel sereno",
];

const KW_COMMERCIAL = ["amore", "cuore", "bacio", "baciò", "vacanza", "sorrise", "sorriso", "estate", "mare", "spiaggia", "sposa", "matrimonio", "romantic", "innamor", "abbracci"];
const KW_THRILLER = ["omicidio", "ispettore", "commissario", "maresciallo", "sangue", "morto", "morte", "indagine", "delitto", "assassino", "cadavere", "pistola", "vittima", "detective", "indizio"];
const KW_LITERARY = ["memoria", "silenzio", "tempo", "terra", "madre", "padre", "ricordo", "luce", "ombra", "stagione", "infanzia", "vetro", "assenza"];
const KW_FANTASY = ["drago", "draghi", "magia", "magico", "mago", "maga", "strega", "regno", "spada", "elfo", "elfi", "orco", "incantesimo", "profezia", "oscuro signore", "cavaliere", "fata", "runa"];
const KW_CHILDREN = ["bambino", "bambina", "bimbo", "bimba", "mamma", "papà", "orso", "orsetto", "coniglio", "bosco", "scuola", "giocare", "favola", "fiaba", "draghetto", "maestra", "nonno", "nonna"];

interface Signals {
  wc: number;
  sentences: number;
  avgLen: number;
  avgWordLen: number;
  dialogueRatio: number;
  adverbsPer1000: number;
  cliches: number;
  commercial: number;
  thriller: number;
  literary: number;
  fantasy: number;
  children: number;
  verseLike: boolean;
  simple: boolean;
  firstSentence: string;
}

function analyzeSignals(text: string): Signals {
  const raw = text.replace(/\r/g, "");
  const clean = raw.replace(/\s+/g, " ").trim();
  const lower = clean.toLowerCase();
  const words = lower.match(/[a-zàèéìòù’']+/g) ?? [];
  const wc = words.length;
  const charTotal = words.reduce((n, w) => n + w.length, 0);
  const sentenceParts = clean.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const sentences = Math.max(1, sentenceParts.length);
  const adverbs = words.filter((w) => w.endsWith("mente")).length;
  const quotes = (clean.match(/[«»"“”]/g) ?? []).length;
  const cliches = CLICHES.reduce((n, c) => (lower.includes(c) ? n + 1 : n), 0);
  const countKw = (kws: string[]) => kws.reduce((n, k) => (lower.includes(k) ? n + 1 : n), 0);

  // Rilevamento versi: molte righe brevi, con più righe che frasi.
  const lines = raw.split("\n");
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  const shortLines = nonEmpty.filter((l) => l.trim().length <= 60).length;
  const avgLineWords = wc / Math.max(1, nonEmpty.length);
  const verseLike =
    nonEmpty.length >= 4 &&
    shortLines / nonEmpty.length > 0.6 &&
    avgLineWords < 9 &&
    nonEmpty.length / sentences > 1.2;

  const avgWordLen = wc > 0 ? charTotal / wc : 0;
  const avgLen = wc / sentences;
  const simple = avgWordLen < 4.7 && avgLen < 13;

  return {
    wc,
    sentences,
    avgLen,
    avgWordLen,
    dialogueRatio: quotes / sentences,
    adverbsPer1000: wc > 0 ? (adverbs / wc) * 1000 : 0,
    cliches,
    commercial: countKw(KW_COMMERCIAL),
    thriller: countKw(KW_THRILLER),
    literary: countKw(KW_LITERARY),
    fantasy: countKw(KW_FANTASY),
    children: countKw(KW_CHILDREN),
    verseLike,
    simple,
    firstSentence: (verseLike ? nonEmpty[0] : sentenceParts[0] ?? clean).slice(0, 180),
  };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}
function round1(n: number): number {
  return Math.round(n * 2) / 2;
}

type Bucket =
  | "poesia"
  | "fantasy"
  | "ragazzi"
  | "thriller"
  | "commercial"
  | "literary"
  | "neutro";

function dominantBucket(s: Signals): Bucket {
  if (s.verseLike) return "poesia";
  const scores: [Bucket, number][] = [
    ["ragazzi", s.children + (s.simple ? 2 : 0)],
    ["fantasy", s.fantasy],
    ["thriller", s.thriller],
    ["commercial", s.commercial],
    ["literary", s.literary],
  ];
  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][1] === 0 ? "neutro" : scores[0][0];
}

function prosaVoto(s: Signals): number {
  let v = 6.5;
  v -= Math.min(3, s.cliches * 0.9);
  v -= Math.min(2, Math.max(0, (s.adverbsPer1000 - 14) / 9));
  if (s.avgLen > 45) v -= 0.5;
  if (s.avgLen < 6 && !s.verseLike) v -= 0.5;
  if (s.literary > 3) v += 1;
  if (s.literary > 6) v += 0.5;
  if (s.verseLike) v += 0.5;
  return clamp(round1(v), 2, 9);
}

/** Fit 0-1 di una collana secondo il suo profilo e i segnali del testo. */
function fitFor(profilo: Profilo, s: Signals, voto: number): number {
  const q = (voto - 5) / 10;
  const dlg = clamp(s.dialogueRatio, 0, 1.5);
  let base: number;

  switch (profilo) {
    case "narrativa_commerciale":
      base = 0.42 + 0.07 * s.commercial + 0.12 * dlg - 0.06 * s.literary - 0.02 * s.thriller - (s.verseLike ? 0.3 : 0);
      break;
    case "narrativa_autore":
      base = 0.34 + 0.08 * s.literary + 0.045 * s.thriller + 0.6 * q - 0.06 * s.commercial - (s.verseLike ? 0.25 : 0);
      break;
    case "narrativa_upmarket":
      base = 0.4 + 0.07 * s.literary + 0.55 * q - 0.05 * s.commercial - 0.03 * s.thriller - (s.verseLike ? 0.25 : 0);
      break;
    case "poesia":
      base = (s.verseLike ? 0.72 : 0.14) + 0.04 * s.literary + 0.3 * q - 0.12 * dlg - 0.05 * s.commercial - 0.05 * s.thriller;
      break;
    case "ragazzi":
      base = 0.3 + (s.simple ? 0.28 : 0) + 0.06 * s.children + 0.05 * dlg - 0.07 * s.thriller - 0.04 * s.literary - (s.verseLike ? 0.15 : 0);
      break;
    case "albi":
      base = 0.16 + (s.wc < 300 ? 0.38 : s.wc > 800 ? -0.05 : 0.1) + (s.simple ? 0.18 : 0) + 0.05 * s.children;
      break;
    case "giallo":
      base = 0.34 + 0.11 * s.thriller + 0.04 * dlg + 0.03 * s.commercial - 0.05 * s.literary - (s.verseLike ? 0.3 : 0);
      break;
    case "fantasy":
      base = 0.3 + 0.13 * s.fantasy + 0.04 * dlg + 0.03 * s.literary - (s.verseLike ? 0.25 : 0);
      break;
    case "romance":
      base = 0.34 + 0.1 * s.commercial + 0.06 * dlg - 0.05 * s.literary - 0.05 * s.thriller - (s.verseLike ? 0.3 : 0);
      break;
    case "graphic":
      base = 0.4 + 0.06 * dlg + 0.25 * q - (s.verseLike ? 0.2 : 0);
      break;
    default:
      base = 0.4 + 0.4 * q;
  }

  if (voto < 4) base *= 0.6;
  return clamp(Number(base.toFixed(2)), 0.08, 0.95);
}

function raccFromVoto(voto: number): Raccomandazione {
  if (voto < 4.5) return "scarta";
  if (voto >= 7) return "prioritario";
  return "seconda_lettura";
}

function genereFor(b: Bucket): string {
  const map: Record<Bucket, string> = {
    poesia: "Poesia (stima)",
    fantasy: "Fantasy / fantastico (stima)",
    ragazzi: "Narrativa per ragazzi (stima)",
    thriller: "Giallo / thriller (stima)",
    commercial: "Commercial / feel-good (stima)",
    literary: "Narrativa letteraria (stima)",
    neutro: "Narrativa non classificata (stima)",
  };
  return map[b];
}

function comparablesFor(b: Bucket): Scheda["comparable_titles"] {
  const map: Record<Bucket, Scheda["comparable_titles"]> = {
    poesia: [{ titolo: "Raccolta di poesia contemporanea di catalogo", autore: "—", perche: "Struttura in versi e lessico affini alla poesia d'autore." }],
    fantasy: [{ titolo: "Fantasy di catalogo con world-building", autore: "—", perche: "Immaginario e lessico fantastico riconoscibili." }],
    ragazzi: [{ titolo: "Narrativa per ragazzi per fasce di lettura", autore: "—", perche: "Lingua semplice e temi affini al pubblico 6-12." }],
    thriller: [{ titolo: "Giallo/noir di catalogo", autore: "—", perche: "Lessico d'indagine e struttura di genere." }],
    commercial: [
      { titolo: "Filone feel-good commerciale", autore: "—", perche: "Leggibilità e lessico romance da largo pubblico." },
      { titolo: "Women's fiction di catalogo", autore: "—", perche: "Dialogo brillante e hook emotivo." },
    ],
    literary: [{ titolo: "Narrativa d'autore contemporanea", autore: "—", perche: "Lessico intimista e densità della prosa." }],
    neutro: [{ titolo: "Comparabile non determinato", autore: "—", perche: "Segnali insufficienti per un accostamento affidabile." }],
  };
  return map[b];
}

function targetFor(b: Bucket): string {
  const map: Record<Bucket, string> = {
    poesia: "Lettore di poesia contemporanea (stima automatica).",
    fantasy: "Lettore di fantasy e fantastico (stima automatica).",
    ragazzi: "Giovani lettori 6-12 anni e famiglie (stima automatica).",
    thriller: "Lettore di giallo/noir di consumo (stima automatica).",
    commercial: "Pubblico ampio del feel-good e del women's fiction (stima automatica).",
    literary: "Lettore di narrativa letteraria (stima automatica).",
    neutro: "Target non determinato automaticamente.",
  };
  return map[b];
}

export interface HeuristicImprint {
  nome: string;
  profilo: Profilo;
}

export interface HeuristicInput {
  titolo?: string;
  autore?: string;
  imprints: HeuristicImprint[];
}

export function analyzeHeuristic(text: string, input: HeuristicInput): AnalysisResult {
  const s = analyzeSignals(text);
  const voto = prosaVoto(s);
  const bucket = dominantBucket(s);
  const racc = raccFromVoto(voto);

  const fit_collane = input.imprints.map((imp) => ({
    collana: imp.nome,
    score: fitFor(imp.profilo, s, voto),
    motivazione:
      "Stima offline dai segnali del testo (versi, dialogo, cliché, avverbi, lessico di genere): rapporto testo-collana indicativo, non inferenza editoriale.",
  }));

  const temi: string[] = [];
  if (s.verseLike) temi.push("testo in versi");
  if (s.fantasy > 0) temi.push("immaginario fantastico");
  if (s.children > 0) temi.push("infanzia / mondo dei ragazzi");
  if (s.commercial > 0) temi.push("relazioni / sentimenti");
  if (s.thriller > 0) temi.push("crimine / indagine");
  if (s.literary > 0) temi.push("memoria / interiorità");
  if (temi.length === 0) temi.push("temi non rilevati automaticamente");

  const forza: string[] = [];
  if (s.verseLike) forza.push("Andamento in versi riconoscibile");
  if (s.dialogueRatio > 0.4) forza.push("Presenza di dialogo");
  if (s.literary > 3) forza.push("Lessico evocativo");
  if (s.simple) forza.push("Lingua accessibile");
  if (forza.length === 0) forza.push("Da valutare con analisi dal vivo");

  const criticita: string[] = [];
  if (s.cliches > 0) criticita.push(`Cliché rilevati (${s.cliches})`);
  if (s.adverbsPer1000 > 18) criticita.push("Avverbi in -mente frequenti");
  if (s.avgLen > 45) criticita.push("Periodi molto lunghi");
  if (s.wc < 120) criticita.push("Campione breve: stima poco affidabile");
  if (criticita.length === 0) criticita.push("Nessuna criticità evidente dai segnali di superficie");

  const scheda: Scheda = {
    titolo_presunto: input.titolo?.trim() || "Testo senza titolo",
    logline: `Anteprima simulata di un testo di circa ${s.wc} parole (${genereFor(bucket).toLowerCase()}).`,
    sintesi: `Il testo si apre così: «${s.firstSentence}…». Valutazione euristica offline su ${s.wc} parole: registro riconducibile a ${genereFor(bucket).toLowerCase()}, ${
      s.verseLike ? "con andamento in versi" : s.dialogueRatio > 0.4 ? "con presenza di dialogo" : "a prevalenza narrativa/descrittiva"
    }. La densità di avverbi è ${s.adverbsPer1000 > 18 ? "alta" : "contenuta"} e ${
      s.cliches > 0 ? `si rilevano ${s.cliches} espressioni di maniera` : "non emergono cliché evidenti"
    }. Questa è una stima automatica di superficie, non una lettura editoriale: attiva l'analisi dal vivo per la valutazione reale.`,
    genere: genereFor(bucket),
    temi,
    qualita_prosa: {
      voto_su_10: voto,
      note: `Stima da segnali: lunghezza media periodo ~${s.avgLen.toFixed(0)} parole, avverbi ~${s.adverbsPer1000.toFixed(0)}/1000, cliché ${s.cliches}${s.verseLike ? ", testo in versi" : ""}. Non è un giudizio editoriale.`,
    },
    target_lettore: targetFor(bucket),
    comparable_titles: comparablesFor(bucket),
    punti_di_forza: forza,
    criticita,
    fit_collane,
    raccomandazione: racc,
    razionale_raccomandazione: `Stima offline: voto prosa ${voto}/10 → ${racc.replace("_", " ")}. È un'anteprima automatica pensata per provare il flusso; la valutazione reale richiede l'analisi dal vivo su Claude.`,
    nota_metodologica:
      "Anteprima SIMULATA (offline): valutazione euristica basata su segnali testuali di superficie, non su inferenza AI. Attiva l'analisi dal vivo per la scheda reale. Supporto alla decisione, non sostituzione del giudizio editoriale.",
  };

  return {
    scheda,
    meta: {
      titolo_input: input.titolo,
      autore: input.autore,
      parole: s.wc,
      valutato_su_estratto: false,
      parole_inviate: s.wc,
      collane_richieste: input.imprints.map((i) => i.nome),
      tempo_secondi: 1,
      fonte: "simulata",
    },
  };
}
