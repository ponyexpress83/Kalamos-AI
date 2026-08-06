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

- [ ] Aprire conversazioni con almeno 2 editor freelance Mondadori (validazione del problem statement) — verificare in particolare il **costo reale per scheda** (oggi nei materiali: stima €150-500) e i **tempi** (stima 5-15 giorni), così da sostituire le stime di settore con un dato fonte
- [ ] **Schede di esempio fatte** (Salgari, Svevo) in `06-product/schede-esempio/` — il prossimo passo è la versione con MVP reale su manoscritti freschi
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
2026-05-24 | align     | Allineati positioning, deck, budget e investor-tone al PoC retrospettivo (rimossi i residui "200 manoscritti / valutazione parallela")
2026-05-24 | 06-product| Aggiunta sezione "Addestramento e calibrazione del modello" in architecture.md
2026-05-24 | 09-demo   | Q&A tecniche su addestramento e difensibilità (Q26-28); allineate Q16/Q17 al PoC retrospettivo
2026-05-24 | 06-product| Create 2 schede di lettura di esempio (Salgari, Svevo) su opere di pubblico dominio: prova tangibile del formato e del fit-score per collana (attacca l'obiezione #1 "manca una prova")
2026-05-24 | align     | Scala fit-score uniformata a 0-100; numeri "dolore" (€150-500 / 5-15gg) marcati come stime di settore da verificare (deck, Q&A) e argomento spostato sulla capacità
2026-05-26 | 06-product| MVP cliccabile (Next.js): login redazione → coda manoscritti → scheda con fit-score per collana e verdetto. Dati di esempio (incl. schede Salgari/Svevo). Build verde, deployabile su Vercel. Risolve il 404 (il repo non era un'app web)
2026-06-24 | 06-product| Demo cliccabile con INFERENZA REALE: flusso Analizza (4 manoscritti demo originali / incolla / upload .txt-.pdf) → /api/analyze su Claude (structured output validato con zod, schema scheda completo) → scheda di lettura con fit-score per collana. Vista Redazione (tabella ordinabile + KPI). Schede demo in cache (parte offline). Rimosso il login. Brand allineato (inchiostro #14213d / accento #b3001b / carta #fbfaf7). Build verde
2026-08-03 | 06-product| Upgrade PLAI-ready della demo: Mondadori-first (S&K reintegrata con collane reali verificate — Pandora/Saggi/Economia/Varia; default solo case del Gruppo; badge), numeri call 2026 corretti nei documenti (€100K~7% + follow-on €400K; €40K PoC growth), schede reali in cache via script, KPI misurati, batch triage multiplo, feedback editor, pagina /riservatezza
2026-08-03 | 06-product| Integrate proposte collaboratore: roadmap "calibrazione sul catalogo" (successi+flop, riservata) e "AI-check di provenienza" (segnale con confidenza, mai verdetto) in mvp-scope; trend Kobo 45% (verificato, fonti LH/ActuaLitté) in industry-trends; menzione potenziale europeo in landing
2026-08-05 | 06-product| Test finale QA esterno (Cowork): nessun blocker. Corretti i 3 rilievi minori — KPI ora misurati anche dalle analisi di sessione (non solo dalla cache), testo di servizio riscritto senza gergo di sviluppo, contatore schede unificato
2026-08-06 | strategia | Call PLAI: programma cambiato (investimento ibrido fino a €300K, equity + collaborazione, startup più mature). Mondadori Libri chiuso sul "prodotto" (autore, bozze), aperto sui processi interni. Il dolore che dichiarano è la parte CONTRATTUALE con l'autore, non il triage; per una casa grande la slush pile conta poco. Compito assegnato: validare su editori indipendenti e tornare a settembre con uso reale misurato. Piano operativo in 06-product/da-demo-a-prodotto.md
2026-08-05 | 06-product| Correzioni dal test esterno pre-call: titolo "Triage 10×" (moltiplicatore mai misurato) → "Coda ordinata"; card KPI "manoscritti in coda" non contraddice più l'intestazione; costo etichettato in USD come lo stampa; sui PDF la scheda spiega perché la citazione non è confermabile invece di mostrare un messaggio neutro; nel batch si legge il titolo dedotto e non il nome del file; coda leggibile su telefono (colonna genere nascosta sotto sm)
2026-08-05 | align     | Cinque numeri corretti prima della call: 36 → 35 collane (la demo stessa mostrava 9/35), tempo per scheda ~35s → ~30s con media misurata 28s, costo dichiarato in dollari come il listino, rimossa la scusa falsa del "limite 10s del piano gratuito" (in produzione le analisi tornano in 24-41s), modello di produzione dichiarato (opus-4-8)
2026-08-05 | 09-demo   | Preparazione call: nuovo briefing-call.md (apertura 90s, demo in 3 momenti, numeri a memoria, ask, 8 domande killer, cosa non dire, piano B). demo-script.md riscritto sulla demo reale — il precedente descriveva una dashboard inesistente, fit su Strade Blu 71/43 e un manoscritto "ricevuto la settimana scorsa". Q&A: corrette 5 risposte false o contraddittorie (vector profile inesistente, fallback mai testato, "network effect fra clienti" che contraddiceva la promessa di riservatezza, traction vaga) + 9 domande nuove nate dalla demo
2026-08-05 | align     | Sweep di coerenza pre-call: tempo per scheda riallineato al misurato (~35s, non "15-30 minuti") in differentiation/form-master/elevator-pitches; costo marginale in business-model corretto di un ordine di grandezza (€0,50-1, era €6-10); claim RAG marcati come progettati in architecture e objection-handling
2026-08-05 | 01-posit  | differentiation.md: calibrazione sul catalogo (successi + flop, perimetro riservato) e AI-check come differenziatori che si accumulano; 3 righe nuove in tabella (calibrazione, provenienza AI, verificabilità del giudizio); obiezioni 6-7; costo per scheda riallineato al valore calcolato; potenziale europeo nel claim
2026-08-05 | 06-product| Guardrail anti-allucinazione in codice: citazione letterale obbligatoria nella scheda + controlli deterministici (whitelist collane del catalogo, presenza della citazione nel testo). Estratto tagliato su confini di frase. Nuova scheda-progetto.md con stato [costruito]/[progettato] e costo per scheda calcolato
2026-08-05 | 06-product| Riposizionamento editore-first: la scrivania di redazione è la schermata principale ("In quale redazione entri?" → coda di manoscritti in arrivo con provenienza), /demo diventa "Aggiungi un manoscritto alla coda". Raccomandazione resa contestuale (qualità della prosa × fit col catalogo della casa): la stessa coda si ribalta cambiando redazione, e il caso "buon testo, casa sbagliata" è spiegato nel razionale
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
