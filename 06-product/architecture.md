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
