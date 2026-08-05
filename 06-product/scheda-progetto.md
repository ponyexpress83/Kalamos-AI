# Kalamos·AI — scheda di progetto

> Versione narrativa del progetto, per colloqui e application. Ogni affermazione
> qui dentro è verificabile: ciò che è costruito è marcato **[costruito]**, ciò
> che è progettato ma non ancora implementato è marcato **[progettato]**. La
> distinzione non è pignoleria: al colloquio un'architettura raccontata come
> esistente si sbriciola alla prima domanda su come è stata misurata.

**Stato al 5 agosto 2026.** Demo pubblica funzionante con inferenza reale
(Next.js su Vercel, motore Claude). Nessun pilota in corso presso un editore,
nessun ricavo, nessun dato di redazione reale. Il prodotto è pre-pilota: il PoC
di 90 giorni con Sperling & Kupfer è la proposta, non un fatto compiuto.

---

## 1. Il problema di business

Una casa editrice riceve ogni mese un volume elevato di manoscritti non
richiesti. La lettura editoriale è il collo di bottiglia: costa tempo di persone
senior e la grande maggioranza dei testi non è in linea con le collane
pubblicate.

Il costo non è solo la lettura inutile. Sono i tempi di risposta lunghi agli
autori — che per un editore sono reputazione — e il rischio concreto di perdere
il manoscritto giusto in mezzo al rumore. Il secondo costo è invisibile in
bilancio e più caro del primo.

L'obiettivo di prodotto era portare la prima scrematura da giorni-persona a
minuti, **senza togliere la decisione all'editor**. Kalamos produce una
raccomandazione motivata e verificabile; chi decide resta chi ha sempre deciso.

I riferimenti di settore per una scheda di lettura professionale — €150-500 e
5-15 giorni — sono stime di mercato **[DA VERIFICARE sui dati reali
dell'editore nella Fase 1 del PoC]**, non numeri nostri. La demo le mostra
accanto ai propri valori misurati proprio per non spacciarle per misure.

---

## 2. L'architettura funzionale e le scelte

La scelta di fondo è stata **usare API di modelli commerciali invece di
addestrare qualcosa di proprietario**: il valore non stava nel modello, stava nel
codificare il criterio editoriale e nel garantire un output strutturato e
verificabile. Oggi il motore è Claude (Anthropic); il codice tiene il modello
dietro una sola variabile d'ambiente, così cambiarlo — o affiancarne un secondo
per resilienza e negoziazione — è una riga, non una riscrittura. **[costruito]**

Il sistema è organizzato in quattro livelli.

### Ingestione **[costruito]**

Upload in tempo reale (testo incollato, `.txt`, `.pdf`), estrazione e
normalizzazione del testo. Sui documenti lunghi non si manda il testo intero: si
costruisce un estratto rappresentativo — incipit, campione centrale, finale —
entro un budget di 12.000 token, **con i tagli su confini di paragrafo o di
frase**. Tagliare a metà una scena rende inutile qualunque analisi successiva su
voce e struttura. La scheda dichiara sempre quando è stata prodotta su estratto.

La segmentazione per unità narrative vere (capitoli, scene riconosciute) è il
passo successivo. **[progettato]**

### Rappresentazione del catalogo

Oggi ogni collana è descritta da una scheda editoriale strutturata — profilo,
descrizione, catalogo di riferimento — e il set completo delle collane candidate
viene passato al modello insieme al testo. Nella demo sono **9 case editrici e
36 collane reali**, verificate una a una sui cataloghi pubblici, con la fonte
citata nel codice. Nessuna collana inventata: è la condizione minima perché un
editor prenda sul serio l'output. **[costruito]**

Il passo che manca è il **retrieval vettoriale**: ogni collana descritta anche da
estratti rappresentativi dei titoli pubblicati, tutto trasformato in embedding e
indicizzato; all'arrivo di un manoscritto i suoi blocchi vengono confrontati per
similarità con l'indice del catalogo. Il retrieval qui non serve a far scrivere
il modello, serve a **restringere il campo**: invece di valutare il testo contro
tutte le collane, il modello riceve solo le due o tre candidate emerse dal
confronto vettoriale, insieme ai passaggi di catalogo più vicini, che diventano
il termine di paragone esplicito. È la scelta che rende il fit-score difendibile
in redazione — l'editor vede *contro cosa* il testo è stato confrontato — e che
taglia il costo per analisi, perché il modello lavora su un contesto mirato.
**[progettato]** — dettagli in `architecture.md`.

### Giudizio **[costruito]**

Il modello riceve il manoscritto (o le sue porzioni rappresentative) insieme al
contesto e restituisce un output **vincolato a uno schema fisso**: fit-score per
ciascuna collana candidata, motivazione, passaggio citato a sostegno, e una
scheda di lettura con sintesi, registro, target, comparabili, punti di forza e
criticità. La raccomandazione finale (Prioritario / Seconda lettura / Scarta) è
**contestuale alla casa**: combina qualità della prosa e fit col catalogo, perché
un testo forte ma lontano dalla lista non è "prioritario" per quella redazione —
è un testo per un'altra casa, e dirlo è informazione utile, non un no.

Il **routing a due passaggi** — un modello economico per la prima scrematura, uno
più capace solo sui testi che la superano — è la leva di costo più forte:
la maggior parte dei manoscritti si esclude con poco e non ha senso pagare il
modello migliore per dire di no. Va attivato quando l'eval harness può misurare
quanto recall costa la scrematura economica; prima di quella misura è un
risparmio cieco. **[progettato]**

### Composizione ad agenti **[progettato]**

Il flusso oggi è una singola chiamata con schema vincolato, più un fallback
euristico offline dichiarato. La direzione è scomporlo in passi specializzati —
estrazione, confronto col catalogo, giudizio editoriale, scrittura della scheda —
ciascuno col proprio prompt e la propria validazione. Il vantaggio pratico è
duplice: un passo che fallisce si ripete da solo senza far cadere l'intera
analisi, e ogni passo si può migliorare e misurare separatamente. Ha senso
introdurlo insieme all'eval harness, che è ciò che rende misurabile il singolo
passo.

---

## 3. I vincoli tecnici e di costo

**Documenti lunghi.** Affrontati su tre fronti: analisi su porzioni
rappresentative invece che sul testo integrale in fase di scrematura
**[costruito]**; embedding del catalogo calcolati una volta sola e riutilizzati,
così il costo ricorrente è solo quello del manoscritto in arrivo
**[progettato]**; routing fra modelli **[progettato]**.

**Allucinazioni.** Tre livelli, nessuno dei quali chiede a un secondo modello di
controllare il primo — tutti **[costruito]**:

1. *Output vincolato.* La risposta è generata dentro uno schema fisso e validata:
   fuori formato viene scartata e rigenerata invece di arrivare all'utente.
2. *Obbligo di citazione.* Il prompt impone di riportare un passaggio **letterale**
   del manoscritto a sostegno del giudizio. Un giudizio non verificabile in
   redazione non vale nulla.
3. *Controlli deterministici a valle.* Codice, non modelli: il punteggio deve
   stare nell'intervallo previsto; la collana proposta deve esistere davvero nel
   catalogo di quell'editore, altrimenti viene scartata prima di arrivare
   all'editor; la citazione deve comparire nel testo caricato, altrimenti la
   scheda lo segnala. Sono controlli banali che intercettano la maggior parte
   degli errori a costo zero.

Il terzo livello nasce da un errore vero: in una versione precedente il modello
aveva attribuito a Ladolfi Editore una collana inesistente. Una collana inventata
basta a chiudere la conversazione con una redazione, e nessun prompt la impedisce
in modo affidabile — una whitelist sì.

**Latenza.** La scelta di prodotto è non far aspettare l'utente davanti a una
schermata ferma: avanzamento visibile durante l'analisi e coda dei manoscritti
lavorata a batch con stato per file. **[costruito]** L'analisi resta oggi una
chiamata sincrona con feedback di avanzamento; il passaggio a un job realmente
asincrono con notifica serve quando entrano in gioco manoscritti interi e
volumi di redazione. **[progettato]**

**Costo per manoscritto analizzato.** Calcolato sui prompt reali con il listino
pubblico Anthropic (agosto 2026), modello `claude-sonnet-4-6`:

| Caso | Input | Output | Costo per scheda |
|---|---|---|---|
| Testo breve (~600 parole) | ~2.700 token | ~1.300 token | **~€0,03** |
| Romanzo al tetto dell'estratto | ~13.700 token | ~1.300 token | **~€0,06** |
| Romanzo intero senza tetto (~90.000 parole) | ~135.000 token | ~1.300 token | ~€0,39 |

Il tetto sull'estratto vale quindi **circa 7×** sul costo per scheda. Sono
stime calcolate, non ancora misure: la demo cattura il consumo token effettivo
restituito dall'API e mostra il costo reale in redazione non appena si genera una
scheda dal vivo.

**Latenza misurata** in sessione di test locale sui manoscritti demo: ~19
secondi con JSON libero, ~35 secondi con output vincolato allo schema. Abbiamo
tenuto l'output vincolato: senza, il modello deriva sulla forma della risposta —
chiave radice rinominata, JSON avvolto in un blocco di codice — e la scheda va
gestita a mano invece che validata. Su piano Vercel gratuito il limite di 10
secondi per funzione taglia l'analisi: la demo richiede il piano Pro, ed è un
vincolo di hosting, non del motore.

---

## 4. I risultati

**Non ci sono ancora risultati di redazione, e vale la pena dirlo esplicitamente:
nessun editore ha usato Kalamos su manoscritti veri.** Non esiste quindi una
misura di concordanza col giudizio dell'editor, che è il numero che conta
davvero. Ottenerlo è precisamente lo scopo del PoC di 90 giorni.

Ciò che è verificato oggi:

- **Copertura del catalogo**: 9 case editrici e 36 collane reali, verificate sui
  cataloghi pubblici — narrativa (Sperling & Kupfer, Einaudi, Sellerio), poesia
  (Ladolfi, Samuele, Interno Poesia), ragazzi e albi (Il Battello a Vapore,
  Topipittori), fantasy (Oscar Vault). Tre appartengono al Gruppo Mondadori.
- **Il comportamento che dimostra la tesi**: la stessa coda di quattro
  manoscritti si riordina completamente cambiando redazione. Da Sperling &
  Kupfer il feel-good è in testa (73%) e il romanzo letterario scende a 27% con
  raccomandazione "scarta"; da Einaudi lo stesso letterario risale a 90% e il
  noir a 95%, entrambi "prioritario". *(Valori prodotti dall'euristica offline
  etichettata, non dall'inferenza reale: la demo li calcola senza chiave API.)*
- **Verifica esterna indipendente**: test finale su tutti i flussi con verdetto
  "pronta da mostrare", nessun blocker, tre rilievi minori — tutti corretti.
- **Costo e tempo per scheda**: stimati come sopra e **misurati e mostrati in
  app** a ogni analisi dal vivo.

Quello che il PoC deve produrre, e che oggi non abbiamo: recall sui titoli
effettivamente acquisiti (north-star), concordanza κ col giudizio editoriale reale
su un archivio già valutato, baseline vera di tempo e costo per scheda della
divisione. Il disegno retrospettivo — ~300 manoscritti già valutati come ground
truth, più un pilot live su 30-50 — serve esattamente a ottenerli senza chiedere
alla redazione di rileggere nulla.

---

## Cosa ci portiamo dietro da questo progetto

Il valore non è arrivato dal modello. È arrivato dall'aver definito con
precisione **cosa doveva restituire e in che forma**, perché fosse davvero
usabile da chi lavora in redazione: una collana che esiste davvero, un punteggio
che confronta il testo con un catalogo reale, una citazione che l'editor può
ritrovare nel manoscritto. Il modello è un fornitore intercambiabile; il criterio
editoriale codificato e i controlli che lo tengono onesto sono il prodotto.
