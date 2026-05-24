# PoC Budget — €100K breakdown

> Budget di riferimento per il PoC 90 giorni. Numeri ragionevoli, da rifinire con Valerio sulla base dei costi reali del team Kalamos.

---

## Sintesi

| Categoria | Budget | % del totale |
|-----------|--------|--------------|
| 1. Team Kalamos (effort 90 giorni) | €52.000 | 52% |
| 2. Infrastruttura tech & API LLM | €13.000 | 13% |
| 3. Editorial expert consulenti | €12.000 | 12% |
| 4. Integration & customizzazione Mondadori | €10.000 | 10% |
| 5. Compliance, legal, GDPR | €5.000 | 5% |
| 6. Travel & on-site Milano | €4.000 | 4% |
| 7. Contingency (4%) | €4.000 | 4% |
| **TOTALE** | **€100.000** | **100%** |

---

## Dettaglio per voce

### 1. Team Kalamos (€52.000)

| Ruolo | Effort | Tariffa | Totale |
|-------|--------|---------|--------|
| Valerio Gestri (Tech Lead / PM) | 60% × 3 mesi | €4.500/mese full | €8.100 |
| Ilaria Cesarini (Editorial Lead) | 30% × 3 mesi | €3.500/mese full | €3.150 |
| Senior ML Engineer (freelance) | 50% × 3 mesi | €6.000/mese full | €9.000 |
| Backend Developer (freelance) | 40% × 3 mesi | €5.500/mese full | €6.600 |
| Frontend Developer (freelance) | 30% × 2 mesi | €5.000/mese full | €3.000 |
| Product Designer (freelance) | 20% × 2 mesi | €4.500/mese full | €1.800 |
| Quality / QA editoriale | 25% × 3 mesi | €3.000/mese full | €2.250 |
| **Buffer team / overrun** | | | €18.100 |
| **Subtotale Team** | | | **€52.000** |

⚠️ Le tariffe sono indicative. Da validare con composizione team reale. Il buffer è alto deliberatamente perché un PoC reale ha sempre overrun.

### 2. Infrastruttura tech & API LLM (€13.000)

| Voce | Stima | Note |
|------|-------|------|
| API Claude (Anthropic) | €4.500 | 200 manoscritti × analisi multi-step × prompt complessi |
| API OpenAI (back-up / embedding) | €1.500 | Embedding per retrieval, fallback |
| Hosting cloud (AWS / Vercel) | €1.800 | Setup + 90 giorni production |
| Database & storage | €1.200 | Postgres managed + S3 manoscritti |
| Monitoring & logging | €600 | Sentry, Logflare equivalenti |
| Vector database | €900 | Per fit-scoring per collana |
| Tooling sviluppo | €500 | Linear, Figma, GitHub Copilot, etc. |
| Buffer infrastrutturale | €2.000 | Picchi di uso, debugging |
| **Subtotale Infrastruttura** | **€13.000** | |

📝 **AWS credits via PLAI**: AWS è partner ufficiale PLAI. Possibile credits significativi che riducono questa voce. Da chiarire post-selezione.

### 3. Editorial expert consulenti (€12.000)

| Voce | Stima | Note |
|------|-------|------|
| Advisor editoriale senior (es. ex-Mondadori) | €6.000 | 30 ore × €200 + retainer mensile €1.000 × 3 |
| Editor consultivi (2 freelance, validazione modello) | €3.600 | 30 ore × €60 × 2 persone |
| Lettori esterni (calibrazione + control group) | €2.400 | 30 ore × €80 |
| **Subtotale Expert** | **€12.000** | |

⚠️ Questo è il segmento di costo dove **non si risparmia mai**. La qualità della calibrazione editoriale dipende dalla qualità degli expert ingaggiati.

### 4. Integration & customizzazione Mondadori (€10.000)

| Voce | Stima | Note |
|------|-------|------|
| API integration con sistemi interni Mondadori | €4.000 | Effort tech custom |
| Customizzazione template schede di lettura | €2.500 | Per allinearle al formato esistente |
| Adapter per workflow di submission interni | €2.000 | Se Mondadori ha CMS proprio |
| Documentation tecnica per IT Mondadori | €1.500 | Necessaria per onboarding |
| **Subtotale Integration** | **€10.000** | |

### 5. Compliance, legal, GDPR (€5.000)

| Voce | Stima | Note |
|------|-------|------|
| Contratto data processing GDPR-compliant | €1.800 | Legale specializzato |
| IP & manuscript handling policy | €1.500 | Critico per fiducia editoriale |
| NDA reciproci + accordi advisor | €700 | Vari minori |
| Privacy assessment | €1.000 | Per dataset manoscritti |
| **Subtotale Compliance** | **€5.000** | |

### 6. Travel & on-site Milano (€4.000)

| Voce | Stima | Note |
|------|-------|------|
| Trip Valerio (Grosseto → Milano) × 8 | €1.600 | Treno + alloggio |
| Trip Ilaria × 4 | €800 | Idem |
| Kickoff workshop 2 giorni (logistica) | €600 | Sala, catering |
| Final demo session | €400 | Logistica presentazione |
| Trip advisor / consultant | €600 | Per sessioni chiave |
| **Subtotale Travel** | **€4.000** | |

### 7. Contingency (€4.000)

Riserva per imprevisti. È buona pratica avere il 4-8% di contingency in qualsiasi PoC. Stiamo bassi perché il buffer è già distribuito in altre voci (team buffer, infrastruttura buffer).

---

## Cosa NON è incluso (e va esplicitato a Mondadori)

❌ **Sviluppo di nuove features oltre lo scope del PoC**: ogni feature non prevista in fase 1 viene quotata a parte.
❌ **Costi di scaling post-PoC**: l'eventuale rollout a tutta la divisione o al gruppo è quotato in una proposta commerciale separata, post-validation.
❌ **Compenso ai lettori interni Mondadori**: il loro effort durante il PoC è coperto da Mondadori, non da questo budget.
❌ **Costi di marketing / comunicazione esterna sul PoC**: se Mondadori vuole comunicare pubblicamente il PoC, lo strutturiamo a parte.

---

## Note di pricing strategico

1. **Perché esattamente €100K e non €80K o €120K?**
   PLAI ha allocato fino a €100K per PoC. Chiediamo il massimo per **dimostrare che il PoC è serio** — un PoC sotto-budget rispetto al massimo allocato segnala mancanza di ambizione operativa. Allo stesso tempo, lo strutturiamo in modo che ogni euro abbia razionale visibile.

2. **Cosa succede se Mondadori vuole tagliare il budget?**
   Le voci tagliabili (in ordine di preferenza): contingency → buffer team → travel → integration custom → editorial expert (mai tagliare quest'ultima sotto €8K).

3. **Cosa succede se il PoC va oltre budget?**
   Il rischio è interamente nostro fino al +15%. Oltre quella soglia, attiviamo una conversazione con Mondadori per redirezione di scope. Questo va detto chiaramente nel contratto.

4. **Equity vs cash mix?**
   Il PoC è proposto in **cash** (€100K dai €100K PLAI). L'equity investment iniziale (€100K per ~7%) è separato dal PoC budget. Non confondere mai i due flussi nella conversazione con PLAI.

---

## Output finale per il one-pager

Per il pitch finale, riassumere in una sola visualizzazione:

```
€100K — 90 giorni — 200 manoscritti
─────────────────────────────────────
Team Kalamos              ████████████ €52K
Infrastructure            ███          €13K
Editorial experts         ███          €12K
Mondadori integration     ███          €10K
Compliance & legal        █            €5K
Travel & on-site          █            €4K
Contingency               █            €4K
```

Più la riga finale: *"Nessun costo nascosto. Trasparenza totale sui flussi."*
