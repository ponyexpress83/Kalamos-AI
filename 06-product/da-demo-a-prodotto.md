# Da demo a prodotto — cosa serve perché una redazione lo usi davvero

> Scritto dopo la call PLAI del 6 agosto 2026. È il piano operativo fino a
> settembre, quando PLAI torna con la risposta interna di Mondadori Libri.
> Regola: niente qui dentro è già fatto. Ciò che esiste è nella demo.

---

## Cosa ha detto davvero la call

Quattro cose, in ordine di peso.

**1. Il programma è cambiato, e in meglio per noi.** Non più €100K per ~7% dentro un batch, ma investimento ibrido **fino a €300K**: equity più una collaborazione operativa vera. In cambio PLAI cerca startup un po' più mature. Non è un no alla nostra fase: è una richiesta precisa di prova d'uso.

**2. Mondadori Libri non tocca il prodotto, tocca i processi.** Testuale: sull'interazione con l'autore, sulla piattaforma per visionare le bozze, «sempre un po' complicato»; su quello che riguarda i processi interni, «sono un po' più aperti». La correzione di rotta fatta in call — Kalamos interviene sui processi, non sul prodotto editoriale — è stata accolta con un «esatto, era proprio quello che volevo capire». Va tenuta come linea, in ogni materiale.

**3. Il dolore che Mondadori dichiara non è il nostro.** È la frase più importante di tutta la call: «quando parlo con chi cura tutto il mondo dei libri non mi citano mai questo, mi citano altre cose che sono più che altro **la parte contrattuale** con l'autore». E poco dopo: per una casa grande è raro acquisire un esordiente dalla slush pile, perché gli autori arrivano già validati da editori più piccoli.

Non demolisce Kalamos, ma sposta due cose. Il triage dei manoscritti non richiesti è un dolore **degli editori medi e indipendenti**, non del primo gruppo italiano. E dentro Mondadori esiste un dolore adiacente — diritti e contratti — che nessuno ci ha chiesto ma che ci è stato indicato.

**4. Il compito assegnato è la validazione.** «Andate con quelli più piccolini, saranno loro a darvi qualche indicazione», e poi «quando un editor lo prende in mano e lo inizia a usare, tante supposizioni che avete fatto magari scoprite che non lo sono». Risposta a settembre. Nel frattempo l'unica cosa che sposta l'ago è **uso reale, misurato**.

---

## La conseguenza strategica

Il cliente iniziale non è Mondadori. Sono **gli editori indipendenti e medi**, che hanno volumi alti, redazioni piccole e nessun processo strutturato per la prima lettura. Mondadori diventa il secondo passo, e ci si arriva con i numeri di quei primi utenti in mano — che è esattamente ciò che PLAI ha chiesto.

Questo cambia anche il PoC che avevamo disegnato su Sperling & Kupfer: resta valido come proposta, ma non è più il primo passo. Il primo passo è un pilota vero su 3-5 editori indipendenti.

---

## Cosa manca perché una redazione lo usi (in ordine di necessità)

La demo dimostra il **giudizio**. Un prodotto deve reggere il **lavoro quotidiano**. Sono cose diverse, e oggi manca tutta la seconda.

### Livello 1 — senza questo non lo usa nessuno

**1.1 Account e spazio di lavoro per casa editrice.**
Oggi non c'è login. Serve: un workspace per casa, utenti con ruoli (direttore editoriale, editor, lettore esterno), dati isolati per tenant. Senza questo non si può nemmeno iniziare una prova con dati veri, perché un manoscritto inedito è IP di qualcun altro.
*Nota di sostanza: l'isolamento non è una funzionalità, è la precondizione contrattuale.*

**1.2 La coda si riempie da sola: ingestione dalla casella di posta.**
È la funzione che decide l'adozione. Gli autori continueranno a scrivere a `proposte@casaeditrice.it`: se la redazione deve caricare i file a mano, il prodotto muore alla seconda settimana. Serve una casella dedicata (o una regola di inoltro) da cui Kalamos prende allegati e corpo del messaggio, deduplica, e mette in coda già analizzato.
*Zero cambio di abitudini per l'autore, zero data entry per la redazione: è tutta lì la differenza fra un tool e un processo.*

**1.3 Stati, assegnazione e note interne.**
Oggi la coda è di sola lettura. Un manoscritto deve poter essere: da valutare → assegnato a un lettore → in seconda lettura → rifiutato → in trattativa. Con nota interna e storico di chi ha fatto cosa. È il minimo per sostituire il foglio Excel che ogni redazione ha, ed è il motivo per cui ci si torna ogni giorno.

**1.4 La risposta all'autore.**
La seconda metà del dolore, e la parte che genera la reputazione: i tempi di risposta. Dalla scheda si genera una bozza di risposta — rifiuto cortese, richiesta di materiale, presa in carico — nel tono della casa, che **l'editor rivede e invia**. Mai automatica, mai senza firma umana.
*È l'idea che Philippe ha portato in call, ed è giusta: chiude il ciclo e produce una metrica che l'editore capisce al volo — giorni medi di risposta.*

### Livello 2 — quello che lo rende difendibile

**2.1 Calibrazione sul catalogo della casa.**
Caricamento dei titoli pubblicati (successi **e** flop dichiarati) e delle decisioni storiche, in perimetro riservato. È il differenziatore che si accumula e che un competitor non può copiare, già documentato in `01-positioning/differentiation.md`.

**2.2 Retrieval vettoriale sul catalogo.**
Oggi il catalogo è una descrizione strutturata nel prompt. Con gli embedding dei titoli pubblicati il fit smette di essere un'opinione del modello e diventa un confronto con passaggi reali del catalogo, mostrabili all'editor. **È anche ciò che è stato detto in call** (vedi sezione "Debito di parola" più sotto).

**2.3 Metriche visibili all'editore.**
Manoscritti processati, tempo medio per scheda, giorni di risposta all'autore prima/dopo, e soprattutto **concordanza fra il giudizio di Kalamos e la decisione finale dell'editor**. È il numero che trasforma un pilota in un rinnovo, e oggi non lo misura nessuno.

**2.4 Export nel formato della casa.**
Ogni redazione ha il suo modello di scheda. Esportare nel loro formato (docx/PDF/foglio) vale più di qualunque integrazione sofisticata, perché si innesta su quello che già fanno.

### Livello 3 — da valutare, non da costruire adesso

- **Multilingua per lo scouting estero.** Provato in call su un manoscritto francese: funziona. Per un editore italiano è un caso d'uso reale (cosa vale la pena tradurre) e per noi è la porta sull'Europa. Da mettere a fuoco solo dopo il livello 1.
- **AI-check di provenienza.** Resta in roadmap con il vincolo di sempre: indicatore con confidenza, mai verdetto.
- **Area autori.** PLAI ha segnalato il rischio marketplace, e ha ragione. Non si costruisce finché gli editori non sono a bordo.

---

## Il fronte nuovo: diritti e contratti

PLAI ha detto, non richiesto, che il dolore dichiarato da Mondadori Libri è la gestione contrattuale con gli autori. Non sappiamo cosa significhi in concreto — potrebbe essere scadenze e rinnovi, cessione di diritti secondari (estero, audio, adattamento), royalty, archivio contratti non interrogabile.

**Non è un pivot, è una domanda da fare.** La mossa giusta è portarla ai primi editori del pilota: «come gestite i contratti e i diritti oggi?». Se la risposta è la stessa che PLAI sente da Mondadori, abbiamo trovato un secondo prodotto sullo stesso cliente e sullo stesso motore — documenti da leggere, estrarre, confrontare — e ci arriviamo con una prova invece che con un'intuizione.

Costo di questa verifica: cinque conversazioni. Va fatta a settembre, in parallelo al pilota.

---

## Debito di parola — da sanare prima di settembre

In call sono state dette due cose che oggi il prodotto non fa. Se a settembre c'è un approfondimento tecnico, non reggono.

| Detto in call | Stato reale | Cosa fare |
|---|---|---|
| «una combinazione di agenti AI e tutta la parte RAG per l'analisi dei testi» | Singola chiamata a Claude con schema vincolato. Nessun embedding, nessun database vettoriale, nessuna composizione ad agenti. Il catalogo è descritto nel prompt. | **Costruirlo** (punto 2.2): è comunque il passo giusto e c'è tempo. In alternativa correggere il tiro nella prima mail utile. |
| «con dei piccoli editori abbiamo già fatto dei test e sono andati molto bene» | Nel repo non esiste traccia di questi test. | Se sono reali: **documentarli** con nome della casa, data, cosa hanno provato, cosa hanno detto — sono stati promessi per iscritto («ti mando i feedback scritti»). Se erano conversazioni informali, trasformarle in prove vere adesso. |

La seconda è più urgente della prima: è stata promessa una consegna.

---

## Piano fino a settembre

**Settimane 1-2 — rendere il prodotto usabile da qualcuno che non sei tu**
Account e workspace (1.1), stati e assegnazione (1.3). Sono le due cose senza cui non puoi consegnare un accesso a un editore.

**Settimane 2-4 — l'ingestione dalla posta (1.2)**
La funzione che decide se lo usano davvero. Da sola vale più di tutte le altre messe insieme.

**Settimane 3-5 — pilota reale su 3-5 editori indipendenti**
Slush pile vera, quattro settimane, con misurazione: manoscritti processati, tempo per scheda, giorni di risposta all'autore, **concordanza fra Kalamos e la decisione finale dell'editor**. Feedback scritto firmato alla fine.
*In parallelo, in ogni conversazione: la domanda su diritti e contratti.*

**Settimane 4-6 — risposta all'autore (1.4) e metriche visibili (2.3)**
Chiudono il ciclo e producono i numeri da mostrare a settembre.

**Poi, se c'è tempo — retrieval vettoriale (2.2) e calibrazione sul catalogo (2.1)**
Sanano il debito di parola e sono ciò che rende la cosa difendibile davanti a un team tecnico.

---

## Cosa si porta a settembre

Non una demo migliore: **tre editori che lo stanno usando e quattro numeri veri**.

1. Quanti manoscritti sono passati dal sistema.
2. Quanto tempo per scheda, misurato prima e dopo.
3. Quanti giorni di risposta all'autore, prima e dopo.
4. Su quale percentuale dei casi il giudizio di Kalamos coincideva con la decisione dell'editor.

Il quarto è il più difficile e il più prezioso: è l'unico che risponde alla domanda «funziona?» invece che «è veloce?».
