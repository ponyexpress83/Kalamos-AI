# Demo Script — Kalamos AI per PLAI

> Script da provare ad alta voce. Durata target: 75 secondi.
> Versione live + versione video pre-registrata (backup).

---

## Versione LIVE (75s)

**[0:00–0:05] Setup**

> "Vi mostro 60 secondi di Kalamos AI su un manoscritto reale inviato la settimana scorsa a un editore italiano di medio livello. Autore esordiente, romanzo, 95.000 parole."

*(condividere schermo, browser già aperto su dashboard editor)*

**[0:05–0:15] Dashboard**

> "Questa è la vista che ha l'editor di mattina, aprendo la posta. Sette manoscritti nuovi nella notte. Senza Kalamos sarebbero sette giornate di lavoro distribuite sui suoi lettori. Apro il primo."

*(click su titolo)*

**[0:15–0:45] Scheda di lettura**

> "Scheda generata in 22 minuti. Quattro sezioni: sinossi, struttura, voce, mercato. Ma il vero valore è qui in alto a destra."

*(zoom sul box fit-score)*

> "Fit-score 0.71 sulla collana Strade Blu. 0.43 su Stile Libero. L'editor sa, prima di leggere una sola riga, se questo manoscritto vale la sua attenzione per questa specifica collana — non in astratto."

*(scroll giù alla sezione verdetto)*

> "Verdetto operativo: 'Richiamare l'autore, chiedere il manoscritto integrale e tre capitoli aggiuntivi sulla seconda parte, che il sistema identifica come più debole.'"

**[0:45–1:00] Punto finale**

> "L'editor ha appena risparmiato cinque giorni di lavoro. Ma non ha delegato il giudizio: lo userà sui manoscritti che meritano davvero la sua attenzione. Questo è quello che facciamo a Kalamos."

*(chiudere screen share)*

---

## Versione VIDEO pre-registrata (60s)

Identica struttura, con queste regole:

- **Sottotitoli sempre attivi** (panel potrebbe non avere audio)
- **No audio narrativo** o solo sottofondo strumentale leggerissimo
- **Mouse cursor visibile e lento** (per essere seguibile)
- **Zoom su elementi chiave** (fit-score, verdetto)
- **No transizioni fancy** — taglio secco, professionale

Esportare in: MP4 H.264, 1920×1080, 30fps, max 50MB.

---

## Leave-behind e backup statico

Se la demo live o il video saltano (problemi tecnici, no audio, no rete), usare le **schede di esempio** in `schede-esempio/` come prova tangibile da mettere sul tavolo. Sono opere di pubblico dominio nel formato di output reale e mostrano il differenziatore in modo immediato: *La coscienza di Zeno* riceve "Rigetta" su Sperling e "Acquisizione forte" su una collana letteraria — prova visiva che il fit-score misura il rapporto testo–collana, non una qualità astratta. Stamparne due e portarle sempre.

> Nota di coerenza: le schede usano una scala fit-score 0-100; il demo live qui sotto la cita in formato 0-1. Uniformare la scala prima di mostrarle insieme.

---

## Cose da NON fare durante il demo

- ❌ Mostrare il backend, la console, il codice
- ❌ Aprire DevTools per "guardare cosa fa l'API"
- ❌ Dire "ovviamente questo è ancora MVP, ci sono dei bug..."
- ❌ Fare scroll velocissimi: lasciare 2-3 secondi su ogni vista importante
- ❌ Demo di più di un manoscritto (uno solo, fatto bene)

## Cose da preparare PRIMA

- [ ] Browser bookmark direttamente sulla dashboard
- [ ] Manoscritto di demo già caricato e processato (no live processing!)
- [ ] Backup: stesso flusso in video MP4 + screenshot statici come ultimo backup
- [ ] Verificare proiezione/screen sharing 10 minuti prima
- [ ] Internet stabile + hotspot di backup

## Manoscritto di demo: criteri di scelta

- **Reale** (anonimizzato, consenso dell'autore)
- **Mediamente buono** (fit-score né 0.95 né 0.10 — il valore di Kalamos si vede nelle sfumature)
- **Italiano**
- **Lunghezza 70-100K parole** (rappresentativo di un romanzo trade)
- **Genere**: scegliere un genere coerente con la collana target Mondadori (Sperling/Strade Blu).
