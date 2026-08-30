/**
 * Case editrici e loro collane REALI.
 *
 * Il modello della demo: si seleziona la CASA EDITRICE (il cliente di Kalamos);
 * il sistema suggerisce automaticamente la COLLANA più adatta tra quelle reali
 * di quella casa. Nessuna collana inventata.
 *
 * `descrizione` (casa e collana) viene iniettata nel prompt dal vivo per il
 * calcolo del fit; `profilo` guida l'euristica offline (lib/heuristic.ts).
 *
 * Per aggiungere/modificare: edita questo array. UI e API leggono da qui.
 */

// Ambito editoriale (raggruppa le case nell'interfaccia).
export type Ambito =
  | "Poesia"
  | "Narrativa"
  | "Bambini e ragazzi"
  | "Fantasy e fantascienza";

// Chiave usata dall'euristica offline per pesare i segnali del testo.
export type Profilo =
  | "poesia"
  | "narrativa"
  | "narrativa_autore"
  | "narrativa_commerciale"
  | "saggistica"
  | "giallo"
  | "fantasy"
  | "albo"
  | "ragazzi_piccoli"
  | "ragazzi_medi"
  | "ragazzi_grandi";

export interface Collana {
  nome: string;
  profilo: Profilo;
  descrizione: string;
}

export type Gruppo = "Gruppo Mondadori" | "Indipendente" | "HarperCollins";

export interface Publisher {
  id: string;
  nome: string;
  ambito: Ambito;
  gruppo: Gruppo;
  descrizione: string;
  collane: Collana[];
  defaultOn?: boolean;
}

export const publishers: Publisher[] = [
  // ── Poesia ─────────────────────────────────────────────────────────────
  {
    id: "ladolfi",
    nome: "Giuliano Ladolfi Editore",
    ambito: "Poesia",
    gruppo: "Indipendente",
    descrizione:
      "Editore indipendente di Borgomanero nato dall'esperienza della rivista «Atelier». Baricentro sulla poesia contemporanea italiana, con attenzione al canone e alle nuove voci. Principio guida: «vale il testo, non il nome».",
    collane: [
      { nome: "Atelier poesia", profilo: "poesia", descrizione: "Poesia contemporanea di ricerca legata alla rivista «Atelier»: voci in formazione con progetto e lingua propria." },
      { nome: "Perle poesia", profilo: "poesia", descrizione: "La collana di poesia più ampia della casa: raccolte di autori italiani contemporanei, dall'esordio alla maturità." },
      { nome: "Zaffiro", profilo: "poesia", descrizione: "Poesia, spesso con testo a fronte e apertura internazionale." },
      { nome: "Onice", profilo: "poesia", descrizione: "Collana di poesia della casa (serie delle 'pietre')." },
      { nome: "Opale", profilo: "poesia", descrizione: "Collana di poesia della casa (serie delle 'pietre')." },
    ],
  },
  {
    id: "samuele",
    nome: "Samuele Editore",
    ambito: "Poesia",
    gruppo: "Indipendente",
    descrizione:
      "Editore di poesia di Fanna/Pordenone, forte apertura civile e internazionale. La sua storia parte dai poeti del territorio e arriva a un catalogo di respiro nazionale ed europeo.",
    collane: [
      { nome: "Scilla", profilo: "poesia", descrizione: "La collana di punta (dal 2009, dir. Alessandro Canzian): autori storicizzati ed eccellenti proposte, italiane e internazionali." },
      { nome: "La Gialla", profilo: "poesia", descrizione: "Poesia giovane, nata con Pordenonelegge (unisce le precedenti Gialla e Gialla Oro): nuove voci selezionate." },
      { nome: "I Poeti di Pordenone", profilo: "poesia", descrizione: "Poesia del Novecento del territorio pordenonese: recupero e valorizzazione degli autori locali." },
    ],
  },
  {
    id: "interno-poesia",
    nome: "Interno Poesia",
    ambito: "Poesia",
    gruppo: "Indipendente",
    descrizione:
      "Progetto editoriale nato nel 2016 dal blog omonimo, dedicato alla poesia contemporanea, classica e del Novecento, italiana e straniera. Forte presenza culturale e digitale.",
    collane: [
      { nome: "Interno Libri", profilo: "poesia", descrizione: "Poesia contemporanea italiana: la collana principale, per voci di oggi." },
      { nome: "Interno Books", profilo: "poesia", descrizione: "Poesia straniera, spesso con testo a fronte." },
      { nome: "Interno Novecento", profilo: "poesia", descrizione: "Poesia del Novecento da riscoprire e riproporre." },
      { nome: "Interno Classici", profilo: "poesia", descrizione: "Grandi classici della poesia in nuove edizioni." },
      { nome: "Interno Beta", profilo: "poesia", descrizione: "Spazio sperimentale e per esordi." },
    ],
  },

  // ── Narrativa ──────────────────────────────────────────────────────────
  {
    // Divisione target del PoC (vedi 03-poc-proposal/target-division.md).
    // Collane verificate su IBS/Feltrinelli (pagine collana dell'editore):
    // Pandora, Saggi, Economia, Varia — fonti: ibs.it/libri/editori/sperling-&-kupfer,
    // lafeltrinelli.it/libri/collane/pandora-p200233, it.wikipedia.org/wiki/Sperling_&_Kupfer
    id: "sperling-kupfer",
    nome: "Sperling & Kupfer",
    ambito: "Narrativa",
    gruppo: "Gruppo Mondadori",
    defaultOn: true,
    descrizione:
      "Casa milanese fondata nel 1899, nel Gruppo Mondadori dagli anni Ottanta. Vocazione commerciale e mainstream: narrativa di largo pubblico (romance, thriller, feel-good), non-fiction divulgativa, self-help ed economia. Cerca leggibilità immediata, hook forte e potenziale bestseller.",
    collane: [
      { nome: "Pandora", profilo: "narrativa_commerciale", descrizione: "La collana storica di narrativa: fiction italiana e straniera di largo pubblico — romance, mystery e thriller, young adult. Leggibilità e presa immediata." },
      { nome: "Saggi", profilo: "saggistica", descrizione: "Non-fiction divulgativa e self-help: crescita personale, benessere, attualità raccontata al grande pubblico." },
      { nome: "Economia", profilo: "saggistica", descrizione: "Economia e management divulgativi: business, carriera e finanza personale per lettori non specialisti." },
      { nome: "Varia", profilo: "saggistica", descrizione: "Biografie, salute e benessere, sport, spettacolo, lifestyle: la non-fiction di largo consumo della casa." },
    ],
  },
  {
    id: "einaudi",
    nome: "Einaudi",
    ambito: "Narrativa",
    gruppo: "Gruppo Mondadori",
    defaultOn: true,
    descrizione:
      "Casa editrice storica di prestigio, catalogo letterario di riferimento in Italia. Cerca qualità della scrittura, voce e rilevanza, dalla letteratura di punta al genere d'autore.",
    collane: [
      { nome: "Supercoralli", profilo: "narrativa", descrizione: "La collana di punta (dal 1948): letteratura di ogni genere, grandi opere italiane e internazionali." },
      { nome: "I Coralli", profilo: "narrativa", descrizione: "Narrativa contemporanea di qualità in formato più agile; storicamente opere più brevi." },
      { nome: "Einaudi Stile Libero", profilo: "narrativa_autore", descrizione: "Narrativa contemporanea con piglio pop: noir e crime d'autore, voci forti e civili, sperimentazione controllata." },
    ],
  },
  {
    id: "sellerio",
    nome: "Sellerio",
    ambito: "Narrativa",
    gruppo: "Indipendente",
    descrizione:
      "Editore indipendente di Palermo, identità fortissima (la storica «collana blu»). Narrativa e giallo d'autore, letture di qualità, catalogo mediterraneo e civile.",
    collane: [
      { nome: "La memoria", profilo: "giallo", descrizione: "La celebre «collana blu» voluta da Sciascia: narrativa e gialli, letture agili ma di qualità (la casa dei grandi gialli d'autore)." },
      { nome: "Il contesto", profilo: "narrativa_autore", descrizione: "Nata nel 2003 accanto a La memoria: narrazioni più dense e ampie, spesso di respiro contemporaneo." },
      { nome: "La rosa dei venti", profilo: "narrativa", descrizione: "Titoli esemplari a indicare traiettorie e pietre miliari della narrativa." },
    ],
  },

  // ── Bambini e ragazzi ───────────────────────────────────────────────────
  {
    id: "battello-a-vapore",
    nome: "Il Battello a Vapore (Piemme)",
    ambito: "Bambini e ragazzi",
    gruppo: "Gruppo Mondadori",
    defaultOn: true,
    descrizione:
      "Il marchio di riferimento della narrativa per bambini e ragazzi, organizzato in serie per fasce d'età e difficoltà di lettura. Storie con protagonisti in cui il giovane lettore si identifica.",
    collane: [
      { nome: "Serie Bianca", profilo: "ragazzi_piccoli", descrizione: "Prime letture (5-7 anni): poco testo, molte illustrazioni, per chi inizia a leggere da solo." },
      { nome: "Serie Azzurra", profilo: "ragazzi_medi", descrizione: "Lettori 7-9 anni: storie da leggere in autonomia, testo più esteso." },
      { nome: "Serie Arancio", profilo: "ragazzi_grandi", descrizione: "Lettori 9-11 anni: romanzi più strutturati, temi più ampi." },
      { nome: "Serie Rossa", profilo: "ragazzi_grandi", descrizione: "Ragazzi dagli 11 anni: romanzi per lettori esperti, temi da preadolescenza." },
    ],
  },
  {
    id: "topipittori",
    nome: "Topipittori",
    ambito: "Bambini e ragazzi",
    gruppo: "Indipendente",
    descrizione:
      "Editore indipendente di albi illustrati di ricerca e libri per ragazzi di alta qualità estetica e testuale. Il testo dialoga con l'immagine; conta l'essenzialità e l'evocazione.",
    collane: [
      { nome: "Albi", profilo: "albo", descrizione: "Albi illustrati: testo breve ed essenziale in dialogo con l'immagine." },
      { nome: "Parola magica", profilo: "poesia", descrizione: "Poesia per bambini e ragazzi." },
      { nome: "Gli anni in tasca", profilo: "ragazzi_grandi", descrizione: "Narrazioni autobiografiche sull'infanzia e l'adolescenza, dai 10 anni (Premio Andersen 2010)." },
      { nome: "PiPPO", profilo: "albo", descrizione: "Piccola Pinacoteca Portatile: l'arte per i più piccoli, testo minimo." },
    ],
  },

  // ── Fantasy e fantascienza ────────────────────────────────────────────────
  {
    id: "oscar-vault",
    nome: "Oscar Vault (Mondadori)",
    ambito: "Fantasy e fantascienza",
    gruppo: "Gruppo Mondadori",
    descrizione:
      "L'area del fantastico degli Oscar Mondadori (la «Casa del Fantastico»): fantasy, fantascienza e speculative fiction, saghe e grandi autori internazionali. Cerca immaginario forte, world-building e tensione.",
    collane: [
      { nome: "Oscar Fantastica", profilo: "fantasy", descrizione: "Fantasy e fantascienza: la collana ampia del fantastico, saghe e autori di riferimento." },
      { nome: "Oscar Draghi", profilo: "fantasy", descrizione: "Grandi volumi illustrati del fantasy, saghe e cicli in edizioni ricche." },
      { nome: "Oscar Fabula", profilo: "fantasy", descrizione: "Fantastico e speculative fiction dal taglio più letterario." },
      { nome: "Oscar Ink", profilo: "fantasy", descrizione: "Graphic novel e fumetto d'autore nell'area del fantastico." },
    ],
  },
];

export function getPublisher(id: string): Publisher | undefined {
  return publishers.find((p) => p.id === id);
}

export const defaultPublisherIds = publishers
  .filter((p) => p.defaultOn)
  .map((p) => p.id);

export const ambiti: Ambito[] = [
  "Narrativa",
  "Bambini e ragazzi",
  "Fantasy e fantascienza",
  "Poesia",
];
