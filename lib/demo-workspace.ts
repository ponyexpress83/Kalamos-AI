export type OpportunitySource =
  | "Scout"
  | "Agenzia"
  | "Foreign rights"
  | "Autore esistente"
  | "Interna"
  | "Unsolicited";

export interface DemoOpportunity {
  id: string;
  title: string;
  author: string;
  source: OpportunitySource;
  sourceOrg: string;
  language: string;
  imprint: string;
  stage: string;
  fit: "Alto" | "Medio" | "Basso";
  readiness: number;
  owner: string;
  deadline?: string;
  nextAction: string;
  rationale: string;
}

export const demoOpportunities: DemoOpportunity[] = [
  {
    id: "op-001",
    title: "Il giardino di vetro",
    author: "Marta Bellacqua",
    source: "Agenzia",
    sourceOrg: "Agenzia Letteraria Aurora",
    language: "Italiano",
    imprint: "Einaudi Stile Libero",
    stage: "Seconda lettura",
    fit: "Alto",
    readiness: 82,
    owner: "Giulia Bianchi",
    deadline: "3 settembre",
    nextAction: "Confermare seconda lettura e verificare i diritti audio",
    rationale:
      "Voce autoriale forte e struttura ibrida coerente con il profilo pubblico della collana. Restano da verificare i diritti audio e un secondo parere editoriale.",
  },
  {
    id: "op-002",
    title: "Sette giorni a Portofino",
    author: "Carla Monterosso",
    source: "Scout",
    sourceOrg: "Mediterranean Literary Scout",
    language: "Italiano",
    imprint: "Sperling & Kupfer",
    stage: "Acquisition case",
    fit: "Alto",
    readiness: 91,
    owner: "Marco Rinaldi",
    deadline: "5 settembre",
    nextAction: "Preparare acquisition meeting",
    rationale:
      "Posizionamento commerciale chiaro, comparabili leggibili e forte coerenza con la linea feel-good. Dossier quasi completo.",
  },
  {
    id: "op-003",
    title: "Les jours fragiles",
    author: "Claire Martin",
    source: "Foreign rights",
    sourceOrg: "Paris Rights Office",
    language: "Francese",
    imprint: "Einaudi Stile Libero",
    stage: "Rights check",
    fit: "Alto",
    readiness: 73,
    owner: "Elena Conti",
    deadline: "2 settembre",
    nextAction: "Confermare audiobook e finestra di offerta",
    rationale:
      "Segnale editoriale promettente; la priorità è chiudere le informazioni sui diritti prima che la finestra di offerta scada.",
  },
  {
    id: "op-004",
    title: "Le ombre del passato",
    author: "R. Vinci",
    source: "Unsolicited",
    sourceOrg: "Portale proposte",
    language: "Italiano",
    imprint: "Sperling & Kupfer",
    stage: "Prima lettura",
    fit: "Medio",
    readiness: 54,
    owner: "Luca Ferri",
    nextAction: "Valutare se merita una seconda lettura",
    rationale:
      "Buona tenuta di genere ma differenziazione ancora debole rispetto al catalogo. L'AI suggerisce prudenza, non un rifiuto automatico.",
  },
  {
    id: "op-005",
    title: "La stazione delle locuste",
    author: "Nuccio Carbè",
    source: "Interna",
    sourceOrg: "Segnalazione editoriale",
    language: "Italiano",
    imprint: "Einaudi Stile Libero",
    stage: "Strong interest",
    fit: "Alto",
    readiness: 88,
    owner: "Giulia Bianchi",
    nextAction: "Aprire acquisition case",
    rationale:
      "Noir letterario con voce distinta. Due lettori interni convergono sulla forza del testo; il prossimo passo è formalizzare il dossier.",
  },
];

export const demoAttention = [
  {
    title: "2 scadenze diritti questa settimana",
    detail: "Les jours fragiles · Il giardino di vetro",
    tone: "warning",
  },
  {
    title: "1 differenza contrattuale da verificare",
    detail: "Audiobook incluso nel draft ma escluso nelle note di negoziazione",
    tone: "danger",
  },
  {
    title: "3 decisioni aspettano una motivazione",
    detail: "La memoria editoriale cresce solo con feedback verificato",
    tone: "info",
  },
];

export interface DemoContractTerm {
  id: string;
  label: string;
  expected: string;
  contracted: string;
  status: "match" | "difference" | "material" | "missing";
  sourceExpected: string;
  sourceContract: string;
}

export const demoContract = {
  project: "Il giardino di vetro",
  counterparty: "Agenzia Letteraria Aurora",
  version: "Draft v2",
  note:
    "Caso dimostrativo. Nessun contratto reale o dato riservato di terzi è utilizzato in questa schermata.",
  terms: [
    {
      id: "audio",
      label: "Diritti audiobook",
      expected: "Esclusi",
      contracted: "Inclusi",
      status: "material",
      sourceExpected: "Nota acquisition · 18 ago",
      sourceContract: "Draft v2 · clausola 6.2",
    },
    {
      id: "option",
      label: "Periodo di opzione",
      expected: "12 mesi",
      contracted: "18 mesi",
      status: "difference",
      sourceExpected: "Verbale negoziazione · 20 ago",
      sourceContract: "Draft v2 · clausola 9.1",
    },
    {
      id: "delivery",
      label: "Consegna definitiva",
      expected: "15 ottobre",
      contracted: "30 settembre",
      status: "difference",
      sourceExpected: "Email agente · 21 ago",
      sourceContract: "Draft v2 · clausola 3.4",
    },
    {
      id: "territory",
      label: "Territorio",
      expected: "Italia",
      contracted: "Italia",
      status: "match",
      sourceExpected: "Acquisition case · 18 ago",
      sourceContract: "Draft v2 · clausola 5.1",
    },
  ] satisfies DemoContractTerm[],
};

export const demoProject = {
  title: "Il giardino di vetro",
  author: "Marta Bellacqua",
  imprint: "Einaudi Stile Libero",
  status: "Editing",
  nextDeadline: "3 settembre",
  health: "Attenzione",
  acquisitionReason:
    "La voce frammentaria e la struttura ibrida erano tra i principali motivi registrati per la seconda lettura.",
  versions: [
    { version: "V1", date: "6 agosto", words: 78210, state: "Acquisita" },
    { version: "V2", date: "18 agosto", words: 74680, state: "Revisionata" },
    { version: "V3", date: "27 agosto", words: 73110, state: "In revisione" },
  ],
  semanticDiff: [
    "Capitolo 2 ridotto e apertura spostata più vicino all'incidente iniziale.",
    "Eliminata una scena espositiva nel capitolo 5; il ritmo della parte centrale accelera.",
    "La motivazione della protagonista è più esplicita nei capitoli 6–7.",
    "Possibile drift editoriale: la V3 riduce parte della frammentazione della voce registrata come punto di forza in acquisizione.",
  ],
  requests: [
    { id: "r1", title: "Ridurre esposizione iniziale", status: "Risolta", priority: "Alta" },
    { id: "r2", title: "Chiarire motivazione protagonista", status: "Parziale", priority: "Alta" },
    { id: "r3", title: "Verificare continuità temporale cap. 4/9", status: "Aperta", priority: "Media" },
    { id: "r4", title: "Proteggere la voce frammentaria", status: "Aperta", priority: "Alta" },
  ],
};

export const demoMemory = [
  {
    date: "29 ago",
    imprint: "Einaudi Stile Libero",
    decision: "Seconda lettura",
    reason: "Voce più distintiva di quanto suggerito dal primo scoring.",
    source: "Il giardino di vetro",
  },
  {
    date: "28 ago",
    imprint: "Sperling & Kupfer",
    decision: "Strong interest",
    reason: "Posizionamento commerciale chiaro e comparabili coerenti.",
    source: "Sette giorni a Portofino",
  },
  {
    date: "27 ago",
    imprint: "Einaudi Stile Libero",
    decision: "Pass",
    reason: "Tema coerente, ma voce troppo convenzionale rispetto al catalogo recente.",
    source: "Il ponte d'inverno",
  },
  {
    date: "26 ago",
    imprint: "Sperling & Kupfer",
    decision: "Seconda lettura",
    reason: "Fit medio, ma forte potenziale di pubblico segnalato dall'editor.",
    source: "La casa sul promontorio",
  },
];

export function workspaceContextText(): string {
  const opportunities = demoOpportunities
    .map(
      (o) =>
        `${o.title} — ${o.author}; fonte ${o.source} (${o.sourceOrg}); imprint ${o.imprint}; fase ${o.stage}; fit ${o.fit}; readiness ${o.readiness}%; prossimo passo: ${o.nextAction}; razionale: ${o.rationale}`,
    )
    .join("\n");
  const contract = demoContract.terms
    .map((t) => `${t.label}: atteso ${t.expected}; draft ${t.contracted}; stato ${t.status}`)
    .join("\n");
  const requests = demoProject.requests
    .map((r) => `${r.title}: ${r.status}, priorità ${r.priority}`)
    .join("\n");

  return `CONTESTO WORKSPACE KALAMOS — DATI DIMOSTRATIVI\n\nOPPORTUNITÀ\n${opportunities}\n\nCONTRATTO — ${demoContract.project}\n${contract}\n\nPROGETTO EDITORIALE — ${demoProject.title}\nMotivo acquisizione: ${demoProject.acquisitionReason}\nRichieste:\n${requests}\nDifferenze V2→V3:\n${demoProject.semanticDiff.join("\n")}\n`;
}

export function demoSourcesForQuestion(question: string): string[] {
  const q = question.toLowerCase();
  if (q.includes("audiobook") || q.includes("contratt") || q.includes("diritt")) {
    return ["Nota acquisition · 18 ago", "Draft v2 · clausola 6.2"];
  }
  if (q.includes("version") || q.includes("v2") || q.includes("v3") || q.includes("autore")) {
    return ["Manoscritto V2", "Manoscritto V3", "Editorial requests"];
  }
  if (q.includes("perché") || q.includes("seconda lettura") || q.includes("acquis")) {
    return ["Scheda editoriale", "Decision memory · 29 ago", "Catalogue baseline"];
  }
  return ["Acquisition Desk", "Editorial Memory", "Workspace demo"];
}

export function answerDemoQuestion(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("audiobook")) {
    return "I diritti audiobook richiedono revisione: nelle note di acquisition risultano esclusi, mentre il Draft v2 li include. Kalamos lo segnala come potenziale differenza materiale; la decisione finale resta al team Legal/Rights.";
  }
  if (q.includes("prima") && q.includes("autore")) {
    return "Prima della call con l'autrice controllerei quattro punti: la richiesta sulla motivazione è solo parzialmente recepita; restano aperte continuità temporale e protezione della voce frammentaria; la V3 riduce proprio una caratteristica registrata come forza in acquisizione; la prossima deadline è il 3 settembre.";
  }
  if (q.includes("v2") || q.includes("v3") || q.includes("cambi")) {
    return "Tra V2 e V3 il capitolo 2 è stato ridotto, una scena espositiva del capitolo 5 è stata eliminata e la motivazione della protagonista è diventata più esplicita. Kalamos segnala anche un possibile drift: la frammentazione della voce è diminuita rispetto al principio editoriale registrato in acquisizione.";
  }
  if (q.includes("perché") || q.includes("seconda lettura")) {
    return "Il giardino di vetro è in seconda lettura perché l'editor ha considerato la voce più distintiva rispetto al primo scoring e il fit con Stile Libero resta alto. La decisione è umana e la motivazione è stata salvata nella memoria editoriale.";
  }
  if (q.includes("urg") || q.includes("attenzione")) {
    return "Le priorità di oggi sono due scadenze diritti, una differenza contrattuale sull'audiobook e tre decisioni editoriali ancora senza motivazione strutturata. Sono elementi operativi, non alert generici.";
  }
  return "Nel workspace demo Kalamos collega provenienza, analisi, decisioni editoriali, contratti e versioni. Posso spiegare perché un titolo è stato promosso, quali punti restano aperti, cosa è cambiato tra bozze e quali informazioni contrattuali richiedono verifica.";
}
