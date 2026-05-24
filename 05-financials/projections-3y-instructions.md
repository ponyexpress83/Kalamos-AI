# Projections 3 anni — istruzioni per il file .xlsx

> Questo file è un placeholder. Il file vero (`projections-3y.xlsx`) va costruito a parte.
> Qui sotto la struttura suggerita.

---

## Struttura consigliata del workbook

### Sheet 1: Assumptions
- ARPU per tier
- CAC per canale
- Costo API per manoscritto
- Headcount plan trimestrale
- Salari medi per ruolo
- Tasso churn ipotizzato
- Tasso espansione ipotizzato

### Sheet 2: Revenue model
- Clienti acquisiti per trimestre per tier
- Clienti persi (churn) per trimestre
- Cumulativo attivo per trimestre
- MRR / ARR per trimestre
- Revenue annuale

### Sheet 3: Cost model
- Costi personale (headcount × salario × 1.35 oneri)
- Costi infrastruttura (API + cloud + tooling)
- Costi sales & marketing
- Costi G&A (legal, contabilità, ufficio)
- Cost of revenue (variabile)

### Sheet 4: P&L
- Revenue, COGS, Gross profit, Gross margin
- OpEx breakdown
- EBITDA
- Cash burn / cash balance
- Mese break-even

### Sheet 5: Cap table & dilution
- Founder equity pre-PLAI
- PLAI initial: -7% (€100K)
- Eventuale seed Y2: -15% (€1M)
- Series A Y3: -20% (€3-5M)
- ESOP pool: 10%

### Sheet 6: KPI dashboard (riassunto)
- ARR EOQ
- Growth % YoY
- Burn mensile
- Runway in mesi
- LTV/CAC
- Magic number

---

## Da fare
- [ ] Costruire workbook completo (Excel o Google Sheets)
- [ ] Validare assumptions con 2-3 founder editoriali peer
- [ ] Far review a un advisor finanziario prima del submit
- [ ] Esportare in PDF la versione "executive" per allegato application

## Note
- I numeri nel pitch deck e nell'application devono **coincidere esattamente** con quelli del workbook.
- Tenere una versione "v1-stable" congelata: ogni modifica successiva su un branch separato.
- Se PLAI chiede modello in allegato: mandare il PDF della Sheet 4 + 6, non il workbook completo.
