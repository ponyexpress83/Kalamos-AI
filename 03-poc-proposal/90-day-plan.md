# Kalamos AI × Mondadori — 90-Day Proof of Concept

> Versione working. La versione finale "client-ready" diventerà `poc-onepager.pdf` (vedi `scripts/build-poc-pdf.py`).
>
> **Stato**: design retrospettivo, divisione target fissata (Sperling & Kupfer, vedi `target-division.md`). Pronto per pressure-test e budgeting di dettaglio.

---

## Razionale

PLAI mette a disposizione fino a **€100K** specificamente per PoC e progetti pilota in contesti reali del Gruppo Mondadori. La maggior parte delle candidature parla di prodotto in astratto. Noi proponiamo una **proposta operativa pronta da firmare**: questo trasforma la candidatura in conversazione concreta.

Obiettivo del PoC: dimostrare in 90 giorni che Kalamos AI riconosce, all'interno del flusso di manoscritti di una divisione Mondadori, gli stessi testi che la divisione ha ritenuto meritevoli — più velocemente e a un costo per scheda incomparabilmente più basso, senza mai togliere la decisione all'editor.

### Perché retrospettivo, e non solo "parallelo"

La prima versione di questo PoC prevedeva la doppia lettura — Kalamos e un lettore umano valutano in parallelo 200 manoscritti nuovi. È un disegno debole per due ragioni: (1) chiede a Mondadori di spendere la risorsa più scarsa — il tempo di lettura — proprio quella che diciamo di voler liberare; (2) su 200 manoscritti i titoli effettivamente acquisiti sono 1-3, troppo pochi per dire qualcosa di statisticamente solido sul KPI che conta davvero ("Kalamos non si perde i testi di valore?").

La soluzione è ribaltare l'asse temporale. La divisione **ha già** un archivio di manoscritti valutati negli ultimi 18-24 mesi, con verdetto noto (rigettato / approfondito / acquisito) e, per i pubblicati, un esito commerciale. Quel verdetto è **ground truth gratuito**: non serve far rileggere nulla. Kalamos li valuta alla cieca e si misura contro le decisioni che la divisione ha realmente preso. Possiamo inoltre **stratificare il campione** per includere tutti i titoli acquisiti nella finestra, ottenendo il numero di casi positivi che il disegno parallelo non avrebbe mai raggiunto.

Il braccio "live" resta, ma ridimensionato al suo scopo reale — testare integrazione, velocità e accettazione da parte degli editor — non a fare da spina dorsale statistica.

---

## Sintesi esecutiva (per one-pager finale)

**Cosa**: deployment di Kalamos AI su Sperling & Kupfer, articolato in due bracci — validazione retrospettiva su ~300 manoscritti già valutati dall'archivio, e pilot live su 30-50 manoscritti in arrivo nel workflow reale.

**Durata**: 90 giorni dal kickoff (3 fasi da 30 giorni).

**Budget**: €100K, suddiviso tra setup tecnico, integrazione, costi operativi e team Kalamos (dettaglio in `budget-100k.md`).

**Output**: dataset di valutazioni Kalamos confrontate con le decisioni editoriali storiche; matrice di concordanza e recall sui titoli acquisiti; report di tempo/costo dal braccio live; raccomandazione finale go/no-go per deployment esteso.

**Rischio per Mondadori**: minimo. Il braccio retrospettivo lavora su decisioni già prese — nessun manoscritto viene rifiutato sulla base del giudizio AI. Nel braccio live il lettore umano resta nel loop su ogni caso.

---

## Architettura del PoC — due bracci

| | **Braccio retrospettivo** (validazione) | **Braccio live** (operatività) |
|---|------------------------------------------|--------------------------------|
| **Cosa** | ~300 manoscritti già valutati dall'archivio | 30-50 manoscritti in arrivo nel periodo |
| **Ground truth** | Decisione editoriale storica + esito commerciale | Lettura umana leggera contestuale |
| **Domanda a cui risponde** | "Kalamos riconosce ciò che la divisione ha ritenuto valido?" | "Si integra nel workflow? È veloce? Gli editor lo accettano?" |
| **Costo per Mondadori** | Solo accesso all'archivio (anonimizzabile) | ~3 ore/settimana di un editor |
| **Ruolo** | Spina dorsale statistica e di credibilità | Prova operativa e di esperienza utente |

---

## Fase 1 — Calibrazione (giorni 1-30)

### Obiettivi
- Allineare il modello Kalamos all'identità editoriale di Sperling & Kupfer
- Ottenere accesso all'archivio storico e costruire il dataset retrospettivo
- Stabilire la baseline misurabile sul processo attuale
- Definire data pipeline e protocolli GDPR/IP

### Attività
1. **Workshop kickoff** (2 giorni in presenza a Milano): direttore editoriale Sperling, responsabile lettori, team innovation Mondadori.
2. **Editorial identity profiling**: 4-6 sessioni con editor senior per codificare l'identità editoriale della divisione (cosa rende un manoscritto "giusto"? Quali sono i deal breaker per genere?).
3. **Costruzione del dataset retrospettivo**: estrazione dall'archivio di ~300 manoscritti valutati negli ultimi 18-24 mesi, **stratificati** per includere tutti i titoli acquisiti nella finestra più un campione rappresentativo di approfonditi e rigettati. Anonimizzazione dei metadata che potrebbero rivelare l'esito (es. presenza in catalogo).
4. **Calibrazione modello**: prompt-tuning di Kalamos su un sotto-insieme di calibrazione (~40 manoscritti, disgiunto dal test set), per allineare il giudizio AI ai criteri reali della divisione. Il test set resta cieco fino alla Fase 2.
5. **Baseline misurazione**: rilevazione dei tempi e costi reali di produzione scheda della divisione. Quante schede/anno? Costo medio reale per scheda? Quanti manoscritti vengono chiusi senza scheda? — Questi numeri sostituiscono ogni stima a priori.
6. **Compliance setup**: contratto data processing GDPR-compliant, gestione IP, hosting EU del layer di inferenza.

### Output Fase 1
- ✅ "Editorial Identity Profile" di Sperling & Kupfer (10-15 pagine)
- ✅ Dataset retrospettivo costruito e congelato (test set cieco + set di calibrazione)
- ✅ Modello calibrato, con baseline di accuracy sul set di calibrazione
- ✅ Baseline measurement report con i costi/tempi **reali** della divisione
- ✅ Setup tecnico e compliance completi

---

## Fase 2 — Validazione retrospettiva + pilot live (giorni 31-75)

### Obiettivi
- Validare Kalamos contro le decisioni editoriali storiche su ~300 manoscritti
- Testare integrazione, velocità e accettazione nel workflow reale sul pilot live
- Identificare punti di forza e gap del modello

### Braccio retrospettivo
1. **Inferenza cieca**: Kalamos valuta i ~300 manoscritti del test set producendo, per ciascuno, scheda strutturata + triage a 3 livelli (rigetta / approfondisci / acquisizione forte) + fit-score per la collana.
2. **Confronto con ground truth**: ogni output è confrontato con la decisione editoriale storica e, dove disponibile, con l'esito commerciale del pubblicato.
3. **Matrice di concordanza e recall**: si costruisce la confusion matrix triage AI vs decisione reale, e si misura il recall sui titoli acquisiti (vedi `kpis-success-criteria.md`).

### Braccio live
1. **Sourcing**: 30-50 manoscritti dal flusso in arrivo nel periodo.
2. **Pipeline operativa**: Kalamos produce la scheda in formato compatibile con il template Sperling; l'editor la usa nel proprio processo e fornisce una revisione leggera (usabile / da rieditare / da scartare).
3. **Misurazione operativa**: tempo per scheda, costo all-in, % schede usabili senza riedit sostanziale.

### Cadenza condivisa
- **Review settimanale** (1 ora, venerdì): si esaminano 5-10 casi divergenti del retrospettivo + i nuovi casi live, per capire dove e perché il modello sbaglia.

### Output Fase 2
- ✅ ~300 schede AI prodotte e confrontate con il ground truth storico
- ✅ Confusion matrix + recall sui titoli acquisiti
- ✅ 30-50 schede live con metriche di tempo/costo/usabilità reali
- ✅ Catalogo dei casi divergenti, annotato dagli editor

---

## Fase 3 — Validazione e proiezione (giorni 76-90)

### Obiettivi
- Consolidare i KPI su entrambi i bracci
- Produrre il report finale per Mondadori
- Proporre la roadmap di deployment scalato

### Attività
1. **Final measurement**: calcolo dei KPI definitivi (concordanza, recall, tempo, costo).
2. **Editorial validation panel**: review collegiale con 2-3 editor senior su un campione di ~40 schede — sia casi concordi sia divergenti — per giudicare la qualità editoriale oltre i numeri.
3. **Business case scaled deployment**: proiezione di impatto su (a) tutta Sperling & Kupfer, (b) Mondadori Libri Trade. Costi, risparmi, ROI a 12-24 mesi, ancorati alla baseline reale rilevata in Fase 1.
4. **Final report e raccomandazione go/no-go**.

### Output Fase 3
- ✅ Final PoC Report (30-40 pagine): metodologia, risultati, KPI, business case
- ✅ Demo live per la direzione (45 min + Q&A)
- ✅ Proposta commerciale per deployment esteso (pricing, SLA, timeline)
- ✅ Raccomandazione documentata

---

## KPI di successo (dettaglio in `kpis-success-criteria.md`)

| KPI | Misurato su | Baseline | Target PoC | Metodo |
|-----|-------------|----------|------------|--------|
| Recall sui titoli acquisiti (quartile alto di score) | Retrospettivo | base rate slush | ≥80% | Ranking vs decisione storica |
| Concordanza triage 3 livelli (Cohen's κ) | Retrospettivo | κ casuale ≈ 0 | κ ≥ 0.45 | Confusion matrix |
| False negative sui titoli acquisiti | Retrospettivo | n/a | <15% | Audit ranking |
| Tempo medio per scheda | Live | [DA RILEVARE in Fase 1] | <30 min | Telemetria |
| Costo per scheda all-in | Live | [DA RILEVARE in Fase 1] | confronto su dato reale | Costing analitico |
| % schede usabili senza riedit sostanziale | Live | n/a | ≥50% | Tagging in review |
| Editor satisfaction (NPS) | Live | n/a | ≥40 | Survey post-PoC |

> Nota: le baseline di tempo e costo sono **rilevate** in Fase 1 sui dati reali della divisione, non assunte a priori. È deliberato: un numero inventato è la prima cosa che un panel interno smonta.

---

## Risk register

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Archivio storico incompleto o non strutturato | Media | Alto | Verificare disponibilità e formato in Fase 1; ridurre N a 200 se necessario mantenendo tutti i titoli acquisiti |
| Pochi titoli acquisiti nella finestra → recall poco potente | Media | Alto | Allargare la finestra a 24-36 mesi per accumulare casi positivi sufficienti |
| Leakage dell'esito nei metadata (Kalamos "indovina" perché vede il catalogo) | Media | Alto | Anonimizzazione rigorosa; test set cieco disgiunto dal set di calibrazione |
| Resistenza interna dei lettori umani | Alta | Medio | Framing "potenziamento non sostituzione"; coinvolgere i lettori nel profiling di Fase 1 |
| Modello sotto-performante su generi di nicchia | Media | Medio | Calibrazione per genere principale della divisione |
| GDPR / IP su manoscritti | Bassa-media | Alto | Contratto data processing pre-PoC, hosting EU, accordo di riservatezza |
| Mondadori cambia priorità interne | Bassa | Critico | Sponsor executive identificato e committed dal day 1 |

---

## Cosa serve da Mondadori per partire

1. **Uno sponsor executive** della divisione, committed dal day 1.
2. **Accesso all'archivio storico** (anonimizzabile) dei manoscritti valutati negli ultimi 18-24 mesi, con i relativi verdetti.
3. **~3 ore/settimana di un editor senior** per calibrazione e review delle divergenze — non per rileggere 200 manoscritti.
4. **Un flusso live limitato** (30-50 manoscritti in arrivo) per il braccio operativo.

Il carico richiesto al team editoriale è una frazione di quello del disegno parallelo: è questo che rende il PoC firmabile.

---

## Cosa offriamo gratuitamente in più del PoC

1. **Anonimizzazione di tutto il dataset** prima di qualsiasi training futuro.
2. **Mondadori mantiene la proprietà** di output, dati di interaction e prompt customizzati.
3. **Clausola di first-look** su deployment esteso (diritto di prelazione per N mesi dopo il PoC).
4. **Knowledge transfer**: formazione di 2-3 referenti Mondadori sull'uso operativo, anche in caso di no-go.

---

## Sezioni del documento finale (`poc-onepager.pdf`)

1. Header: logo Kalamos + logo Mondadori + "90-Day Proof of Concept Proposal"
2. Sintesi esecutiva (5 righe)
3. Architettura a due bracci (visualizzata)
4. Le 3 fasi (timeline)
5. KPI table (compatta)
6. Budget breakdown (vedi `budget-100k.md`)
7. Team coinvolto (lato Kalamos + ruoli richiesti lato Mondadori)
8. Cosa serve da Mondadori per partire
9. Call to action: kickoff entro 30 giorni dalla firma

Mantenerlo a 1-2 pagine A4 pulite, tipografia editoriale (serif body, sans display). Grafica Adelphi/Iperborea, non SaaS startup.

---

## Owner del documento

Questo è il documento più strategicamente importante del progetto. Da rivedere settimanalmente fino al lock per submission.
