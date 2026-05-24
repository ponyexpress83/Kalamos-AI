# Kalamos AI × Mondadori — 90-Day Proof of Concept

> Versione working. La versione finale "client-ready" diventerà `poc-onepager.pdf` (vedi `scripts/build-poc-pdf.py`).
>
> **Stato**: bozza strategica. Da rifinire dopo selezione della divisione target.

---

## Razionale

PLAI mette a disposizione fino a **€100K** specificamente per PoC e progetti pilota in contesti reali del Gruppo Mondadori. La maggior parte delle candidature parla di prodotto in astratto. Noi proponiamo una **proposta operativa pronta da firmare**: questo trasforma la candidatura in conversazione concreta.

Obiettivo del PoC: dimostrare in 90 giorni che Kalamos AI può comprimere il workflow di valutazione manoscritti di una divisione Mondadori del 70-90%, mantenendo qualità editoriale paragonabile a quella del lettore senior interno.

---

## Sintesi esecutiva (per one-pager finale)

**Cosa**: deployment operativo di Kalamos AI su una divisione del Gruppo Mondadori per la valutazione assistita di 200 manoscritti reali.

**Durata**: 90 giorni dal kickoff (suddivisi in 3 fasi da 30 giorni).

**Budget**: €100K total budget, suddiviso tra setup tecnico, integrazione, costi operativi, e team Kalamos.

**Output**: 200 schede di lettura strutturate prodotte in parallelo (AI + lettore umano), dataset di valutazioni comparate, report di accuracy/saving, raccomandazione finale go/no-go per deployment esteso.

**Rischio per Mondadori**: minimo. Nessun manoscritto viene rifiutato sulla base esclusiva del giudizio AI. Il lettore umano resta nel loop in ogni step.

---

## Fase 1 — Calibrazione (giorni 1-30)

### Obiettivi
- Selezionare la divisione target operativa
- Allineare il modello Kalamos all'identità editoriale della divisione
- Stabilire baseline misurabile sul processo attuale
- Definire data pipeline e protocolli GDPR/IP

### Attività
1. **Workshop kickoff** (2 giorni in presenza a Milano): incontri con il direttore editoriale della divisione, il responsabile lettori, il team innovation Mondadori.
2. **Editorial identity profiling**: 5-10 sessioni di lavoro con editor senior della divisione per codificare in prompt strutturati l'identità editoriale (cosa rende un manoscritto "giusto" per loro? Quali sono i deal breaker?).
3. **Calibrazione modello**: training/prompt-tuning di Kalamos contro un dataset di 30 manoscritti già valutati nel passato (sì + no + maybe), per allineare il giudizio AI a quello effettivo della divisione.
4. **Baseline misurazione**: rilevazione dei tempi e costi attuali di produzione scheda. Quanti manoscritti valutate al mese? Quanti vengono rifiutati senza scheda? Costo medio per scheda?
5. **Compliance setup**: contratto data processing GDPR-compliant, gestione IP manoscritti, anonimizzazione metadata autori dove richiesto.

### Output Fase 1
- ✅ Documento "Editorial Identity Profile" della divisione (10-15 pagine)
- ✅ Modello Kalamos calibrato su pre-test set di 30 manoscritti, con accuracy iniziale misurata
- ✅ Baseline measurement report
- ✅ Setup tecnico completo (deploy, accessi, monitoraggio)

---

## Fase 2 — Esecuzione parallela (giorni 31-75)

### Obiettivi
- Processare 200 manoscritti reali in parallelo (AI Kalamos + lettore umano)
- Raccogliere dati strutturati di comparazione
- Identificare punti di forza e gap del modello

### Protocollo operativo
1. **Sourcing dei 200 manoscritti**: la divisione fornisce il flusso reale di nuovi manoscritti in arrivo nel periodo (oppure backlog da smaltire, da concordare).
2. **Doppia pipeline**: ciascun manoscritto è valutato in parallelo da:
   - **Kalamos AI** (output: scheda strutturata in formato compatibile con il template Mondadori esistente)
   - **Lettore umano** (lettore interno o freelance, con processo standard attuale)
3. **Blind comparison**: il responsabile della divisione riceve entrambe le valutazioni e segnala (a) quale userebbe in priorità (b) quali punti di forza/debolezza ha ciascuna.
4. **Sample review settimanale**: ogni venerdì, call di 1 ora con il team Mondadori per rivedere 5-10 casi divergenti e capire come migliorare il modello.

### Output Fase 2
- ✅ 200 schede AI prodotte (target: 100% completion rate)
- ✅ 200 schede umane prodotte (controllo)
- ✅ Comparison matrix completa
- ✅ 12 review session settimanali documentate
- ✅ Modello iterativamente migliorato (atteso: +15-30% accuracy fine fase 2 vs fine fase 1)

---

## Fase 3 — Validazione e proiezione (giorni 76-90)

### Obiettivi
- Misurare risultati su KPI definiti
- Produrre report finale per Mondadori
- Proporre roadmap di deployment scalato

### Attività
1. **Final measurement**: calcolo KPI definitivi su tutto il dataset di 200 manoscritti.
2. **Editorial validation panel**: review collegiale con 3 editor senior Mondadori (idealmente cross-divisione per assicurare prospettiva ampia) su un campione di 50 schede comparate.
3. **Business case scaled deployment**: proiezione di impatto se Kalamos venisse esteso a (a) tutta la divisione, (b) tutto Mondadori Libri Trade. Costi, risparmi, ROI a 12-24 mesi.
4. **Final report e raccomandazione**.

### Output Fase 3
- ✅ Final PoC Report (40-60 pagine): metodologia, risultati, KPI, business case
- ✅ Demo live per board Mondadori (45 min + Q&A)
- ✅ Proposta commerciale per deployment esteso (pricing, SLA, timeline)
- ✅ Raccomandazione go/no-go documentata

---

## KPI di successo (questi vanno in `kpis-success-criteria.md` con maggior dettaglio)

| KPI | Baseline | Target PoC | Metodo di misura |
|-----|----------|------------|------------------|
| Tempo medio per scheda | [DA RILEVARE — atteso 5-15 giorni] | <30 minuti per AI | Cronometraggio |
| Costo per scheda | [DA RILEVARE — atteso €150-500] | <€15 all-in | Costing analitico |
| Accuracy vs lettore senior (concordanza decisione finale) | N/A | ≥75% | Comparison matrix blind review |
| Fit-score correlation con accettazioni storiche | N/A | r ≥ 0.6 | Correlation analysis |
| Editor satisfaction (NPS) | N/A | ≥40 (promoter prevalente) | Survey post-PoC |
| % schede AI usabili senza riedit umano sostanziale | N/A | ≥50% | Tagging in review |
| Time-to-decision medio per manoscritto | [DA RILEVARE — atteso 3-9 mesi] | -40% nel batch PoC | Tracking date |

---

## Risk register

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Volume manoscritti insufficiente nei 90 giorni | Media | Alto | Includere backlog storico per raggiungere 200 |
| Resistenza interna lettori umani | Alta | Medio | Framing chiaro "potenziamento non sostituzione" + invitare lettori a partecipare al training |
| Modello sotto-performante su generi di nicchia | Media | Medio | Calibrazione specifica per genere principale della divisione |
| GDPR / IP issue su manoscritti | Bassa-media | Alto | Contratto data processing pre-PoC + accordo riservatezza |
| Mondadori cambia priorità interne | Bassa | Critico | Sponsor executive identificato e committed dal day 1 |

---

## Cosa offriamo gratuitamente in più del PoC

Per allineare gli incentivi e mostrare commitment:

1. **Anonimizzazione di tutto il dataset** prima di qualsiasi training futuro
2. **Mondadori mantiene la proprietà** di tutti gli output, dei dati di interaction, dei prompt customizzati
3. **Clausola di first-look** su deployment esteso (Mondadori ha il diritto di prelazione su un'estensione del contratto per N mesi dopo il PoC)
4. **Knowledge transfer**: il team Kalamos forma 2-3 referenti Mondadori sull'uso operativo, anche in caso di no-go

---

## Sezioni del documento finale (`poc-onepager.pdf`)

Quando questo documento sarà solido, generare il PDF one-pager con queste sezioni:

1. Header: logo Kalamos + logo Mondadori + "90-Day Proof of Concept Proposal"
2. Sintesi esecutiva (5 righe)
3. Le 3 fasi (visualizzate in timeline)
4. KPI table (visualizzata compatta)
5. Budget breakdown (vedi `budget-100k.md`)
6. Team coinvolto (Kalamos side + ruoli richiesti Mondadori side)
7. Cosa serve da Mondadori per partire (1 sponsor exec, accesso flusso manoscritti, 5-10 ore/settimana di editor senior)
8. Call to action: kickoff meeting entro 30 giorni dalla firma

Mantenerlo a 1-2 pagine A4 pulite, no clutter, tipografia editoriale (serif body, sans display). Pensare grafica Adelphi/Iperborea, non SaaS startup.

---

## Owner del documento

Questo è il documento più strategicamente importante del progetto. Da rivedere settimanalmente fino al lock per submission.
