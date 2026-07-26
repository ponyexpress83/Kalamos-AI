/**
 * Profili editoriali (collane / case editrici).
 *
 * Ogni profilo è una descrizione iniettata nel prompt di analisi per calcolare
 * il fit-score e la motivazione specifica; `profilo` guida invece l'euristica
 * offline (lib/heuristic.ts). Le descrizioni sono scritte perché DIVERGANO:
 * lo stesso testo riceve punteggi diversi a seconda della collana.
 *
 * Per aggiungere/modificare una collana: edita questo array. Nient'altro da
 * toccare — UI e API leggono da qui.
 */

// Chiave usata dall'euristica offline per pesare i segnali del testo.
export type Profilo =
  | "narrativa_commerciale"
  | "narrativa_autore"
  | "narrativa_upmarket"
  | "poesia"
  | "ragazzi"
  | "albi"
  | "giallo"
  | "fantasy"
  | "romance"
  | "graphic";

// Sezione mostrata nell'interfaccia (raggruppa i chip).
export type Reparto = "Narrativa" | "Poesia" | "Bambini e ragazzi" | "Generi";

export interface Imprint {
  id: string;
  nome: string;
  gruppo: string;
  reparto: Reparto;
  profilo: Profilo;
  descrizione: string;
  defaultOn?: boolean; // selezionata di default nell'UI
}

export const imprints: Imprint[] = [
  // ── Narrativa ────────────────────────────────────────────────────────────
  {
    id: "sperling-kupfer",
    nome: "Sperling & Kupfer",
    gruppo: "Mondadori",
    reparto: "Narrativa",
    profilo: "narrativa_commerciale",
    defaultOn: true,
    descrizione:
      "Narrativa commerciale e mainstream a vocazione bestseller: feel-good, romance, women's fiction, thriller di largo pubblico, oltre a non-fiction divulgativa e self-help. Cerca leggibilità immediata, un hook forte nelle prime pagine, dialoghi brillanti, ritmo, potenziale commerciale ampio. Rifiuta i testi ostici, lenti o troppo letterari e quelli senza un gancio di mercato.",
  },
  {
    id: "einaudi-stile-libero",
    nome: "Einaudi Stile Libero",
    gruppo: "Mondadori",
    reparto: "Narrativa",
    profilo: "narrativa_autore",
    defaultOn: true,
    descrizione:
      "Narrativa contemporanea di qualità con piglio pop: noir e crime d'autore, voci forti e civili, sperimentazione controllata. Cerca la voce — una cifra stilistica riconoscibile — e la rilevanza culturale. Rifiuta il commerciale puro senza ambizione, il feel-good levigato e la prosa derivativa.",
  },
  {
    id: "mondadori-strade-blu",
    nome: "Mondadori Strade Blu",
    gruppo: "Mondadori",
    reparto: "Narrativa",
    profilo: "narrativa_upmarket",
    defaultOn: true,
    descrizione:
      "Narrativa italiana e internazionale di qualità upmarket: ambizione letteraria con tenuta di mercato, grandi voci d'autore, romanzi che uniscono spessore e leggibilità. Rifiuta sia il genere di puro intrattenimento sia lo sperimentalismo senza pubblico.",
  },

  // ── Poesia ───────────────────────────────────────────────────────────────
  {
    id: "ladolfi",
    nome: "Ladolfi Editore",
    gruppo: "Indipendente",
    reparto: "Poesia",
    profilo: "poesia",
    descrizione:
      "Editore indipendente di poesia contemporanea italiana, attento alle nuove voci e alla ricerca formale (collana 'Il crisallide'). Cerca testi in versi con una lingua propria, tensione e coerenza di progetto. Non è una collana di narrativa né di intrattenimento.",
  },
  {
    id: "samuele-editore",
    nome: "Samuele Editore",
    gruppo: "Indipendente",
    reparto: "Poesia",
    profilo: "poesia",
    descrizione:
      "Editore di poesia (collana 'Scilla') con forte apertura internazionale e civile, spesso testi a fronte. Cerca poesia matura, di respiro europeo, con qualità di dettato e rilevanza tematica. Solo versi, non prosa.",
  },
  {
    id: "interno-poesia",
    nome: "Interno Poesia",
    gruppo: "Indipendente",
    reparto: "Poesia",
    profilo: "poesia",
    descrizione:
      "Editore di poesia contemporanea con forte presenza culturale e digitale, attento a voci comunicabili e a un pubblico ampio di lettori di poesia. Cerca raccolte in versi con immediatezza, cura del verso e potenziale di diffusione. Non pubblica narrativa.",
  },

  // ── Bambini e ragazzi ─────────────────────────────────────────────────────
  {
    id: "battello-a-vapore",
    nome: "Il Battello a Vapore",
    gruppo: "Piemme (Mondadori)",
    reparto: "Bambini e ragazzi",
    profilo: "ragazzi",
    descrizione:
      "Narrativa per bambini e ragazzi (6-12 anni) per fasce di lettura: storie con protagonisti in cui il giovane lettore si identifica, lingua chiara, ritmo, avventura, umorismo e valori. Cerca leggibilità, personaggi memorabili, serialità potenziale. Rifiuta i testi adulti per tono o complessità.",
  },
  {
    id: "topipittori",
    nome: "Topipittori",
    gruppo: "Indipendente",
    reparto: "Bambini e ragazzi",
    profilo: "albi",
    descrizione:
      "Editore di albi illustrati di ricerca, di alta qualità estetica e testuale. Il testo è breve, essenziale, in dialogo con l'immagine; conta il ritmo, l'evocazione, la capacità di dire molto con poche parole. Rifiuta i testi lunghi, didascalici o puramente commerciali.",
  },

  // ── Generi ────────────────────────────────────────────────────────────────
  {
    id: "giallo-mondadori",
    nome: "Il Giallo Mondadori",
    gruppo: "Mondadori",
    reparto: "Generi",
    profilo: "giallo",
    descrizione:
      "Collana storica del giallo, poliziesco e thriller: cerca trama solida, indagine ben congegnata, ritmo e tenuta della suspense fino allo scioglimento. Premia il mestiere di genere e la serialità. Meno interessata alla sperimentazione letteraria pura.",
  },
  {
    id: "fanucci",
    nome: "Fanucci Editore",
    gruppo: "Indipendente",
    reparto: "Generi",
    profilo: "fantasy",
    descrizione:
      "Editore di riferimento per fantasy, fantascienza e distopia: world-building, immaginario forte, avventura e saghe. Cerca ambientazioni originali, tensione narrativa e potenziale di serie. Rifiuta il realismo intimista senza elemento fantastico.",
  },
  {
    id: "harmony",
    nome: "Harmony",
    gruppo: "HarperCollins Italia",
    reparto: "Generi",
    profilo: "romance",
    descrizione:
      "Romance di largo consumo: storia d'amore al centro, emozione, calore, lieto fine e forte identificazione. Cerca chimica tra i protagonisti, ritmo sentimentale e leggibilità. Rifiuta i testi cupi, ironici-distaccati o senza baricentro romantico.",
  },
  {
    id: "bao-publishing",
    nome: "Bao Publishing",
    gruppo: "Indipendente",
    reparto: "Generi",
    profilo: "graphic",
    descrizione:
      "Editore di fumetto e graphic novel d'autore. Valuta la sceneggiatura: dialoghi efficaci, ritmo per tavole, voce e originalità del racconto per immagini. Cerca storie forti pensate per il disegno. Rifiuta la prosa non adattabile alla forma a fumetti.",
  },
];

export function getImprint(id: string): Imprint | undefined {
  return imprints.find((i) => i.id === id);
}

export const defaultImprintIds = imprints
  .filter((i) => i.defaultOn)
  .map((i) => i.id);

export const reparti: Reparto[] = [
  "Narrativa",
  "Poesia",
  "Bambini e ragazzi",
  "Generi",
];
