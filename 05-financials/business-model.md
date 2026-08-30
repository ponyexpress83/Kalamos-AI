# Business Model — Kalamos AI

> Modello di business operativo, pricing tier, ipotesi unit economics.
> Da raffinare con feedback dei primi pilot.

---

## Modello

**SaaS B2B annuale** con tre componenti:

1. **Subscription fee annuale** (per editore, per workspace).
2. **Setup fee una tantum** (onboarding, calibrazione collane, training editor).
3. **Tier per volume** (numero di manoscritti/anno processabili).

Non è un modello per-seat: il valore percepito è la *capacità di processamento*, non il numero di utenti.

---

## Tier pricing (v1 — da validare)

| Tier | Manoscritti/anno | Workspace | Setup fee | Annual fee | Target |
|---|---|---|---|---|---|
| **Editorial Starter** | fino a 500 | 1 collana | €5.000 | €18.000 | Editori indipendenti medi |
| **Professional** | fino a 2.000 | fino a 3 collane | €10.000 | €42.000 | Editori medio-grandi |
| **Enterprise** | fino a 10.000 | illimitato | €25.000 | €90.000 | Major (Mondadori, GeMS, Feltrinelli, Rizzoli) |
| **Enterprise+** | >10.000 | custom | custom | €120K+ | Holding multi-marchio |

**Logica del pricing**:
- ARPU realistico per major: €100K+/anno (annual + setup ammortizzato).
- ARPU per medio: €35–50K/anno.
- Mantenere ratio LTV/CAC >5x con sales ciclo lungo (4–9 mesi) tipico enterprise editoriale.

---

## Unit Economics (ipotesi pre-pilot)

| Metrica | Valore | Note |
|---|---|---|
| ARPU annuale (mix tier) | €55K | Mix 60% Pro / 30% Enterprise / 10% Starter |
| CAC | €15K | Sales lungo, eventi di settore, referral |
| Margine lordo | 70% | Costi: API LLM, infra, support editor |
| Gross margin per cliente anno 1 | €38.5K | (ARPU × margin) − costi diretti |
| Payback period | ~4-5 mesi | Su gross margin |
| Net Revenue Retention target | 110% | Espansione su collane aggiuntive + upsell tier |
| Churn target | <8%/anno | Enterprise, sticky once integrated |

---

## Costo variabile per manoscritto processato (target)

| Voce | Costo | Base |
|---|---|---|
| Token API (Claude Sonnet, triage su estratto rappresentativo) | **$0,03–0,06** | Calcolato sui prompt reali della demo, listino pubblico agosto 2026 |
| Vector storage + retrieval | €0,10 | Stima: l'indice di collana si calcola una volta, non per manoscritto |
| Compute orchestration | €0,10 | Stima |
| Buffer & contingency | €0,25 | Copre i casi che richiedono il testo integrale |
| **Costo marginale per manoscritto (triage)** | **€0,50–1** | |
| Analisi sul testo integrale (editing strutturale, non triage) | €0,40–0,80 di soli token | ~135K token per un romanzo da 90K parole |

Vs costo manuale: €150–500 [DA VERIFICARE sui dati reali dell'editore]. Il margine di compressione è di **due ordini di grandezza**, e la leva non è il prezzo del modello: è il tetto sull'estratto rappresentativo, che da solo vale ~7× sul costo per scheda.

> **Nota sulla revisione.** La versione precedente stimava €4–8 di token per manoscritto e €6–10 di costo marginale: un ordine di grandezza sopra il reale, calcolato prima che esistesse la demo. Il costo effettivo è ora misurabile — l'app cattura i token restituiti dall'API e mostra il costo per scheda in redazione. Con la vecchia stima il gross margin per cliente era sottostimato di conseguenza: da rifare quando i volumi del primo pilota daranno numeri veri invece che calcolati.

---

## Revenue projection (3 anni — scenario base)

| | Anno 1 | Anno 2 | Anno 3 |
|---|---|---|---|
| Clienti totali | 4 | 14 | 35 |
| Mix (S/P/E) | 1/2/1 | 2/8/4 | 5/22/8 |
| ARR | €170K | €640K | €1.8M |
| Headcount | 5 | 11 | 22 |
| Burn mensile | €40K | €75K | €130K |
| Runway target | 18 mesi | 18 mesi | 18 mesi |

*Scenario conservativo. Da rifare con numeri reali post-pilot.*

---

## Note di lavoro
- I numeri sopra sono **per il pitch**, non per la contabilità. Costruire spreadsheet dettagliato in `05-financials/projections-3y.xlsx`.
- Pricing va validato con i primi 2-3 contratti reali: aspettarsi sconti del 20-30% sul listino in fase di land.
- Modello expansion: una volta dentro un editore, aggiungere collane è quasi cost-free per Kalamos ma alto valore per il cliente. Sfruttare.
