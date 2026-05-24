# ROADMAP — Kalamos AI × PLAI 2026

> Piano di lavoro settimanale e log dei progressi. Aggiornare ogni volta che si chiude un task.

---

## Piano a 8 settimane (la PLAI è always-on, quindi miriamo a essere submission-ready entro 2 mesi, poi iteriamo)

### Settimana 1 — Positioning blindato
**Obiettivo**: ogni asset successivo deve poter essere derivato da `01-positioning/core-message.md` senza ambiguità.

- [ ] Rifinire `01-positioning/core-message.md` (esiste bozza da lavoro precedente)
- [ ] Completare `01-positioning/differentiation.md` (tabella vs concorrenti)
- [ ] Scrivere `01-positioning/elevator-pitches.md` (30s, 60s, 3min)
- [ ] Test: leggi il core message a Ilaria e a un editor che non conosci. Se non capiscono in 30s, riscrivi.

### Settimana 2 — PoC proposal in versione cliente-ready
**Obiettivo**: il PoC deve essere così concreto che Mondadori possa firmare un contratto domani.

- [ ] Espandere `03-poc-proposal/90-day-plan.md` (esiste concept)
- [ ] Selezionare definitivamente la divisione target: Sperling & Kupfer vs Einaudi Stile Libero vs Strade Blu vs Piemme. Documentare in `target-division.md`.
- [ ] Definire 5 KPI quantitativi misurabili in 90 giorni (`kpis-success-criteria.md`)
- [ ] Allocare il budget €100K in modo dettagliato (`budget-100k.md`)
- [ ] Produrre il PoC one-pager PDF (output finale settimana 2)

### Settimana 3 — Research deep-dive Mondadori
**Obiettivo**: parlare di Mondadori come se ci lavorassimo dentro.

- [ ] Mappare tutte le divisioni del Gruppo (`07-research/mondadori-deep-dive.md`)
- [ ] Identificare 5-10 decision maker chiave (`08-outreach/plai-decision-makers.md`)
- [ ] Studiare le 16 startup già accelerate da PLAI: pattern di selezione (`00-context/previous-batches.md`)
- [ ] Identificare 3 brand/collane specifici dove Kalamos ha un fit ovvio

### Settimana 4 — Application form
**Obiettivo**: prima versione completa della candidatura submission-ready.

- [ ] Mappare tutte le domande del form PLAI (`02-application/form-master.md`)
- [ ] Scrivere ogni risposta in versione draft 1
- [ ] `/pressure-test` su ogni risposta lunga
- [ ] Riscrivere in versione draft 2 (target: -30% parole)
- [ ] **Non submittare ancora**

### Settimana 5 — Product & demo
**Obiettivo**: avere qualcosa da mostrare oltre alle slide.

- [ ] Architettura tecnica documentata (`06-product/architecture.md`)
- [ ] MVP scope: cosa esiste e cosa no entro il colloquio (`06-product/mvp-scope.md`)
- [ ] Demo script (5-7 minuti) (`06-product/demo-script.md`)
- [ ] Mockup cliccabili (Figma o equivalente) — anche solo screenshot statici

### Settimana 6 — Pitch deck
**Obiettivo**: deck di 12 slide pronto per Demo Day e per allegare alla candidatura.

- [ ] Outline 12 slide in markdown (`04-pitch-deck/outline.md`)
- [ ] Speaker notes per ogni slide
- [ ] Generare pptx con `scripts/build-deck.py`
- [ ] Test su 3 lettori esterni (editoria, tech, finance)

### Settimana 7 — Financials & outreach
**Obiettivo**: numeri solidi + warm intros prima della submission.

- [ ] Business model documentato (`05-financials/business-model.md`)
- [ ] Unit economics ragionevoli (`05-financials/unit-economics.md`)
- [ ] Proiezioni 3 anni (xlsx)
- [ ] Lista warm intros possibili (`08-outreach/warm-intros.md`)
- [ ] Outreach mirato a 2-3 persone nell'ecosistema PLAI/Mondadori PRIMA della submission

### Settimana 8 — Submission + iterazione
**Obiettivo**: submission ufficiale e setup per follow-up.

- [ ] Final review di tutto il materiale (positioning, application, PoC, deck)
- [ ] Submit application
- [ ] Email di follow-up programmate
- [ ] Setup tracking risposta PLAI
- [ ] Pianificare versione 2.0 della candidatura (sì, è always-on, possiamo iterare)

---

## Quick wins parallelizzabili (puoi farli in qualsiasi momento)

- [ ] Aprire conversazioni con almeno 2 editor freelance Mondadori (validazione del problem statement)
- [ ] Test rapido: prendere 5 manoscritti veri (anche public domain) e produrre 5 schede di lettura con un MVP minimale di Kalamos. Diventa un asset enorme per il colloquio.
- [ ] LinkedIn: post su "perché l'AI verticale per editoria è diversa dai content tools generici" → genera awareness e magari un'intro
- [ ] Studio dei manuals di evaluation dei lettori Mondadori (se reperibili) per allineare il modello AI

---

## Log dei progressi

> Ogni volta che chiudi un task, aggiungi una riga qui. Formato: `YYYY-MM-DD | sezione | descrizione`.

```
2026-05-24 | setup    | Progetto Claude Code creato con struttura base e CLAUDE.md
2026-05-24 | 03-poc    | PoC riprogettato come retrospettivo (archivio già valutato = ground truth) + braccio live ridotto; risolve l'obiezione "il PoC chiede a Mondadori di rileggere 200 manoscritti"
2026-05-24 | 03-poc    | KPI riancorati: north-star = recall sui titoli acquisiti; concordanza via Cohen's κ vs decisione editoriale reale; baseline tempo/costo rilevate in Fase 1 (non inventate)
2026-05-24 | 03-poc    | Divisione target fissata: Sperling & Kupfer (era "Sperling o Einaudi")
```

---

## Decision log (decisioni importanti prese, per non rifarle)

> Quando prendi una decisione strategica (es. "scegliamo Sperling come divisione target"), annotala qui con la data e il razionale.

```
2026-MM-DD | DECIDED: [decisione]
RAZIONALE: [perché]
ALTERNATIVE CONSIDERATE: [cosa abbiamo scartato]

2026-05-24 | DECIDED: il PoC usa un braccio retrospettivo come spina dorsale di validazione, non la doppia lettura parallela
RAZIONALE: l'archivio di manoscritti già valutati dà ground truth gratuito e abbastanza titoli acquisiti per misurare il recall; la doppia lettura chiedeva a Mondadori di spendere la risorsa scarsa (tempo di lettura) e su 200 nuovi manoscritti i casi positivi sarebbero stati 1-3
ALTERNATIVE CONSIDERATE: doppia lettura parallela su 200 manoscritti nuovi (scartata: costosa per Mondadori e statisticamente debole)

2026-05-24 | DECIDED: divisione target = Sperling & Kupfer
RAZIONALE: volume di sottomissioni più alto (assicura il dataset retrospettivo) + identità editoriale comunque definita + apertura storica all'innovation
ALTERNATIVE CONSIDERATE: Einaudi Stile Libero (tenuta come contingency se Mondadori ha lì uno sponsor più immediato); Strade Blu / Piemme (volume/fit inferiori)
```

---

## Rischi attivi (monitorare)

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| PLAI riceve >1000 application e nostra si perde nel rumore | Alta | Alto | Warm intro pre-submission, PoC ultra-concreto, follow-up cadenzato |
| Mondadori ha già internal AI team che fa cose simili | Media | Alto | Inquadrare Kalamos come partner specialistico, non sostituto interno |
| Team troppo piccolo per essere credibile per panel | Media | Medio | Aggiungere advisor editoriale con nome riconoscibile prima della submission |
| Nessun MVP funzionante al colloquio | Alta oggi | Alto | Sprint MVP minimalista settimana 5-6 |
| Concorrenti verticali editoriali AI esistono già | Bassa | Medio | Mappare in `07-research/competitors.md`, differenziarsi su autenticità editoriale |
