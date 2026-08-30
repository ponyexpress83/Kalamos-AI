# CLAUDE.md — Progetto Kalamos AI

Questo file è la **memoria persistente del progetto** per ogni sessione di Claude Code. Leggilo per intero all'inizio di ogni sessione. Non riassumerlo, non saltarlo.

*Ultima riscrittura: 6 agosto 2026, dopo la call PLAI che ha cambiato il posizionamento.*

---

## 0. Che cos'è Kalamos, in una riga

> Kalamos è il livello di **intelligenza e memoria** sopra la decisione editoriale.
> Non è un filtro per la posta in arrivo e non è un gestionale.

Questa riga ha sostituito il posizionamento precedente ("filtriamo i manoscritti non sollecitati"), che è stato messo in discussione da chi ci valuta: nelle case editrici grandi lo screening degli sconosciuti è già banale, e il dolore che gli editor citano è un altro. Ogni scelta di prodotto va misurata su questa riga.

Tre conseguenze operative, che il prodotto deve rendere vere:

1. **La fonte non è più lo slush pile.** Un'opportunità editoriale entra da più canali — proposta non sollecitata, agenzia letteraria, scout, diritti esteri, autore già in catalogo, progetto commissionato, premio o concorso — e il sistema li tratta tutti allo stesso modo. Il prodotto oggi assume implicitamente un solo canale: va reso esplicito e multiplo.
2. **Il sistema deve ricordare *perché*.** Non basta registrare che un testo è stato scartato: serve la ragione, in forma strutturata. È ciò che nel tempo distingue Kalamos da un modello generico, ed è anche lo strumento con cui misuriamo noi stessi.
3. **Non sostituiamo il gestionale.** Esistono sistemi consolidati per contratti, royalty, ONIX, ordini (Klopotek, Ingenta, Firebrand, Consonance, Schilling). Non li rifacciamo. Kalamos sta sopra o accanto. La formula da usare: **«siamo un sistema di intelligenza, non un sistema di registrazione»** — loro sanno cosa è successo, noi perché e cosa guardare adesso.

---

## 1. Stato reale del prodotto

**La demo è online e funzionante**: `kalamos-ai.vercel.app`, Next.js su Vercel, inferenza reale su Claude (in produzione `claude-opus-4-8`, dietro la variabile `ANTHROPIC_MODEL`).

Che cosa fa oggi, verificato:

- Si entra scegliendo una **redazione** (nessuna credenziale: è una scelta di contesto dichiarata) e si vede la coda dei manoscritti in arrivo con la collana suggerita del catalogo di quella casa.
- **9 case editrici e 35 collane reali**, verificate una a una sui cataloghi pubblici, con la fonte citata in `config/publishers.ts`.
- Scheda di lettura strutturata: sintesi, voce, voto di prosa, target, comparabili, forze e criticità, fit per collana.
- **Tre controlli deterministici** (codice, non un secondo modello): output vincolato a schema zod; citazione letterale obbligatoria, verificata nel testo caricato; collana proposta confrontata con il catalogo reale e scartata se inventata.
- Raccomandazione **contestuale alla casa**: lo stesso testo che da Einaudi è prioritario può essere da scartare da Sperling & Kupfer.
- Batch fino a 5 `.txt`, feedback dell'editor (oggi solo concordo/non concordo), pagina `/riservatezza`, euristica offline etichettata come fallback.

Che cosa **non** c'è:

- Nessun database: tutto vive in `localStorage` (coda, redazione scelta, feedback). Due editor della stessa redazione non vedono la stessa coda.
- Nessuna autenticazione, nessun rate limit sull'endpoint di analisi.
- Nessun retrieval vettoriale, nessuna composizione ad agenti: è una singola chiamata con schema vincolato, e il catalogo è descritto nel prompt.
- **Nessun pilota in corso, nessun ricavo, nessuna misura di concordanza con un editor reale.**

---

## 2. Il perimetro — la riga che non si attraversa

**Kalamos è un back-office per la redazione. Chi apre l'applicazione è un dipendente della casa editrice.**

Non si costruiscono, mai, senza una decisione esplicita di Valerio:

- portali autore o account per gli autori;
- aree in cui l'autore segue lo stato della sua proposta;
- messaggistica verso l'autore;
- piattaforme per visionare le bozze.

Motivo, appreso in call: Mondadori Libri è chiuso su tutto ciò che tocca il "prodotto" — interazione con l'autore, bozze — e aperto sui **processi interni**. In più, una piattaforma a due lati apre il problema del marketplace (servono contemporaneamente editori e autori) che oggi non possiamo permetterci.

Se una funzione sembra richiedere di attraversare questa riga: **fermati e chiedi**.

---

## 3. Fuori scopo — non iniziarli nemmeno

- **Analisi ed estrazione di contratti, confronto clausole, royalty.** Sappiamo che la contrattualistica è un dolore dichiarato da Mondadori, ma non sappiamo *quale* dei tre problemi sia (amministrazione dei diritti, stesura, rendicontazione). La domanda è stata posta ed è in attesa di risposta. Costruire adesso significherebbe ripetere l'errore che ci ha portati qui.
- Versioni del manoscritto, confronto V1/V2/V3, richieste editoriali.
- Fine-tuning di qualunque modello.
- Blockchain, notarizzazione, smart contract.
- ERP, ONIX, distribuzione, magazzino, contabilità.

---

## 4. Il motore di giudizio resta fermo

Nelle prossime settimane facciamo una **validazione retrospettiva** su manoscritti già giudicati da editori reali. Perché quella misura valga, il motore deve restare quello di oggi.

**Non modificare:**

| File | Cosa contiene |
|---|---|
| `app/api/analyze/route.ts` | `SYSTEM_PROMPT` e `buildUserPrompt` |
| `lib/schema.ts` | lo schema della scheda |
| `lib/verifica.ts` | i controlli deterministici |
| `config/publishers.ts` | il catalogo (migrabile su database, ma i **contenuti** non si toccano) |
| `lib/heuristic.ts` | l'euristica offline |

L'unica eccezione prevista è l'analisi per capitoli, che aggiunge una **modalità nuova** lasciando intatta quella esistente. Se pensi che uno di questi file vada cambiato, scrivilo in un file di note e vai avanti con il resto.

---

## 5. Il concorrente diretto: Storywise

**storywisepublishers.com** — dati verificati sul loro sito ad agosto 2026.

Cosa hanno: collegamento all'inbox delle submission, report card, comparabili, rilevazione di testo generato da AI, workflow. Il profilo di gusto si imposta dichiarando «genres, themes, keywords, style preferences» e affermano che «gets sharper the more you use it». Dichiarano «20K+ manuscripts processed», clienti nominati (Bloodhound Books, Collective Ink) e partnership con Bowker, IBPA e IPG.

Sono **più avanti di noi**. Va quindi abbandonata la formula «loro usano un profilo dichiarato, noi impariamo»: rivendicano anche loro un apprendimento.

Le tre differenze che reggono alla verifica, da tenere presenti in ogni scelta di prodotto:

1. **L'unità di misura.** Il loro profilo è per account, costruito su generi e parole chiave. Il nostro è la **collana nominata di un catalogo reale**, e lo stesso testo prende punteggi diversi su collane diverse dello stesso gruppo.
2. **L'ancoraggio.** Ogni nostro giudizio porta una citazione letterale ricercata nel testo, e la collana proposta è verificata contro il catalogo: sono controlli deterministici, non promesse.
3. **La misurabilità dell'apprendimento.** «Migliora con l'uso» è un'affermazione che loro non accompagnano con un metodo pubblico. Noi dobbiamo poter mostrare *di quanto* migliora, su quale archivio e con quale protocollo.

Il mercato italiano e francese, con i suoi cataloghi e la sua lingua, resta scoperto: il loro è anglofono.

---

## 6. Divieto di claim numerici non misurati

**Nessun numero di efficacia entra in un materiale se non è stato misurato da noi, su dati reali, con un metodo dichiarato.**

Non esistono più, e non vanno reintrodotti in nessuna forma: «riduce il backlog del 70-90%», «triage 10×», «99% di riduzione dei tempi». Erano formule, non misure.

Le regole pratiche:

- I numeri **calcolati** (per esempio il costo per scheda dai token e dal listino) si dichiarano come calcolati.
- I numeri **misurati** (tempo per scheda) si dichiarano con quante misure li compongono.
- Le **stime di settore** (€150-500 e 5-15 giorni per una scheda professionale) restano marcate `[DA VERIFICARE]` finché non le confermiamo sui dati di un editore.
- Se non puoi verificare, scrivi «non verificato» e spiega perché.

---

## 7. Chi è il founder (contesto operativo)

**Valerio Gestri** — imprenditore italiano basato a Grosseto. Opera attraverso PONYX (AI startup studio). Kalamos AI è una delle sue venture.

- 8+ anni di sviluppo mobile (iOS Swift/SwiftUI, Android Kotlin/Compose, React Native); sviluppa da solo tutto il prodotto.
- Laurea in Lettere e Filologia Moderna → ponte fra mondo editoriale e tecnologia.
- **Ilaria Cesarini**, co-founder: insegnante e poetessa pubblicata da Pequod.
- **Philippe**, entrato nel 2026: oltre dieci anni nell'editoria francese e italiana, autore pubblicato, è stato nel team fondatore di GetFluence.

Il team è piccolo ma verticalmente competente. Non vendere "fuffa team": vendi la combinazione rara **tecnologia + editoria vera**.

**Conseguenza operativa da ricordare sempre**: c'è un solo sviluppatore. Meno infrastruttura da mantenere vale molto. Ogni scelta tecnica va pesata anche sul costo di manutenzione.

---

## 8. PLAI e Mondadori — dove siamo

PLAI è l'acceleratore del Gruppo Mondadori. **Il programma è cambiato** rispetto ai materiali precedenti: non più €100K per ~7% dentro un batch, ma un **investimento ibrido fino a €300K** — equity più una collaborazione operativa vera — su startup un po' più mature, con un percorso molto più distribuito e su misura della corporate.

Dalla call del 6 agosto 2026:

- Mondadori Libri è **chiuso sul prodotto** (autore, bozze) e **aperto sui processi interni**. La linea «interveniamo sui processi, non sul prodotto editoriale» è stata accolta bene e va tenuta in ogni materiale.
- Il dolore che Mondadori dichiara **non è il nostro**: è la parte contrattuale con l'autore. E per una casa grande la slush pile conta poco, perché gli autori arrivano già validati da editori più piccoli.
- Il compito assegnato è **validare su editori indipendenti e medi** e tornare con uso reale misurato. Risposta attesa a **settembre 2026**.

Conseguenza: **il cliente iniziale sono gli editori indipendenti e medi, non il primo gruppo italiano.** Mondadori è il secondo passo, e ci si arriva con i numeri dei primi utenti in mano.

Link: [PLAI call 2026](https://www.plai-accelerator.com/call-2026/) · [comunicato apertura](https://www.mondadorigroup.com/media-room/news-and-press-releases/2026/plai-opens-the-2026-startup-call)

---

## 9. Convenzioni di scrittura (leggi prima di scrivere)

### Lingua
Italiano per tutto ciò che è destinato a un lettore umano: documenti, commenti nel codice, messaggi di commit. Codice e identificatori in inglese, come già sono. Se scrivi in inglese per abitudine, traduci subito senza chiedere conferma.

### Tono
Editoriale, non da SaaS generico. Pensa a una proposta per Adelphi, non a un pitch di Y Combinator tradotto male.

- Evita: "rivoluzionare", "disrupt", "leverage", "sinergie", "AI-powered", "game-changer".
- Usa: verbi concreti (ridurre, automatizzare, validare), numeri reali, riferimenti specifici a opere, autori, collane.
- **Mai vendere fumo.** Se non sappiamo una cosa, si dice.

### Densità
Una frase, un'idea. Bullet point solo quando l'informazione è davvero elencabile (3+ voci parallele), altrimenti prosa. Massimo 150 parole per una risposta esecutiva, 400 per una descrizione estesa, salvo limiti diversi imposti da un form.

### Formattazione
Markdown. Heading da H2 in giù (l'H1 è il titolo del file). Tabelle per i confronti. Le citazioni (`>`) solo per citazioni reali.

---

## 10. Regole di sessione

- **Sempre** leggere questo file e `ROADMAP.md` all'inizio di una sessione.
- **Mai** inventare numeri, partnership, traction. Se non c'è, scrivere `[DA VERIFICARE]` o `[DA OTTENERE]`.
- **Sempre** chiedere prima di sovrascrivere `01-positioning/` e `03-poc-proposal/`.
- Un commit per unità di lavoro coerente. Niente chiavi API nei commit: le variabili nuove vanno in `.env.example` con valori fittizi.
- Se qualcosa non funziona: **cosa hai fatto, cosa ti aspettavi, cosa è successo**. Mai «non va».
- **Non aggiustare mai il codice o i dati per far tornare un risultato.**
- Ogni fase di lavoro finisce con: cosa hai cambiato, cosa hai verificato e come, cosa resta aperto.
- Quando chiudi un task significativo, aggiungi una riga al log in `ROADMAP.md`.

---

## 11. Mappa del progetto

```
Kalamos-AI/
├── CLAUDE.md               # questo file
├── README.md               # guida d'uso
├── ROADMAP.md              # fasi di lavoro e log dei progressi
│
├── app/                    # applicazione Next.js (App Router)
│   ├── page.tsx            # landing
│   ├── redazione/          # la scrivania: coda dei manoscritti
│   ├── demo/               # aggiungi un manoscritto alla coda
│   ├── scheda/             # schede di lettura
│   ├── riservatezza/       # flusso dati dichiarato
│   └── api/analyze/        # il motore (NON MODIFICARE, vedi §4)
├── components/             # interfaccia
├── lib/                    # schema, verifica, euristica, estratto, sessione
├── config/publishers.ts    # catalogo: 9 case, 35 collane reali
├── data/                   # manoscritti demo e schede generate
├── scripts/                # generazione schede, build deck
│
├── 00-context/             # PLAI, ecosistema Mondadori, batch precedenti
├── 01-positioning/         # core message, differenziazione, elevator pitch
├── 02-application/         # risposte al form
├── 03-poc-proposal/        # il PoC di 90 giorni
├── 04-pitch-deck/          # outline e speaker notes
├── 05-financials/          # business model, unit economics
├── 06-product/             # architettura, scope, script demo, piani
├── 07-research/            # mercato, competitor, trend
├── 08-outreach/            # decision maker, warm intro
└── 09-demo-day/            # briefing, Q&A, obiezioni
```

---

## 12. Stato per sezione

| Sezione | Stato | Note |
|---|---|---|
| 00-context | 🟢 | numeri PLAI da aggiornare col nuovo modello ibrido fino a €300K |
| 01-positioning | 🟡 | da riallineare al posizionamento nuovo (memoria, non filtro) |
| 02-application | 🔴 | fermo, e va ripensato dopo il cambio di posizionamento |
| 03-poc-proposal | 🟡 | il PoC su Sperling resta valido come proposta, ma non è più il primo passo |
| 04-pitch-deck | 🔴 | solo outline, con claim superati |
| 05-financials | 🟡 | unit economics corrette (costo marginale reale), proiezioni da rifare |
| 06-product | 🟢 | demo online; `da-demo-a-prodotto.md` è il piano corrente |
| 07-research | 🟢 | scheda su Storywise, Schilling e Ingenta verificata ad agosto 2026 in `competitors.md` |
| 08-outreach | 🔴 | da fare |
| 09-demo-day | 🟢 | briefing e Q&A allineati alla demo reale |

Aggiorna questa tabella ogni volta che chiudi una sezione.
