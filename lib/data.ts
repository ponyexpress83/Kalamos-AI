export type Verdetto = "Acquisizione forte" | "Approfondisci" | "Rigetta";
export type Stato = "Valutato" | "In elaborazione";

export interface FitCollana {
  collana: string;
  score: number; // 0-100
  verdetto: Verdetto;
  nota: string;
}

export interface Scheda {
  id: string;
  titolo: string;
  autore: string;
  anno?: string;
  genere: string;
  parole: number;
  dataValutazione: string;
  collanaTarget: string;
  verdettoTarget: Verdetto;
  confidenza: "Alta" | "Media" | "Bassa";
  fitScores: FitCollana[];
  sintesi: string;
  voce: string;
  struttura: string;
  personaggi: string;
  temi: string;
  mercato: string;
  comparabili: string[];
  forza: string[];
  debolezza: string[];
  raccomandazione: string;
  note: string;
  stato: Stato;
  esempio?: boolean; // opera di pubblico dominio usata come esempio
}

export const manoscritti: Scheda[] = [
  {
    id: "1042",
    titolo: "Le Tigri di Mompracem",
    autore: "E. Salgari",
    anno: "1900",
    genere: "Avventura / azione esotica",
    parole: 95000,
    dataValutazione: "26 mag 2026",
    collanaTarget: "Sperling & Kupfer",
    verdettoTarget: "Approfondisci",
    confidenza: "Alta",
    fitScores: [
      { collana: "Sperling & Kupfer", score: 72, verdetto: "Approfondisci", nota: "Avventura commerciale ad alta leggibilità: nel DNA della collana. Serve lavoro editoriale sulla prosa." },
      { collana: "Strade Blu", score: 64, verdetto: "Approfondisci", nota: "Avventura upmarket possibile, ma il testo è più popolare che premium." },
      { collana: "Einaudi Stile Libero", score: 38, verdetto: "Rigetta", nota: "Manca la torsione letteraria o di genere contemporaneo che la collana cerca." },
    ],
    sintesi:
      "Mompracem, isola-fortezza nel mar della Malesia. Sandokan, la Tigre della Malesia, principe spodestato divenuto pirata, conduce una guerra privata contro il dominio coloniale inglese che gli ha sterminato la famiglia. La sua corsa si ferma quando sente parlare di Marianna Guillonk, la Perla di Labuan: se ne innamora senza averla vista. Ferito, viene curato in casa Guillonk sotto falsa identità; i due si amano, ma l'origine di lei e la taglia su di lui rendono il legame una condanna. Abbordaggi, fughe, tradimenti e battaglie navali fino all'assalto finale, in cui Sandokan rischia Mompracem stessa per riconquistarla.",
    voce:
      "Prosa funzionale all'azione, di registro alto-ottocentesco: aggettivazione abbondante, esotismo pittorico, dialoghi enfatici. Ha ritmo e sa costruire la scena d'azione, ma per un lettore contemporaneo risulta sovraccarica. È il limite più evidente in ottica di mercato attuale.",
    struttura:
      "Struttura solida e collaudata da feuilleton: capitoli brevi che chiudono su un gancio. La curva di tensione è ben gestita; il ritmo cala solo nelle digressioni descrittive. La storia d'amore funziona da motore emotivo e bilancia l'azione.",
    personaggi:
      "Sandokan è costruito con efficacia: nobile e feroce, mosso da un torto fondativo che ne giustifica la violenza. Marianna è più convenzionale. Yanez, il compagno europeo flemmatico, è la spalla riuscita. L'antagonismo è sistemico (il colonialismo) più che incarnato in un villain memorabile.",
    temi:
      "Ribellione anticoloniale, lealtà, amore impossibile, esilio. L'ambientazione malese è il vero brand del testo. Attenzione: l'esotismo è di matrice ottocentesca e contiene stereotipi etnici databili, da maneggiare con consapevolezza in qualsiasi ripresa contemporanea.",
    mercato:
      "Avventura ad alto tasso d'azione con forte identità d'ambientazione e un eroe trasmediale già riconoscibile. Target ampio, prevalenza maschile ma non esclusiva. Il capitale di marca (Sandokan) è un asset commerciale raro per un testo di catalogo.",
    comparabili: [
      "Valerio Massimo Manfredi — avventura storica italiana di forte vendita",
      "Wilbur Smith, Bernard Cornwell — avventura/storico ad alta rotazione",
      "Franchise Sandokan (TV, fumetto) — amplifica il potenziale di una riproposta",
    ],
    forza: [
      "Motore narrativo potentissimo",
      "Identità d'ambientazione fortissima",
      "Protagonista iconico e brand preesistente",
      "Ritmo da pageturner",
    ],
    debolezza: [
      "Prosa datata e ridondante per gli standard attuali",
      "Stereotipi d'epoca da gestire",
      "Figura femminile poco moderna",
      "Antagonista poco incarnato",
    ],
    raccomandazione:
      "Approfondisci per Sperling & Kupfer, con piano di riposizionamento: editing di alleggerimento della prosa, apparato che inquadri criticamente l'esotismo d'epoca, sfruttamento del capitale di marca Sandokan. Il rischio non è il materiale narrativo — solidissimo — ma la confezione.",
    note:
      "Se l'obiettivo è una riproposta di catalogo o un'edizione brandizzata, il potenziale è alto e il lavoro prevedibile. Se l'obiettivo è una collana letteraria, lasciar perdere: ottimo testo, lista sbagliata.",
    stato: "Valutato",
    esempio: true,
  },
  {
    id: "1043",
    titolo: "La coscienza di Zeno",
    autore: "I. Svevo",
    anno: "1923",
    genere: "Letterario / modernista",
    parole: 145000,
    dataValutazione: "26 mag 2026",
    collanaTarget: "Sperling & Kupfer",
    verdettoTarget: "Rigetta",
    confidenza: "Alta",
    fitScores: [
      { collana: "Sperling & Kupfer", score: 34, verdetto: "Rigetta", nota: "Eccellente, ma estraneo a una lista commerciale: nessun hook, ritmo lento, target diverso." },
      { collana: "Strade Blu", score: 47, verdetto: "Rigetta", nota: "Più vicino, ma resta troppo letterario puro per il profilo upmarket-commerciale." },
      { collana: "Einaudi Stile Libero", score: 78, verdetto: "Acquisizione forte", nota: "Voce e ambizione letteraria nel cuore della collana." },
    ],
    sintesi:
      "Zeno Cosini, commerciante triestino, scrive le proprie memorie su richiesta dello psicoanalista che lo ha in cura — un memoriale che il dottore dichiara di pubblicare per vendetta. Il racconto è tematico, non cronologico: il vizio del fumo e l'ultima sigaretta mille volte rinnovata; la morte del padre; il corteggiamento delle sorelle Malfenti, con Zeno respinto da Ada e dirottato sul matrimonio con Augusta; la rivalità affettuosa e disastrosa col cognato Guido. Sullo sfondo, la riflessione su malattia e salute che ne ribalta i termini: il sano Zeno sopravvive, gli altri no.",
    voce:
      "Qui sta il valore. Voce adulta, ironica, psicologicamente stratificata: l'inattendibilità non è un trucco ma la materia del libro. Prosa volutamente antiretorica, lontana dalla bella pagina dannunziana coeva — scelta modernissima. Per un editor letterario, prosa di prima categoria.",
    struttura:
      "Struttura a blocchi tematici incorniciata dall'espediente del memoriale analitico. Non c'è trama a tensione crescente: c'è accumulo, ritorno, scavo. Ritmo lento e digressivo per definizione: è un romanzo da lettore che cerca la voce, non l'evento.",
    personaggi:
      "Zeno è uno dei narratori inattendibili più riusciti del Novecento europeo: comico e doloroso, mai eroico, sempre vero. Augusta ha una solidità sorprendente, anti-romantica e luminosa. Guido funziona come specchio rovesciato del protagonista.",
    temi:
      "Malattia e salute, autoinganno, psicoanalisi osservata con ironia, denaro e fallimento, mediocrità come forma di sopravvivenza. Trieste mitteleuropea, di confine, è ambiente culturale prima che scenario.",
    mercato:
      "Narrativa letteraria d'autore. Target: lettore forte, orientato al catalogo letterario di prestigio. Non è titolo da rotazione rapida né da impulso: è titolo da catalogo lungo, da scuola, da ristampa stabile. Valore reputazionale altissimo, velocità di vendita bassa.",
    comparabili: [
      "Narrativa modernista introspettiva (Proust, Joyce come antecedenti di metodo)",
      "Narrativa letteraria a narratore inattendibile, del tipo dei cataloghi Adelphi / Einaudi",
      "Lettori di autofiction letteraria d'autore",
    ],
    forza: [
      "Voce di rango assoluto",
      "Inattendibilità come architettura",
      "Ironia che non invecchia",
      "Valore di catalogo e scolastico duraturo",
    ],
    debolezza: [
      "Nessun gancio di trama (solo in chiave commerciale)",
      "Ritmo lento, lunghezza impegnativa",
      "Vendita per accumulo lento, non per picco",
    ],
    raccomandazione:
      "Per Sperling & Kupfer: rigetta — non per debolezza del testo, ma per disallineamento di lista. Se la valutazione fosse per una collana letteraria del gruppo, il verdetto sarebbe acquisizione forte con priorità alta.",
    note:
      "È esattamente il manoscritto che un triage commerciale rischia di scartare per i motivi giusti e con la conclusione sbagliata. Kalamos segnala la divergenza in modo esplicito — fit basso su questa collana, fit altissimo altrove — così che il valore non si perda nel filtro.",
    stato: "Valutato",
    esempio: true,
  },
  {
    id: "1044",
    titolo: "Il porto delle nebbie",
    autore: "Manoscritto inedito (anonimizzato)",
    genere: "Thriller mediterraneo",
    parole: 88000,
    dataValutazione: "26 mag 2026",
    collanaTarget: "Sperling & Kupfer",
    verdettoTarget: "Approfondisci",
    confidenza: "Media",
    fitScores: [
      { collana: "Sperling & Kupfer", score: 69, verdetto: "Approfondisci", nota: "Genere e ritmo nel perimetro commerciale; voce ancora da rifinire." },
      { collana: "Strade Blu", score: 58, verdetto: "Approfondisci", nota: "Possibile se l'editing alza il registro." },
      { collana: "Einaudi Stile Libero", score: 51, verdetto: "Rigetta", nota: "Manca l'angolo autoriale che distinguerebbe il noir dalla collana." },
    ],
    sintesi:
      "Una commissaria tornata nella città portuale d'origine indaga su una serie di sparizioni che intrecciano contrabbando e memoria familiare. Struttura procedurale classica con forte senso del luogo.",
    voce:
      "Voce solida ma ancora derivativa del noir mediterraneo di scuola. Dialoghi efficaci; descrizioni a tratti compiaciute. Potenziale buono con un editing di asciugatura.",
    struttura:
      "Tre atti riconoscibili, ritmo che tiene fino al terzo quarto, dove la tensione si allenta prima del confronto finale. Da rivedere il midpoint.",
    personaggi:
      "Protagonista ben definita e con arco chiaro. Antagonista un po' telefonato. Comprimari funzionali.",
    temi: "Radici, colpa, comunità di confine. Niente di nuovo ma trattato con onestà.",
    mercato:
      "Filone noir italiano commerciale, lettori fedeli e abituati alla serialità. Buon potenziale di serie se la protagonista regge un secondo volume.",
    comparabili: [
      "Noir mediterraneo di catalogo commerciale",
      "Serie procedurali italiane a forte identità geografica",
    ],
    forza: ["Senso del luogo", "Protagonista con potenziale seriale", "Ritmo nella prima metà"],
    debolezza: ["Voce ancora derivativa", "Midpoint debole", "Antagonista convenzionale"],
    raccomandazione:
      "Approfondisci: chiedere all'autore una revisione del terzo atto e un capitolo campione che mostri come svilupperebbe un secondo volume.",
    note: "Candidato realistico per la collana commerciale a patto di un round di editing strutturale.",
    stato: "Valutato",
  },
  {
    id: "1045",
    titolo: "Anni di vento",
    autore: "Manoscritto inedito (anonimizzato)",
    genere: "Memoir / saggistica narrativa",
    parole: 62000,
    dataValutazione: "26 mag 2026",
    collanaTarget: "Sperling & Kupfer",
    verdettoTarget: "Rigetta",
    confidenza: "Alta",
    fitScores: [
      { collana: "Sperling & Kupfer", score: 29, verdetto: "Rigetta", nota: "Memoir privato senza gancio di mercato né autore con piattaforma." },
      { collana: "Strade Blu", score: 33, verdetto: "Rigetta", nota: "Stessa criticità: manca la notiziabilità." },
      { collana: "Einaudi Stile Libero", score: 41, verdetto: "Rigetta", nota: "Scrittura dignitosa ma non abbastanza distintiva." },
    ],
    sintesi:
      "Memoir familiare che ripercorre tre generazioni in un paese dell'entroterra. Scrittura curata, materia intima ma priva di un aggancio che ne giustifichi la pubblicazione trade.",
    voce: "Prosa corretta e a tratti felice, ma senza una cifra che la renda riconoscibile.",
    struttura: "Andamento cronologico lineare, poche tensioni narrative.",
    personaggi: "Figure familiari affettuose ma poco caratterizzate per un lettore esterno.",
    temi: "Memoria, terra, famiglia. Universali ma non rinnovati.",
    mercato:
      "Senza piattaforma d'autore o angolo di attualità, il memoir privato ha mercato trade molto limitato. Più adatto all'editoria locale o all'autopubblicazione.",
    comparabili: ["Memoir familiari di piccola editoria territoriale"],
    forza: ["Scrittura curata", "Sincerità della materia"],
    debolezza: ["Nessun gancio di mercato", "Autore senza piattaforma", "Voce non distintiva"],
    raccomandazione:
      "Rigetta con feedback gentile: indicare la strada dell'editoria locale e offrire due note di merito sulla scrittura.",
    note: "Caso tipico in cui la qualità della scrittura non basta a giustificare l'investimento trade.",
    stato: "Valutato",
  },
  {
    id: "1046",
    titolo: "manoscritto in arrivo",
    autore: "Manoscritto inedito (anonimizzato)",
    genere: "—",
    parole: 0,
    dataValutazione: "—",
    collanaTarget: "Sperling & Kupfer",
    verdettoTarget: "Approfondisci",
    confidenza: "Bassa",
    fitScores: [],
    sintesi: "",
    voce: "",
    struttura: "",
    personaggi: "",
    temi: "",
    mercato: "",
    comparabili: [],
    forza: [],
    debolezza: [],
    raccomandazione: "",
    note: "",
    stato: "In elaborazione",
  },
];

export function getScheda(id: string): Scheda | undefined {
  return manoscritti.find((m) => m.id === id);
}

export function statistiche() {
  const valutati = manoscritti.filter((m) => m.stato === "Valutato");
  const inCoda = manoscritti.filter((m) => m.stato === "In elaborazione").length;
  const selezionati = valutati.filter((m) => m.verdettoTarget !== "Rigetta").length;
  return { totali: manoscritti.length, valutati: valutati.length, inCoda, selezionati };
}
