import type { AnalysisResult, Raccomandazione, Scheda } from "./schema";

/**
 * Valutazione EURISTICA offline (nessuna inferenza AI).
 *
 * Serve a rendere la demo sempre provabile — anche senza chiave API, offline,
 * o quando l'analisi dal vivo va in timeout. Deriva una scheda plausibile da
 * segnali testuali di superficie (lunghezza, dialogo, cliché, avverbi, lessico
 * di genere) e fa comunque divergere i fit-score per collana.
 *
 * È un modulo PURO (niente fs / API): gira sia lato client sia lato server.
 * Il risultato è sempre etichettato `fonte: "simulata"` e la scheda lo dichiara.
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

const KW_COMMERCIAL = [
  "amore",
  "cuore",
  "bacio",
  "baciò",
  "vacanza",
  "sorrise",
  "sorriso",
  "estate",
  "mare",
  "spiaggia",
  "sposa",
  "matrimonio",
  "romantic",
  "innamor",
  "abbracci",
];

const KW_THRILLER = [
  "omicidio",
  "ispettore",
  "commissario",
  "maresciallo",
  "sangue",
  "morto",
  "morte",
  "indagine",
  "delitto",
  "assassino",
  "cadavere",
  "pistola",
  "vittima",
  "detective",
];

const KW_LITERARY = [
  "memoria",
  "silenzio",
  "tempo",
  "terra",
  "madre",
  "padre",
  "nonna",
  "nonno",
  "ricordo",
  "luce",
  "ombra",
  "stagione",
  "casa",
  "infanzia",
  "vetro",
];

interface Signals {
  wc: number;
  sentences: number;
  avgLen: number;
  dialogueRatio: number;
  adverbsPer1000: number;
  cliches: number;
  commercial: number;
  thriller: number;
  literary: number;
  firstSentence: string;
}

function analyzeSignals(text: string): Signals {
  const clean = text.replace(/\s+/g, " ").trim();
  const lower = clean.toLowerCase();
  const words = lower.match(/[a-zàèéìòù’']+/g) ?? [];
  const wc = words.length;
  const sentenceParts = clean
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentences = Math.max(1, sentenceParts.length);
  const adverbs = words.filter((w) => w.endsWith("mente")).length;
  const quotes = (clean.match(/[«»"“”]/g) ?? []).length;
  const cliches = CLICHES.reduce(
    (n, c) => (lower.includes(c) ? n + 1 : n),
    0,
  );
  const countKw = (kws: string[]) =>
    kws.reduce((n, k) => (lower.includes(k) ? n + 1 : n), 0);

  return {
    wc,
    sentences,
    avgLen: wc / sentences,
    dialogueRatio: quotes / sentences,
    adverbsPer1000: wc > 0 ? (adverbs / wc) * 1000 : 0,
    cliches,
    commercial: countKw(KW_COMMERCIAL),
    thriller: countKw(KW_THRILLER),
    literary: countKw(KW_LITERARY),
    firstSentence: (sentenceParts[0] ?? clean).slice(0, 180),
  };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function round1(n: number): number {
  return Math.round(n * 2) / 2;
}

type Bucket = "commercial" | "thriller" | "literary" | "neutro";

function dominantBucket(s: Signals): Bucket {
  const m = Math.max(s.commercial, s.thriller, s.literary);
  if (m === 0) return "neutro";
  if (s.commercial === m) return "commercial";
  if (s.thriller === m) return "thriller";
  return "literary";
}

function prosaVoto(s: Signals): number {
  let v = 6.5;
  v -= Math.min(3, s.cliches * 0.9);
  v -= Math.min(2, Math.max(0, (s.adverbsPer1000 - 14) / 9));
  if (s.avgLen > 45) v -= 0.5;
  if (s.avgLen < 6) v -= 0.5;
  if (s.literary > 3) v += 1;
  if (s.literary > 6) v += 0.5;
  return clamp(round1(v), 2, 9);
}

/** Fit 0-1 di una collana nota; per collane sconosciute usa un profilo neutro. */
function fitFor(nome: string, s: Signals, voto: number): number {
  const n = nome.toLowerCase();
  const q = (voto - 5) / 10; // qualità normalizzata ~[-0.3, 0.4]
  let base: number;

  if (n.includes("sperling")) {
    // commerciale mainstream: premia dialogo, keyword commerciali, leggibilità
    base =
      0.42 +
      0.07 * s.commercial +
      0.12 * clamp(s.dialogueRatio, 0, 1.5) -
      0.06 * s.literary -
      0.02 * s.thriller;
  } else if (n.includes("einaudi")) {
    // Stile Libero: voce, crime d'autore, rilevanza; penalizza il commerciale puro
    base =
      0.34 +
      0.08 * s.literary +
      0.07 * s.thriller +
      0.6 * q -
      0.06 * s.commercial;
  } else if (n.includes("strade blu")) {
    // upmarket d'autore ma leggibile: qualità letteraria con tenuta
    base =
      0.4 +
      0.07 * s.literary +
      0.55 * q -
      0.05 * s.commercial -
      0.03 * s.thriller;
  } else {
    // collana sconosciuta: profilo neutro sui segnali
    base = 0.4 + 0.4 * q + 0.03 * (s.literary + s.commercial + s.thriller);
  }

  if (voto < 4) base *= 0.55; // prosa debole abbatte il fit ovunque
  return clamp(Number(base.toFixed(2)), 0.08, 0.95);
}

function raccFromVoto(voto: number): Raccomandazione {
  if (voto < 4.5) return "scarta";
  if (voto >= 7) return "prioritario";
  return "seconda_lettura";
}

function genereFor(b: Bucket): string {
  switch (b) {
    case "commercial":
      return "Commercial / feel-good (stima)";
    case "thriller":
      return "Thriller / giallo (stima)";
    case "literary":
      return "Narrativa letteraria (stima)";
    default:
      return "Narrativa non classificata (stima)";
  }
}

function comparablesFor(b: Bucket): Scheda["comparable_titles"] {
  switch (b) {
    case "commercial":
      return [
        {
          titolo: "Filone feel-good commerciale di catalogo",
          autore: "—",
          perche: "Segnali di leggibilità e lessico romance affini al mainstream estivo.",
        },
        {
          titolo: "Women's fiction da largo pubblico",
          autore: "—",
          perche: "Dialogo brillante e hook emotivo tipici della fascia commerciale.",
        },
      ];
    case "thriller":
      return [
        {
          titolo: "Noir/giallo di catalogo",
          autore: "—",
          perche: "Lessico da indagine e ambientazione di genere riconoscibili.",
        },
      ];
    case "literary":
      return [
        {
          titolo: "Narrativa d'autore contemporanea",
          autore: "—",
          perche: "Lessico intimista e densità della prosa affini al catalogo letterario.",
        },
      ];
    default:
      return [
        {
          titolo: "Comparabile non determinato",
          autore: "—",
          perche: "Segnali insufficienti per un accostamento affidabile.",
        },
      ];
  }
}

function targetFor(b: Bucket): string {
  switch (b) {
    case "commercial":
      return "Pubblico ampio del feel-good e del women's fiction (stima automatica).";
    case "thriller":
      return "Lettore di giallo/noir di consumo (stima automatica).";
    case "literary":
      return "Lettore di narrativa letteraria (stima automatica).";
    default:
      return "Target non determinato automaticamente.";
  }
}

export interface HeuristicInput {
  titolo?: string;
  autore?: string;
  imprintNames: string[];
}

export function analyzeHeuristic(
  text: string,
  input: HeuristicInput,
): AnalysisResult {
  const s = analyzeSignals(text);
  const voto = prosaVoto(s);
  const bucket = dominantBucket(s);
  const racc = raccFromVoto(voto);

  const fit_collane = input.imprintNames.map((nome) => {
    const score = fitFor(nome, s, voto);
    return {
      collana: nome,
      score,
      motivazione:
        "Stima offline dai segnali del testo (dialogo, cliché, avverbi, lessico di genere): rapporto testo-collana indicativo, non inferenza editoriale.",
    };
  });

  const temiRilevati: string[] = [];
  if (s.commercial > 0) temiRilevati.push("relazioni / sentimenti");
  if (s.thriller > 0) temiRilevati.push("crimine / indagine");
  if (s.literary > 0) temiRilevati.push("memoria / interiorità");
  if (temiRilevati.length === 0) temiRilevati.push("temi non rilevati automaticamente");

  const forza: string[] = [];
  if (s.dialogueRatio > 0.4) forza.push("Presenza di dialogo");
  if (s.literary > 3) forza.push("Lessico evocativo");
  if (s.avgLen >= 10 && s.avgLen <= 30) forza.push("Periodare equilibrato");
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
    sintesi: `Il testo si apre così: «${s.firstSentence}…». Valutazione euristica offline su ${s.wc} parole: registro riconducibile a ${genereFor(bucket).toLowerCase()}, con ${
      s.dialogueRatio > 0.4 ? "presenza di dialogo" : "prevalenza narrativa/descrittiva"
    }. La densità di avverbi è ${
      s.adverbsPer1000 > 18 ? "alta" : "contenuta"
    } e ${s.cliches > 0 ? `si rilevano ${s.cliches} espressioni di maniera` : "non emergono cliché evidenti"}. Questa è una stima automatica di superficie, non una lettura editoriale: attiva l'analisi dal vivo per la valutazione reale.`,
    genere: genereFor(bucket),
    temi: temiRilevati,
    qualita_prosa: {
      voto_su_10: voto,
      note: `Stima da segnali: lunghezza media periodo ~${s.avgLen.toFixed(
        0,
      )} parole, avverbi ~${s.adverbsPer1000.toFixed(0)}/1000, cliché ${s.cliches}. Non è un giudizio editoriale.`,
    },
    target_lettore: targetFor(bucket),
    comparable_titles: comparablesFor(bucket),
    punti_di_forza: forza,
    criticita,
    fit_collane,
    raccomandazione: racc,
    razionale_raccomandazione: `Stima offline: voto prosa ${voto}/10 → ${racc.replace(
      "_",
      " ",
    )}. È un'anteprima automatica pensata per provare il flusso; la valutazione reale richiede l'analisi dal vivo su Claude.`,
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
      collane_richieste: input.imprintNames,
      tempo_secondi: 1,
      fonte: "simulata",
    },
  };
}
