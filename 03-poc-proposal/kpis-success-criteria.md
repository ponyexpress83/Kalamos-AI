# KPI e criteri di successo PoC

> Cosa significa concretamente "il PoC è andato bene"? Questo documento risponde con numeri.

---

## Filosofia di misurazione

Il PoC è valutato su **tre dimensioni** ortogonali:

1. **Efficienza operativa**: il sistema è più veloce ed economico del processo attuale?
2. **Qualità editoriale**: il sistema produce valutazioni che gli editor accettano e usano?
3. **Validità strategica**: il sistema scala? Il business case post-PoC regge?

Solo se tutte e tre le dimensioni passano la soglia, raccomandiamo deployment esteso.

### Da dove viene il "ground truth"

La validità editoriale **non** si misura contro l'opinione di un singolo lettore — due lettori bravi dissentono di continuo, quindi la concordanza con uno solo è un metro rumoroso. Si misura contro la **decisione editoriale realmente presa** dalla divisione sui manoscritti d'archivio (rigetto / approfondimento / acquisizione) e, per i pubblicati, contro l'**esito commerciale**. È un fatto, non un parere.

### Quale braccio misura cosa

- **Efficienza operativa (sezione A)** → misurata sul **braccio live**, dove Kalamos gira nel workflow reale. Non ha senso misurare tempo e costo sul retrospettivo.
- **Qualità editoriale (sezione B)** → misurata sul **braccio retrospettivo**, contro le decisioni storiche, dove c'è abbastanza N (campione stratificato per includere tutti i titoli acquisiti).
- **Validità strategica (sezione C)** → su entrambi, più il business case.

### Nota sulla potenza statistica

Il KPI che conta davvero — "Kalamos non si perde i testi di valore?" — riguarda eventi rari (i titoli acquisiti). Il disegno retrospettivo lo rende misurabile **oversamplando l'archivio** per includere tutti i titoli acquisiti nella finestra di 18-24 mesi, invece di sperare che ne emergano abbastanza tra 200 manoscritti nuovi (sarebbero 1-3). È la differenza tra un risultato e un aneddoto.

---

## KPI ufficiali (quelli che vanno nel contratto)

### A. Efficienza operativa — *misurata sul braccio live*

Le baseline sono **rilevate in Fase 1** sui dati reali della divisione. Nessuna cifra a priori: un numero inventato è la prima cosa che un panel interno smonta.

| KPI | Baseline | Target | Soglia minima | Metodo |
|-----|----------|--------|---------------|--------|
| A1. Tempo medio AI per scheda | n/a | <30 min | <60 min | Telemetria automatica |
| A2. Tempo medio totale (AI + revisione umana leggera) | [DA RILEVARE] | <2 ore | <4 ore | Tracking lettore |
| A3. Costo per scheda all-in | [DA RILEVARE] | −80% vs baseline | −50% vs baseline | Costing analitico |
| A4. Throughput settimanale (schede/settimana) | [DA RILEVARE] | >5× baseline | >3× baseline | Conteggio output |
| A5. Time-to-decision per manoscritto | [DA RILEVARE] | −40% vs baseline | −25% vs baseline | Tracking workflow |

### B. Qualità editoriale — *misurata sul braccio retrospettivo*

**B1 è la north-star del PoC**: di tutti i manoscritti che la divisione ha effettivamente acquisito nella finestra, quanti Kalamos avrebbe segnalato? È la promessa centrale ("non vi perdete i testi di valore"), ed è misurabile perché sappiamo quali furono acquisiti.

| KPI | Target | Soglia minima | Metodo |
|-----|--------|---------------|--------|
| B1. **Recall sui titoli acquisiti** (quota collocata nel quartile alto di fit-score) | ≥80% | ≥65% | Ranking Kalamos vs decisioni storiche, test set cieco |
| B2. Concordanza triage 3 livelli vs decisione editoriale storica (Cohen's κ) | κ ≥ 0.45 | κ ≥ 0.30 | Confusion matrix su ~300 casi |
| B3. False negative sui titoli acquisiti (acquisito classificato "rigetta") | <8% | <15% | Audit retrospettivo |
| B4. Comparable analysis: % comparabili pertinenti (giudicate da editor) | ≥70% | ≥55% | Sample review ~40 schede |
| B5. % schede usabili senza riedit sostanziale *(braccio live)* | ≥50% | ≥35% | Tagging in review settimanale |

### C. Validità strategica

| KPI | Target | Soglia minima | Metodo |
|-----|--------|---------------|--------|
| C1. Editor NPS (Net Promoter Score) post-PoC | ≥40 | ≥20 | Survey strutturata fine PoC |
| C2. Editor che dichiarano di voler usare Kalamos in produzione | ≥70% | ≥50% | Survey + interview |
| C3. Business case ROI a 12 mesi (estensione divisione) | >3× | >1.5× | Modello economico |
| C4. Manoscritti di valore scoperti via Kalamos che sarebbero stati altrimenti rifiutati | ≥3 | ≥1 | Audit post-hoc |
| C5. Compliance audit (GDPR, IP, security) | Pass | Pass con osservazioni | Audit esterno opzionale |

---

## Stop criteria

Se durante il PoC emergono questi segnali, fermiamo e rinegoziamo lo scope con Mondadori:

🚨 **Stop immediato**:
- B3 (false negative sui titoli acquisiti) > 25% sul primo batch retrospettivo → modello pericoloso, ricalibrazione obbligatoria
- C5 (compliance) → fail su GDPR o IP → fix legale prima di proseguire
- Editor unanimi su rifiuto del modello dopo fase 1 → riesame prompt e approccio

🟡 **Alert** (continuiamo ma con maggiore attenzione):
- B2 (concordanza, κ) < 0.30 a metà validazione → review intensiva delle divergenze
- A1 (tempo AI) > 60 minuti per scheda → ottimizzazione tecnica
- A4 (throughput) < 50 schede/settimana a fine fase 2 → ridiscussione capacity

---

## Metriche di processo (non KPI di outcome, ma da tracciare)

### Operative
- Numero di prompt iterazioni per modello
- Numero di calibrazione session con editor
- Numero di issue tecniche risolte / aperte
- Tempo di setup iniziale Mondadori-side (in ore)
- Numero di manoscritti respinti dal sistema per ragioni tecniche (file format, lunghezza, etc.)

### Qualitative
- Quote testuali da editor (raccolte settimanalmente, anonimizzate)
- Punti di forza del modello identificati dagli editor (top 5)
- Punti di debolezza del modello identificati dagli editor (top 5)
- Suggerimenti di feature richieste dagli editor (priorità di sviluppo post-PoC)

---

## Reporting cadence

| Cadenza | Format | Audience | Responsabile |
|---------|--------|----------|--------------|
| Daily | Dashboard live (Notion / Linear) | Team Kalamos + sponsor Mondadori | Valerio |
| Settimanale | 1-pagina + call 30 min venerdì | Team Kalamos + editor Mondadori coinvolti | Ilaria |
| Bi-settimanale | Slide deck (5-7 slide) | Sponsor exec Mondadori + PM PLAI | Valerio |
| Mensile | Report formale (15-20 pagine) | Board Mondadori se richiesto + PLAI | Team |
| Finale (gg 90) | Report completo + demo live | Tutti | Team |

---

## Cosa NON misuriamo (per chiarezza)

❌ **Quantità di "AI usage"** (chiamate API, token consumati) come metric di successo
❌ **Revenue diretto** durante il PoC (è un PoC, non un sale)
❌ **Vanity metrics** (follower, citazioni, exposure mediatica)
❌ **Comparison con tool generici** (Sudowrite, ChatGPT) — abbiamo già dimostrato la differenziazione, il PoC valida l'impatto su Mondadori

---

## Il "test del bar"

Se a fine PoC il direttore editoriale della divisione che ci ha ospitato dovesse parlare di Kalamos a un collega di un'altra divisione Mondadori al bar, vogliamo che dica una di queste tre cose:

1. **"Mi ha cambiato il modo di lavorare con i manoscritti."** (best case)
2. **"È utile per il triage del flusso in arrivo, libera ore dei lettori."** (good case)
3. **"Funziona meglio di quanto pensassi, ma serve ancora calibrazione fine sui generi che pubblichiamo."** (acceptable)

Se invece dice "Ci ho perso tempo" o "Era come ChatGPT ma più caro" → abbiamo fallito anche se i KPI tecnici sono passati.

Il "test del bar" è la **soglia umana** che chiude i KPI quantitativi.
