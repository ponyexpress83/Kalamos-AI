# ROADMAP — Kalamos AI

> Fasi di lavoro correnti e log dei progressi. Aggiornare ogni volta che si chiude una fase.
> Il piano precedente (8 settimane verso la submission PLAI) è superato: la call del
> 6 agosto 2026 ha spostato il compito da "candidarsi" a "validare su editori reali".

---

## Dove siamo

Demo online e funzionante, nessun pilota, nessun ricavo, nessuna misura di concordanza
con un editor reale. PLAI risponde a settembre; il compito assegnato è portare **uso
reale misurato** su editori indipendenti e medi.

Il posizionamento è cambiato: Kalamos è il livello di **intelligenza e memoria** sopra
la decisione editoriale, non un filtro per la posta in arrivo. Vedi `CLAUDE.md` §0.

---

## Le fasi di questo lavoro

### Fase 0 — allineare la memoria del progetto ✅
Riscrittura di `CLAUDE.md` sul posizionamento nuovo, sullo stato reale del prodotto, sul
perimetro autore, sul fuori scopo, sul divieto di claim non misurati e su Storywise.
Verifica del conteggio catalogo. Allineamento di questa roadmap.

### Fase 1 — il fusibile ✅
`app/api/analyze/route.ts` è un POST aperto: nessuna autenticazione, nessun rate limit,
nessun tetto sulla dimensione dell'input. Servono: rate limit per IP a finestra
scorrevole, tetti su testo e PDF con 413, token condiviso opzionale via variabile
d'ambiente (se assente la demo resta aperta), tetto di spesa per richiesta stimato dai
token in ingresso.

### Fase 2 — mai più un verdetto degradato 🔴
Oggi qualunque errore non di autenticazione fa ripiegare la risposta sull'euristica
offline, con stato 200. Per una demo è furbo, per un editor che decide se scartare un
libro è grave. Variabile `KALAMOS_MODE`: in `demo` il fallback resta ma va dichiarato in
modo impossibile da non vedere; in `produzione` niente fallback, errore esplicito e
lavoro rimesso in coda.

### Fase 3 — modello dati e persistenza 🔴
Tutto vive in `localStorage`: due editor della stessa redazione non vedono la stessa
coda. Serve un database, e serve prima delle fasi 4, 5 e 6. Progetto in
`06-product/architettura-dati.md` con opzioni a confronto e costo stimato a 500
manoscritti al mese, **poi** implementazione. Entità: organization, imprint, collection,
user, opportunity, manuscript, analysis, decision, event. Inserimento di una nuova casa
editrice **manuale**, via script di seeding: niente onboarding self-service, niente
estrazione automatica del catalogo. Riscrittura di `/riservatezza`, che diventa falsa nel
momento in cui persistiamo i testi.

### Fase 4 — la provenienza 🔴
Campo `source` obbligatorio su ogni opportunity, da tassonomia chiusa: proposta non
sollecitata, agenzia letteraria, scout, diritti esteri, autore in catalogo, progetto
commissionato, premio o concorso. Più `language`. La coda si filtra e si raggruppa per
provenienza. **Il flusso di lavoro cambia con la provenienza; il giudizio no** — se il
motore giudicasse diversamente a seconda del canale, la misura retrospettiva non sarebbe
più confrontabile fra fonti.

### Fase 5 — la memoria delle decisioni 🔴 *(il cuore del lavoro)*
Oggi si registra solo concordo/non concordo. Serve la **ragione**: verdetto, azione,
ragioni da vocabolario chiuso in tabella, collana giusta se quella proposta era sbagliata,
nota facoltativa, tempo impiegato misurato. Vincolo di attrito: meno di dieci secondi per
registrare, o nessuno lo farà. Più una vista per la redazione e un export CSV/JSON che è
il materiale del rapporto di validazione.

### Fase 6 — la calibrazione 🔴 *(dietro feature flag, spenta di default)*
Recupero delle decisioni passate più simili prese dalla stessa collana, mostrate accanto
alla scheda come contesto. Nella prima versione **non entrano nel prompt**. Con protocollo
di misura a due bracci sugli stessi testi (baseline senza memoria / calibrato con
memoria), partizione semplice sopra le 150 decisioni e validazione incrociata sotto,
conteggi in valore assoluto. Regola assoluta: **una decisione non entra mai nella memoria
usata per valutare sé stessa**, con test automatico che lo verifica.

### Fase 7 — analisi per capitoli 🔴
Modalità **nuova**, che non sostituisce l'estratto attuale: segmentazione su confini di
capitolo con ricaduta sui paragrafi, analisi per segmento, aggregazione nella scheda nel
formato attuale più un dettaglio che dica dove il testo tiene e dove cede. Con tetto di
spesa configurabile per manoscritto.

---

## Fuori da questo lavoro (vedi CLAUDE.md §3)

Contratti e royalty · versioni del manoscritto · fine-tuning · blockchain · ERP e ONIX ·
portali autore e qualunque funzione rivolta all'autore.

---

## Rischi attivi

| Rischio | Probabilità | Impatto | Mitigazione |
|---|---|---|---|
| Storywise arriva sul mercato italiano prima di noi | Media | Alto | Vantaggio su cataloghi e lingua; misurare l'apprendimento, cosa che loro non documentano |
| La validazione retrospettiva non trova abbastanza decisioni usabili | Alta | Alto | Validazione incrociata invece della partizione semplice (fase 6) |
| Mondadori conferma che il triage non è un loro dolore | Media | Medio | Il cliente iniziale sono gli indipendenti; la risposta sulla contrattualistica apre un secondo fronte |
| Un solo sviluppatore: l'infrastruttura cresce oltre il mantenibile | Media | Alto | Preferire sempre meno pezzi da mantenere, anche a costo di qualche funzione in meno |
| Chiave API bruciata da un endpoint aperto | Contenuto | Alto | Fase 1 chiusa: rate limit, tetti di dimensione e di spesa, token condiviso. Il conteggio è per istanza serverless, vedi `06-product/limiti-e-costi.md` |

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
2026-08-06 | fase 1    | Fusibili su /api/analyze: rate limit a doppia finestra (5/min, 40/ora) per chiamante, tetti di dimensione (1.200.000 caratteri, 6 MB di PDF) con 413, token condiviso opzionale via KALAMOS_API_TOKEN + filtro d'origine, tetto di spesa stimato PRIMA della chiamata all'API (default $1,00, pagine del PDF contate dai marcatori con ripiego sulla dimensione). Il conto dei valori e i limiti noti in 06-product/limiti-e-costi.md. Verificato con richieste reali: 413, 429 con retry-after, 401 senza token
2026-08-06 | fase 0    | CLAUDE.md riscritto: posizionamento nuovo (intelligenza e memoria sopra la decisione editoriale, non filtro della posta), stato reale del prodotto al posto di "pre-product", perimetro autore come vincolo permanente, elenco fuori scopo, divieto di claim numerici non misurati (rimosso "riduce il backlog del 70-90%"), Storywise come concorrente diretto, elenco dei file del motore da non toccare. Conteggio catalogo verificato con due metodi: 9 case, 35 collane. ROADMAP allineata alle 7 fasi
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
