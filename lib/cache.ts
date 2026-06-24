import type { AnalysisResult } from "./schema";

/**
 * Schede pre-generate per i 4 manoscritti demo.
 *
 * Sono in cache così la demo parte istantanea (anche offline). Restano
 * comunque ri-analizzabili dal vivo via /api/analyze.
 *
 * Le collane usano i nomi definiti in /config/imprints.ts.
 */

const COLLANE = [
  "Sperling & Kupfer",
  "Einaudi Stile Libero",
  "Mondadori Strade Blu",
];

export const demoSchede: Record<string, AnalysisResult> = {
  // ─────────────────────────────────────────────────────────────────────────
  "01_il-giardino-di-vetro": {
    meta: {
      titolo_input: "Il giardino di vetro",
      autore: "Marta Bevilacqua",
      parole: 662,
      valutato_su_estratto: false,
      parole_inviate: 662,
      collane_richieste: COLLANE,
      tempo_secondi: 11,
      fonte: "demo",
    },
    scheda: {
      titolo_presunto: "Il giardino di vetro",
      logline:
        "Tornando dalla nonna cieca che conserva le stagioni in barattolo, una donna riscopre che custodire ciò che si ama è la cosa più semplice e più difficile del mondo.",
      sintesi:
        "Una donna torna dopo tre anni nella casa della nonna ottantatreenne, in un paese di campagna, e ritrova un giardino che la vecchia dichiara morto. Tra i barattoli di conserve in cantina e una stanza che fu della madre — assente, malata, mai nominata — affiora il conflitto silenzioso di tre generazioni intorno a un'unica parola: conservare. Una pianta di pomodoro nata da sola e fuori stagione diventa l'immagine guida del testo. La nonna le costruisce un riparo di vetro contro il freddo, e la protagonista capisce di essere tornata non per salvare lei, ma per imparare di nuovo a proteggere ciò che si ama senza la certezza che basti. La struttura è quella, controllatissima, del racconto di ritorno: pochi gesti, un solo oggetto-simbolo, un'epifania trattenuta.",
      genere: "Narrativa letteraria / memoir-fiction",
      temi: [
        "memoria e conservazione",
        "rapporto tra generazioni",
        "malattia non detta",
        "cura e fragilità",
        "campagna e radici",
      ],
      qualita_prosa: {
        voto_su_10: 8.5,
        note: "Voce matura e controllata, immagine guida (il vetro, il conservare) tenuta con rigore senza mai diventare simbolismo ostentato. Ritmo lento ma necessario; il non detto è gestito con misura. Prosa di prima categoria per un testo d'esordio.",
      },
      target_lettore:
        "Lettore forte di narrativa letteraria italiana contemporanea, sensibile alla scrittura di precisione e ai romanzi familiari intimisti; pubblico dei premi e dei gruppi di lettura.",
      comparable_titles: [
        {
          titolo: "L'Arminuta",
          autore: "Donatella Di Pietrantonio",
          perche:
            "Stesso registro di narrazione familiare al femminile, radicata in una geografia precisa e in un legame irrisolto madre-figlia.",
        },
        {
          titolo: "Le otto montagne",
          autore: "Paolo Cognetti",
          perche:
            "Affinità nel controllo della prosa e nell'uso del paesaggio come materia morale, con un pubblico upmarket comparabile.",
        },
        {
          titolo: "Fiore di roccia",
          autore: "Ilaria Tuti",
          perche:
            "Memoria femminile e mondo contadino trattati con cura letteraria ma con tenuta di lettura.",
        },
      ],
      punti_di_forza: [
        "Voce d'autore riconoscibile fin dall'incipit",
        "Immagine guida coerente e non didascalica",
        "Economia di mezzi: molto detto con poco",
        "Materia universale (cura, perdita) senza sentimentalismo",
      ],
      criticita: [
        "Estratto breve: la tenuta sulla lunghezza è da verificare",
        "Rischio di staticità se la tensione resta solo interiore",
        "Autrice probabilmente esordiente: manca una piattaforma",
      ],
      fit_collane: [
        {
          collana: "Einaudi Stile Libero",
          score: 0.84,
          motivazione:
            "Voce forte e cifra stilistica riconoscibile: esattamente ciò che la collana cerca. La rilevanza è più intima che civile, ma la qualità della scrittura è nel suo cuore.",
        },
        {
          collana: "Mondadori Strade Blu",
          score: 0.8,
          motivazione:
            "Ambizione letteraria con piena leggibilità: il profilo upmarket della collana le calza. Manca solo la statura d'autore già affermata.",
        },
        {
          collana: "Sperling & Kupfer",
          score: 0.34,
          motivazione:
            "Qualità innegabile, ma niente hook commerciale, ritmo lento e target diverso: fuori dal perimetro mainstream della lista.",
        },
      ],
      raccomandazione: "prioritario",
      razionale_raccomandazione:
        "Testo letterario di qualità rara per un inedito: voce, controllo, immagine guida. Va indirizzato alle collane d'autore (Einaudi Stile Libero, Strade Blu), non al mainstream commerciale. Priorità alta in lettura, con richiesta del manoscritto completo per verificare la tenuta sulla distanza.",
      nota_metodologica:
        "Valutazione su estratto del primo capitolo. Supporto alla decisione, non sostituzione del giudizio editoriale: l'editor mantiene l'ultima parola.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "02_sette-giorni-a-portofino": {
    meta: {
      titolo_input: "Sette giorni a Portofino",
      autore: "Carla Montersino",
      parole: 586,
      valutato_su_estratto: false,
      parole_inviate: 586,
      collane_richieste: COLLANE,
      tempo_secondi: 10,
      fonte: "demo",
    },
    scheda: {
      titolo_presunto: "Sette giorni a Portofino",
      logline:
        "Licenziata e lasciata nello stesso giorno, una manager milanese fugge a Portofino per sette giorni e finisce per raccogliere, scalza, i fogli di un dolore che non è il suo.",
      sintesi:
        "Bianca Ferrari, manager milanese, perde nello stesso giro di ore il lavoro e il fidanzato e prenota d'impulso sette giorni a Portofino. L'albergo a strapiombo, la padrona di casa che parla con i gerani e una vista che vale lo stipendio perduto fanno da scenario a un classico meccanismo feel-good. Sul balcone accanto c'è un uomo arrivato per firmare la vendita dell'unica cosa che non avrebbe voluto vendere; un colpo di vento sparpaglia i suoi fogli ai piedi di lei. Da lì il romanzo promette la rotta riconoscibile della commedia romantica con risvolto agrodolce. La voce è brillante, il dialogo scattante, il gancio iniziale efficace; la profondità, per ora, resta in superficie.",
      genere: "Commercial fiction / feel-good romance",
      temi: [
        "rinascita personale",
        "amore inatteso",
        "fuga e seconda possibilità",
        "lavoro e identità",
      ],
      qualita_prosa: {
        voto_su_10: 6.5,
        note: "Scrittura efficace, ritmata, con un buon orecchio per il dialogo brillante e l'ironia. Si appoggia però su immagini di maniera (le case color gelato, il vento dal tempismo perfetto) e su una caratterizzazione ancora di superficie. Funzionale al genere, non distintiva.",
      },
      target_lettore:
        "Pubblico ampio del feel-good e del women's fiction, lettrici di romanzi da ombrellone con ambizione di calore e leggerezza; forte potenziale di passaparola estivo.",
      comparable_titles: [
        {
          titolo: "Un'estate per due",
          autore: "Felicia Kingsley",
          perche:
            "Stesso registro commerciale italiano feel-good, hook romantico e ambientazione vacanziera ad alta riconoscibilità.",
        },
        {
          titolo: "La misura del tempo (filone beach-read)",
          autore: "Cataloghi commerciali estivi",
          perche:
            "Si colloca nel filone delle commedie romantiche di largo consumo con località italiana come brand.",
        },
        {
          titolo: "Il quaderno dell'amore perduto",
          autore: "Valérie Perrin",
          perche:
            "Comparabile per la promessa agrodolce, se l'autrice alzasse lo spessore emotivo nei capitoli successivi.",
        },
      ],
      punti_di_forza: [
        "Hook fortissimo nelle prime pagine",
        "Dialogo brillante e ritmo da pageturner",
        "Ambientazione-brand (Portofino) immediatamente vendibile",
        "Protagonista simpatetica con arco chiaro",
      ],
      criticita: [
        "Personaggi e situazioni ancora di maniera",
        "Profondità emotiva da costruire oltre l'incipit",
        "Comparabili affollati: serve un elemento di differenziazione",
      ],
      fit_collane: [
        {
          collana: "Sperling & Kupfer",
          score: 0.81,
          motivazione:
            "Leggibilità, hook e potenziale commerciale ampio: è esattamente il DNA feel-good della lista. Candidato naturale per la stagione estiva.",
        },
        {
          collana: "Mondadori Strade Blu",
          score: 0.42,
          motivazione:
            "Possibile solo se un editing alzasse decisamente il registro e lo spessore: oggi è più commerciale che upmarket.",
        },
        {
          collana: "Einaudi Stile Libero",
          score: 0.22,
          motivazione:
            "Manca la voce d'autore e la rilevanza culturale che la collana richiede: feel-good levigato, lontano dal suo profilo.",
        },
      ],
      raccomandazione: "seconda_lettura",
      razionale_raccomandazione:
        "Prodotto commerciale ben confezionato, con un gancio forte ma profondità ancora da dimostrare. Seconda lettura per Sperling & Kupfer: chiedere il manoscritto completo e valutare se la tenuta emotiva regge oltre l'incipit. Ribalta lo scoring del titolo letterario: qui vince il mainstream, non le collane d'autore.",
      nota_metodologica:
        "Valutazione su estratto del primo capitolo. Supporto alla decisione, non sostituzione del giudizio editoriale.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "03_le-ombre-del-passato": {
    meta: {
      titolo_input: "Le ombre del passato",
      autore: "R. Vinci",
      parole: 501,
      valutato_su_estratto: false,
      parole_inviate: 501,
      collane_richieste: COLLANE,
      tempo_secondi: 9,
      fonte: "demo",
    },
    scheda: {
      titolo_presunto: "Le ombre del passato",
      logline:
        "Un ispettore tormentato dalla morte mai chiarita della moglie indaga su un omicidio che riapre, con un dettaglio impossibile, le ferite del suo passato.",
      sintesi:
        "L'ispettore Marco Rossi, vedovo inconsolabile, viene chiamato di notte sulla scena di un omicidio. La vittima, una giovane donna senza nemici, porta sul polso un tatuaggio identico a quello della moglie morta dieci anni prima in circostanze mai chiarite. Rossi, che 'non crede nelle coincidenze', capisce che le ombre del passato sono tornate a perseguitarlo. L'impianto è quello del giallo seriale più classico, ma la realizzazione è dominata da cliché (l'incipit 'notte buia e tempestosa'), avverbi a raffica, telling pervasivo, info-dump biografici e personaggi piatti. Il materiale narrativo non è sostenuto da alcuna scrittura.",
      genere: "Thriller / giallo",
      temi: ["vendetta", "lutto", "passato che ritorna", "indagine"],
      qualita_prosa: {
        voto_su_10: 3,
        note: "Prosa gravemente sotto soglia: apertura con cliché conclamato, aggettivazione e avverbi ridondanti ('improvvisamente', 'incessantemente'), caratterizzazione per accumulo di etichette ('occhi azzurri penetranti'), dialoghi espositivi e info-dump. Telling costante al posto dello showing. Niente voce, niente controllo.",
      },
      target_lettore:
        "In teoria il lettore del giallo seriale di consumo, ma il livello di scrittura attuale non regge il confronto con la produzione di mercato corrente.",
      comparable_titles: [
        {
          titolo: "Produzione slush del filone poliziesco",
          autore: "—",
          perche:
            "Riproduce gli stilemi del giallo commerciale senza la padronanza tecnica che li rende efficaci.",
        },
        {
          titolo: "Manualistica su cliché da evitare",
          autore: "—",
          perche:
            "Il testo funziona quasi come campionario dei difetti tipici dell'esordiente (telling, avverbi, info-dump).",
        },
      ],
      punti_di_forza: [
        "Struttura di genere riconoscibile",
        "Un gancio potenziale nel dettaglio del tatuaggio",
      ],
      criticita: [
        "Prosa satura di cliché e avverbi",
        "Telling e info-dump pervasivi",
        "Personaggi bidimensionali",
        "Nessuna voce o cifra stilistica",
        "Dialoghi puramente espositivi",
      ],
      fit_collane: [
        {
          collana: "Sperling & Kupfer",
          score: 0.16,
          motivazione:
            "Anche per il commerciale serve mestiere: il livello di scrittura non regge gli standard minimi della lista.",
        },
        {
          collana: "Mondadori Strade Blu",
          score: 0.1,
          motivazione:
            "Lontanissimo dal profilo upmarket: né qualità letteraria né tenuta di mercato.",
        },
        {
          collana: "Einaudi Stile Libero",
          score: 0.09,
          motivazione:
            "Nessuna voce d'autore né rilevanza: agli antipodi di ciò che la collana cerca.",
        },
      ],
      raccomandazione: "scarta",
      razionale_raccomandazione:
        "Scarta con feedback tecnico. Il sistema dice NO con motivazioni concrete: cliché, avverbi, telling, info-dump e personaggi piatti rendono il testo non lavorabile allo stato attuale. Se l'autore ha un'idea di trama, va riscritto da capo sul piano della scrittura prima di qualsiasi valutazione editoriale.",
      nota_metodologica:
        "Valutazione su estratto del primo capitolo. Supporto alla decisione, non sostituzione del giudizio editoriale: un parere così netto va sempre confermato da un lettore umano.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "04_la-stagione-delle-locuste": {
    meta: {
      titolo_input: "La stagione delle locuste",
      autore: "Nuccio Carbè",
      parole: 562,
      valutato_su_estratto: false,
      parole_inviate: 562,
      collane_richieste: COLLANE,
      tempo_secondi: 12,
      fonte: "demo",
    },
    scheda: {
      titolo_presunto: "La stagione delle locuste",
      logline:
        "In un paese del Sud dove il silenzio è una lingua antica, un maresciallo di confine deve decidere se è ancora l'unico uomo che si rifiuta di aspettare che il male passi.",
      sintesi:
        "A Vallenera, paese assetato dell'entroterra meridionale, un emigrato di ritorno dalla Germania viene trovato morto contro un muro a secco. Voleva ricomprare le terre del consorzio controllate da una famiglia di potere e darle in cooperativa ai giovani rimasti: una cosa giusta, e a Vallenera le cose giuste hanno vita corta. Il maresciallo Lo Iacono, uomo di confine che non sa a quale mondo appartenga, capisce che non troverà testimoni: il silenzio del paese non è semplice omertà ma una grammatica antica. Sopra i campi della famiglia di potere arriva intanto una nuvola di locuste, non vista da vent'anni. Il vero nodo non è scoprire l'assassino — lo sanno già tutti — ma decidere se Lo Iacono abbia ancora voglia di essere l'unico a non aspettare che passi.",
      genere: "Noir / narrativa civile del Sud",
      temi: [
        "mafia e potere locale",
        "omertà e silenzio",
        "terra e radici",
        "giustizia individuale",
        "appartenenza e confine",
      ],
      qualita_prosa: {
        voto_su_10: 8,
        note: "Voce piena e personale, con un controllo notevole del ritmo e dell'immagine (le locuste come correlativo del potere; il silenzio come lingua). Asciutta, civile, capace di costruire atmosfera senza compiacimento. Crime d'autore di sostanza.",
      },
      target_lettore:
        "Lettore di noir mediterraneo e di narrativa civile italiana; pubblico di Sciascia e dei suoi eredi contemporanei, ma anche lettore di genere alto grazie al gancio thriller.",
      comparable_titles: [
        {
          titolo: "Il giorno della civetta",
          autore: "Leonardo Sciascia",
          perche:
            "Riferimento naturale per il noir civile sul potere e il silenzio nel Sud, di cui è erede dichiarato.",
        },
        {
          titolo: "La forma dell'acqua",
          autore: "Andrea Camilleri",
          perche:
            "Affinità nel poliziesco mediterraneo con forte identità di luogo, ma qui con un registro più cupo e d'autore.",
        },
        {
          titolo: "Una storia semplice",
          autore: "Leonardo Sciascia",
          perche:
            "Comparabile per l'idea che la verità sia nota a tutti e il vero tema sia la scelta morale dell'investigatore.",
        },
      ],
      punti_di_forza: [
        "Voce d'autore matura e civile",
        "Immagine guida (le locuste) potente e non didascalica",
        "Gancio thriller che apre a un pubblico ampio",
        "Senso del luogo e della comunità fortissimo",
      ],
      criticita: [
        "Filone affollato: serve distinguersi dagli epigoni di Sciascia",
        "Rischio di maniera se il civile prende il sopravvento sulla trama",
        "Tenuta dell'intreccio giallo da verificare sul completo",
      ],
      fit_collane: [
        {
          collana: "Einaudi Stile Libero",
          score: 0.88,
          motivazione:
            "Crime d'autore con voce forte e tema civile: è il cuore esatto della collana. Candidato di punta.",
        },
        {
          collana: "Mondadori Strade Blu",
          score: 0.66,
          motivazione:
            "Qualità di scrittura e ambizione lo rendono compatibile con il profilo upmarket; un filo più di genere che di pura letteratura d'autore.",
        },
        {
          collana: "Sperling & Kupfer",
          score: 0.52,
          motivazione:
            "Il gancio thriller e l'ambientazione forte hanno potenziale commerciale, ma il registro cupo e civile è meno immediato del mainstream tipico della lista.",
        },
      ],
      raccomandazione: "prioritario",
      razionale_raccomandazione:
        "Noir d'autore di valore, con un differenziale chiaro: lo stesso testo viene letto in modo diverso dalle tre collane (molto alto per Einaudi Stile Libero, alto-medio per Strade Blu, decente per Sperling grazie al gancio thriller). È il caso che mostra in modo plastico il fit-per-collana. Priorità alta: richiedere il completo e valutare l'allocazione alla collana d'autore.",
      nota_metodologica:
        "Valutazione su estratto del primo capitolo. Supporto alla decisione, non sostituzione del giudizio editoriale.",
    },
  },
};

export function getDemoScheda(id: string): AnalysisResult | undefined {
  return demoSchede[id];
}
