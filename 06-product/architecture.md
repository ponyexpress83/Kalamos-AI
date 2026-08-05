# Kalamos AI — Architettura tecnica

> Vista d'insieme dell'architettura. Non è documentazione tecnica completa — è quello che serve sapere per il pitch + Q&A tecnica.
> Dettaglio completo va in repo prodotto, non qui.

---

## Componenti principali

```
┌─────────────────────────────────────────────────────────────┐
│                    KALAMOS AI — Stack                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────────┐                  │
│  │   Frontend   │    │  Editor Portal   │                  │
│  │   (Next.js)  │    │  (per casa ed.)  │                  │
│  └──────┬───────┘    └────────┬─────────┘                  │
│         │                     │                            │
│         └──────────┬──────────┘                            │
│                    │                                       │
│         ┌──────────▼──────────┐                            │
│         │   API Gateway       │                            │
│         │   (auth + routing)  │                            │
│         └──────────┬──────────┘                            │
│                    │                                       │
│    ┌───────────────┼───────────────┐                       │
│    │               │               │                       │
│ ┌──▼──────┐  ┌────▼────────┐  ┌──▼──────────┐             │
│ │ Ingest  │  │  Analysis   │  │  Fit-score  │             │
│ │ pipeline│  │  pipeline   │  │  engine     │             │
│ └─────────┘  └─────────────┘  └─────────────┘             │
│      │              │                │                    │
│      └──────────────┼────────────────┘                    │
│                     │                                     │
│         ┌───────────▼────────────┐                        │
│         │   LLM orchestration    │                        │
│         │   (Claude / fallback)  │                        │
│         └───────────┬────────────┘                        │
│                     │                                     │
│         ┌───────────▼────────────┐                        │
│         │  Vector DB + Storage   │                        │
│         │  (collana embeddings)  │                        │
│         └────────────────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Stack scelto (e perché)

| Layer | Tech | Razionale |
|---|---|---|
| Frontend | Next.js + Tailwind | Sviluppo veloce, SEO ready, deploy semplice |
| Backend API | Node.js / Python | A seconda della pipeline (parsing → Python, API → Node) |
| LLM primario | Claude (Sonnet/Opus blend) | Qualità su task lunghi, contesto esteso, valore/qualità |
| LLM fallback | Modello secondario | Resilienza, evitare lock-in, negoziazione costi |
| Vector DB | Pinecone o Qdrant | Embeddings collana + retrieval per fit-scoring |
| Storage docs | S3-compatible | Manoscritti criptati at-rest |
| Auth | Auth0 / Clerk | Enterprise SSO ready |
| Hosting | AWS (via PLAI partnership AWS) | Coerenza con partner ecosistema |
| Monitoring | Sentry + Datadog | Standard enterprise |

---

## Pipeline di analisi (cuore tecnico)

1. **Ingest** — Upload manoscritto (PDF/DOCX/EPUB), parsing → testo strutturato + metadati.
2. **Preprocessing** — Chunking semantico, identificazione capitoli, estrazione struttura.
3. **Analisi parallela** — N moduli specializzati (struttura narrativa, voce, mercato, comparable).
4. **Fit-scoring** — Embedding del manoscritto vs vector profile della collana target.
5. **Aggregazione** — Scheda di lettura strutturata + verdetto operativo.
6. **Human review** — Editor riceve output, può marcare feedback (loop di calibrazione).

Tempo target end-to-end: **<30 minuti per manoscritto medio (80K parole)**.

---

## Controllo del costo per analisi

Il vincolo dominante sono i documenti lunghi: passare un romanzo intero al modello è costoso e lento. Tre leve, in ordine di impatto.

1. **Tetto sull'estratto rappresentativo** *(già in demo)*. In fase di scrematura il modello riceve incipit, campione centrale e finale entro un budget di 12.000 token, con i tagli su confini di paragrafo o di frase — troncare a metà scena rende inaffidabile qualunque giudizio su voce e struttura. La scheda dichiara sempre "valutato su estratto". Sul calcolo dei prompt reali questo tiene il costo per scheda intorno ai **€0,03-0,06** invece dei ~€0,35 del testo integrale: circa **7×**. Sintesi progressiva sui blocchi solo quando serve il quadro completo (editing strutturale), non per il triage.

2. **Routing fra modelli a due passaggi** *(progettato, non ancora in demo)*. Un modello economico per la prima scrematura, uno più capace solo sui testi che la superano. La maggioranza dei manoscritti si esclude con poco e non ha senso pagare il modello migliore per dire di no. Da attivare quando l'eval harness può misurare quanto recall costa la scrematura economica: senza quella misura è un risparmio cieco.

3. **Embedding del catalogo calcolati una volta sola** *(con il RAG, non ancora in demo)*. Il profilo vettoriale di una collana cambia quando cambia il catalogo, non a ogni manoscritto: il costo ricorrente resta solo quello del testo in arrivo.

---

## Contenimento delle allucinazioni

Tre livelli, nessuno dei quali chiede a un secondo modello di controllare il primo.

1. **Output vincolato allo schema** *(già in demo)*. La risposta è generata dentro uno schema fisso e validata con zod: una risposta fuori formato viene scartata e rigenerata invece di arrivare all'editor.

2. **Obbligo di citazione** *(già in demo)*. Il prompt impone di riportare un passaggio **letterale** del manoscritto a sostegno del giudizio. Un giudizio che l'editor non può verificare sul testo non vale nulla.

3. **Controlli deterministici a valle** *(già in demo)*. Codice, non modelli: il punteggio deve stare nell'intervallo previsto; la collana proposta deve esistere davvero nel catalogo di quell'editore, altrimenti viene scartata prima di arrivare all'editor; la citazione deve comparire nel testo caricato, altrimenti la scheda lo segnala. Sono controlli banali che intercettano la maggior parte degli errori a costo zero — ed è esattamente la classe di errore che in redazione distrugge la fiducia (una collana inventata basta a chiudere la conversazione).

---

## Addestramento e calibrazione del modello

Kalamos non addestra un modello linguistico da zero: costruisce un sistema di valutazione sopra un LLM di frontiera (Claude). "Addestrare Kalamos" significa cinque cose, in ordine di peso reale.

1. **Codifica della rubrica editoriale.** Le interviste con gli editor senior e le linee guida di lettura della divisione diventano prompt strutturati — cosa valutare, con quali pesi, quali deal breaker. È qui che vive la maggior parte dell'intelligenza, e deriva da competenza editoriale, non da prompt engineering generico.

2. **Calibrazione in-context (few-shot).** Un set di ~40 manoscritti con verdetto noto e schede gold-standard viene usato come esempi in contesto, così il modello rispecchia il giudizio della casa e non un giudizio generico. Resta disgiunto dal test set per non falsare la validazione.

3. **Retrieval per il fit-scoring (RAG).** Per ogni collana si costruisce un profilo vettoriale dal catalogo pubblicato e dalle linee editoriali; il manoscritto viene embeddato e confrontato. "Addestrare" qui significa curare il corpus, non fare gradient descent.

4. **Calibrazione dei punteggi sul ground truth.** Usando l'archivio retrospettivo (le decisioni reali della divisione), si tarano le soglie score→triage e i pesi dei sotto-punteggi per massimizzare il recall sui titoli acquisiti e la concordanza (κ). È ML leggero e supervisionato sulle feature che il modello emette — non un training dell'LLM.

5. **Eval harness e regression test.** L'archivio retrospettivo diventa un benchmark permanente: ogni modifica a prompt o modello viene ri-misurata su recall e κ prima di andare in produzione. È la disciplina che trasforma il "ritocco dei prompt" in ingegneria.

**Il loop di calibrazione continuo è il vero asset.** Il feedback degli editor sui casi divergenti rientra in (a) raffinamento della rubrica, (b) ri-taratura delle soglie, (c) ampliamento del banco di esempi e del set di eval. Mese dopo mese accumula un corpus di calibrazione specifico per quella casa editrice: è ciò che un competitor non può copiare e che un team interno dovrebbe ricostruire da zero. L'algoritmo è noto; l'asset di calibrazione no.

**Fine-tuning di un modello proprietario** (es. distillazione su un modello open come Llama/Mistral) è un'ottimizzazione futura, sensata solo quando i dati etichettati (manoscritto → scheda/verdetto) sono abbastanza, e più per costo o per sotto-task specifici (classificazione di genere, estrazione di struttura) che per la valutazione principale — dove oggi un LLM di frontiera + RAG curato rende di più. Non è un prerequisito del PoC, ed è onesto dirlo.

> Nota terminologica: il "loop RLHF leggero" citato altrove va inteso in questo senso — calibrazione di soglie e raffinamento della rubrica guidati dal feedback editor, non un addestramento RL con reward model in produzione.

---

## Differenziatori tecnici (vs tool generici)

1. **Fit-scoring per collana**: vector profile costruito su corpus pubblicato della collana, non solo prompt engineering.
2. **Loop di calibrazione**: feedback editor → tuning continuo dei pesi del fit-score (RLHF leggero).
3. **Output strutturato**: schema JSON validato, non testo libero. Integrabile in CMS editoriali esistenti.
4. **Privacy by design**: manoscritti mai usati per training del modello base, isolamento per tenant.

---

## Sicurezza & compliance

- **GDPR**: dato personale (autore) trattato con base giuridica contrattuale.
- **IP**: clausole esplicite — il manoscritto resta proprietà dell'autore/casa editrice. Kalamos non rivendica diritti.
- **Encryption**: at-rest e in-transit. Chiavi separate per tenant enterprise.
- **Audit log**: tracciamento accessi su manoscritto per compliance editoriale.
- **No-training clause**: API LLM con opt-out training (rilevante per Claude e altri provider).

---

## Cosa NON è ancora costruito (essere onesti)

- Loop RLHF in produzione (al momento: calibrazione manuale)
- Multi-tenant fully isolated (al momento: workspace per cliente, non isolamento infra)
- SSO enterprise (al momento: auth standard)
- Integrazione nativa con CMS editoriali (Adobe Experience Manager, Quark) — sul roadmap PoC

---

## Per Q&A tecnica panel
- "Perché Claude e non GPT?" → Qualità su task narrativi lunghi, finestra di contesto, costo/qualità migliore per il nostro use case. Architettura modulare permette di cambiare.
- "Costi API esplosivi?" → Margine 70%+ già al volume attuale, batch processing notturno per ridurre costi premium.
- "Cosa se domani Claude triplica i prezzi?" → Architettura LLM-agnostic, possibilità di fallback su modelli open-source self-hosted (Llama, Mistral) con qualità accettabile per fit-score di prima passata.
