# KPI e criteri di successo PoC

> Cosa significa concretamente "il PoC è andato bene"? Questo documento risponde con numeri.

---

## Filosofia di misurazione

Il PoC è valutato su **tre dimensioni** ortogonali:

1. **Efficienza operativa**: il sistema è più veloce ed economico del processo attuale?
2. **Qualità editoriale**: il sistema produce valutazioni che gli editor accettano e usano?
3. **Validità strategica**: il sistema scala? Il business case post-PoC regge?

Solo se tutte e tre le dimensioni passano la soglia, raccomandiamo deployment esteso.

---

## KPI ufficiali (quelli che vanno nel contratto)

### A. Efficienza operativa

| KPI | Baseline (da rilevare) | Target | Soglia minima | Metodo |
|-----|------------------------|--------|---------------|--------|
| A1. Tempo medio AI per scheda | n/a | <30 min | <60 min | Telemetria automatica |
| A2. Tempo medio totale (AI + revisione umana leggera) | 5-15 giorni | <2 ore | <4 ore | Tracking lettore |
| A3. Costo per scheda all-in | €150-500 | <€15 | <€30 | Costing analitico |
| A4. Throughput settimanale (schede/settimana) | 10-30 | >100 | >50 | Conteggio output |
| A5. Time-to-decision per manoscritto | 3-9 mesi | -40% rispetto baseline | -25% | Tracking workflow |

### B. Qualità editoriale

| KPI | Target | Soglia minima | Metodo |
|-----|--------|---------------|--------|
| B1. Concordanza decisione finale AI vs lettore senior (acquisire / rigettare / approfondire) | ≥75% | ≥65% | Blind comparison 200 casi |
| B2. % schede AI usabili senza riedit sostanziale | ≥50% | ≥35% | Tagging in review settimanale |
| B3. Fit-score correlation con accettazioni storiche | r ≥ 0.6 | r ≥ 0.45 | Pearson correlation sul dataset di calibrazione |
| B4. Comparable analysis: % comparabili pertinenti (giudicate da editor) | ≥70% | ≥55% | Sample review 50 schede |
| B5. False negative rate (manoscritti di valore classificati come "rigetto") | <8% | <15% | Validazione post-hoc su decisioni edit |

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
- B5 (false negative) > 25% sul primo batch di 50 manoscritti → modello pericoloso, ricalibrazione obbligatoria
- C5 (compliance) → fail su GDPR o IP → fix legale prima di proseguire
- Editor unanimi su rifiuto del modello dopo fase 1 → riesame prompt e approccio

🟡 **Alert** (continuiamo ma con maggiore attenzione):
- B1 (concordanza) < 60% a metà PoC → review intensiva delle divergenze
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
