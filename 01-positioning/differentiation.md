# Differenziazione Kalamos AI vs alternative

> Questo documento risponde alla domanda implicita più importante del panel PLAI: *"Perché non lo fa già Mondadori in casa con ChatGPT?"*

---

## Le 4 alternative che PLAI confronterà con noi

1. **Status quo**: lettori umani, processi manuali, fogli Excel
2. **ChatGPT / Claude in mano agli editor**: AI generalista usata caso per caso
3. **Tool internazionali generalisti** (Sudowrite, Spines, ProWritingAid, AutoCrit)
4. **Soluzione interna sviluppata da Mondadori** (con AWS o partner tech)

---

## Tabella comparativa principale

| Dimensione | Status quo (umano) | ChatGPT generico | Tool internazionali | Sviluppo interno Mondadori | **Kalamos AI** |
|------------|---------------------|------------------|---------------------|------------------------------|----------------|
| **Velocità per manoscritto** | 5-15 giorni [DA VERIFICARE] | 1-3 ore (con prompt continuo) | 30-60 min con setup | Variabile | **~30 secondi su estratto rappresentativo** (media misurata 28s); <30 min sul testo integrale |
| **Costo per scheda** | €150-500 [DA VERIFICARE] | €0.50-3 in API + tempo editor | €20-100/mese flat | Alto setup + manutenzione | **$0,03-0,06 di API per scheda** (calcolato sui prompt reali della demo, mostrato in app); prezzo all-in per l'editore secondo il tier |
| **Qualità della valutazione** | Alta se buon lettore | Media-bassa, generica | Bassa (orientata autori indie) | Variabile, dipende dal team | **Alta, validata da expert editoriali** |
| **Fit con identità di collana** | Sì (se lettore esperto del genere) | No | No | Possibile ma costoso | **Sì, scoring per collana specifica** |
| **Comparable analysis** | Sì (manuale, lenta) | Generica, spesso datata | Limitata al mercato US | Possibile | **Sì, mercato italiano + internazionale** |
| **Scalabilità** | Lineare (assumere persone) | Limitata da bandwidth editor | Per singolo autore | Variabile | **Industriale (10× capacity)** |
| **Compliance / GDPR / IP** | OK | Rischio leak prompt | Variabile, spesso US-based | OK | **GDPR-first, hosting EU, IP protection** |
| **Integrazione workflow editoriale** | Default | Frammentata | Standalone | Sì se sviluppato bene | **Sì, output compatibile schede standard** |
| **Time to value per editore** | N/A (già usa) | Settimane (training editor) | Mesi (cambio workflow) | 6-18 mesi sviluppo | **PoC operativo in 90 giorni** |
| **Specializzazione settoriale** | N/A | Zero | Bassa (per autori, non per publisher) | Possibile | **Massima, costruita per publisher trade** |
| **Calibrazione sul catalogo dell'editore** | Implicita nella testa del lettore, non trasferibile | No (nessuna memoria del catalogo) | No | Possibile, ma va costruita da zero | **Sì: successi *e* flop dichiarati della casa, in perimetro riservato** |
| **Verifica di provenienza AI** | Intuito del lettore | No | Parziale, orientata all'autore | Possibile | **Segnale con livello di confidenza, in roadmap** |
| **Verificabilità del giudizio** | Sì (il lettore cita il testo) | No (nessun ancoraggio, collane inventate) | No | Da costruire | **Sì: citazione letterale obbligatoria + collana verificata sul catalogo reale** |

---

## La riga che risponde a «abbiamo già i nostri sistemi»

> **Kalamos è un sistema di intelligenza, non un sistema di registrazione.**

È la risposta migliore all'obiezione più probabile di una casa strutturata. Klopotek, Ingenta, Firebrand, Consonance e i sistemi interni registrano **cosa** è successo: contratti, diritti, royalty, ONIX, ordini. Kalamos spiega **perché** e cosa guardare adesso. Non li sostituiamo: ci stiamo sopra, o accanto.

Detta così vale doppio, perché rende il PoC meno invasivo: non chiediamo a nessuno di cambiare il sistema su cui lavora.

Lo stesso vale verso i concorrenti più vicini: Schilling Editorial Desk muove il lavoro fra le persone, noi lo ordiniamo per pertinenza al catalogo; Storywise fa submission intelligence, noi puntiamo alla memoria delle decisioni. La mappa verificata è in `07-research/competitors.md`.

---

## I due differenziatori che maturano nel tempo

Le voci della tabella si possono copiare in sei mesi. Queste due no, perché non sono funzionalità: sono asset che si accumulano.

### 1. Calibrazione sul catalogo della casa — inclusi i flop

Ogni editore carica, in un perimetro riservato, i titoli pubblicati che considera riusciti **e** quelli andati male commercialmente. I primi insegnano al sistema l'identità della casa; i secondi gli impediscono di ripresentare all'editor il tipo di libro che ha già deluso. È la parte del lavoro che nessun tool generico può fare: **richiede che l'editore ci dica cosa non ha funzionato**, e lo dice solo a chi si fida.

Perché è difendibile:

- **È il dato più riservato che un editore possiede.** Un flop dichiarato non esce dal perimetro concordato, non è mai visibile ad altre case, non alimenta modelli condivisi. Il vincolo di confidenzialità non è un costo: è la ragione per cui il dato ci viene affidato.
- **È l'unico segnale negativo affidabile.** Le decisioni di rifiuto raccontano cosa la casa non vuole; le vendite raccontano cosa il mercato non ha voluto. Sono cose diverse, e servono entrambe.
- **Si accumula.** Mese dopo mese il corpus di calibrazione di quella casa diventa più preciso. Un competitor che arriva dopo non parte da zero: parte da meno di zero, perché deve anche convincere l'editore a rifare il lavoro.

Il ponte col PoC è già costruito: l'archivio retrospettivo di manoscritti già valutati **è** una calibrazione su esempi reali, e il feedback dell'editor (Concordo / Non concordo) è già nella demo. Non chiediamo un atto di fede, chiediamo di continuare a fare ciò che il PoC fa già.

### 2. Verifica di provenienza AI — il valutatore che difende il lavoro umano

Il mercato sta cambiando sotto i piedi degli editori: nel 2025 Kobo ha rifiutato circa il **45% dei libri autopubblicati ricevuti** per sospetta generazione IA di bassa qualità (fonte: Livres Hebdo / ActuaLitté, dichiarazioni del CEO Michael Tamblyn). Le grandi case francesi dichiarano di rifiutare i libri scritti con IA, e alcuni passano comunque il filtro.

Per un editore un pre-screening di provenienza è una garanzia di serietà. Per noi è la chiusura del posizionamento: **Kalamos è un valutatore che difende il lavoro umano, non un generatore.** Chi ci confonde con un tool di scrittura assistita smette di farlo davanti a questa funzione.

Vincolo di onestà, da rispettare in ogni materiale: i rilevatori IA hanno falsi positivi significativi. Il segnale va presentato come **indicatore con livello di confidenza**, mai come verdetto automatico, e la decisione resta all'editor. Al panel promettiamo il segnale calibrato e il workflow di verifica, non la detection certa. È in roadmap, non nella demo: nessun rilevatore finto.

---

## Le obiezioni che riceveremo (e le risposte)

### Obiezione 1: "Lo facciamo già con ChatGPT"
**Risposta**: "ChatGPT richiede che un editor scriva un prompt sofisticato ogni volta e interpreti un output non strutturato. Su 200 manoscritti, sono 200 sessioni manuali. Kalamos è automazione end-to-end con output strutturato compatibile con il vostro template di scheda esistente. La differenza è tra un dizionario e un traduttore."

### Obiezione 2: "Lo possiamo sviluppare in casa con AWS"
**Risposta**: "Sì, in 12-18 mesi e con un team dedicato di 3-5 persone tra ML engineer, editor advisor e PM. Costo realistico: €500K-1M per il primo deploy. Kalamos lo offre operativo in 90 giorni con un team che parla la vostra lingua. E se decidete di internalizzare poi, possiamo discutere licensing o acqui-hire."

### Obiezione 3: "Esistono già tool come Spines, Sudowrite, etc."
**Risposta**: "Quelli sono costruiti per autori indipendenti, non per publisher trade. Trattano un manoscritto alla volta, non un flusso. Non capiscono il concetto di collana. Sono in inglese e orientati al mercato US. Non hanno mai parlato con un editor di Einaudi."

### Obiezione 4: "Il vostro modello sostituirà gli editor"
**Risposta**: "Esplicitamente no. Kalamos non decide cosa pubblicare. Produce input più ricco e veloce all'editor, che decide come prima. La nostra promessa: invece di leggere 50 manoscritti l'anno in profondità e ignorarne 950, l'editor può fare triage informato su tutti i 1000 e dedicare lettura profonda ai 100 più promettenti. Più capacità decisionale, non meno potere editoriale."

### Obiezione 5: "Avete davvero il team per costruirlo?"
**Risposta**: "Valerio ha 8 anni di AI engineering applicato, con 4 ventures consegnate. Ilaria è poetessa pubblicata e insegnante: capisce dall'interno cosa rende un testo letterariamente solido. Stiamo ingaggiando un advisor editoriale di settore prima del programma. Per gli step tecnici complessi di scaling lavoreremo con i partner PLAI — AWS e Startupbootcamp sono esattamente i partner che servono."

### Obiezione 6: "I rilevatori di testo IA non funzionano"

**Risposta**: "Non del tutto, ed è per questo che non promettiamo un verdetto. Restituiamo un indicatore con livello di confidenza e i passaggi che l'hanno determinato, e l'editor decide se approfondire. Un falso positivo che chiude la porta a un autore vero è un danno peggiore del problema che stiamo risolvendo: il sistema è tarato per segnalare, non per scartare. Il valore, in un mercato dove Kobo ha rifiutato il 45% degli autopubblicati ricevuti nel 2025, è avere il segnale documentato al momento giusto del flusso."

### Obiezione 7: "Perché dovremmo darvi i nostri dati di vendita, compresi i fallimenti?"

**Risposta**: "Perché è l'unico modo per farvi risparmiare le letture che avete già pagato una volta. I flop dichiarati restano nel perimetro concordato con voi: non escono, non sono visibili ad altre case, non alimentano modelli condivisi. E potete iniziare senza: il PoC parte dall'archivio delle decisioni storiche, che avete già. La calibrazione sulle vendite è il passo due, quando avrete visto come trattiamo il passo uno."

---

## Il claim difendibile più forte

Sintetizzando, **il claim che dobbiamo difendere a costo della vita** è:

> Kalamos è l'unica AI editoriale italiana costruita da un team con autorità verticale dimostrabile (poetessa pubblicata + filologo + AI engineer), che produce output compatibile con i workflow esistenti dei publisher trade, che supporta lo scoring per collana specifica, e che può essere operativa in 90 giorni in una divisione Mondadori reale.

Ogni singolo elemento di questo claim è verificabile oggi. **Nessuno di essi, però, è ancora un fossato**: il meccanismo di difendibilità è progettato, non attivato. Dirlo per primi vale più che rivendicarlo — e chi valuta lo verifica in due domande.

**Il fossato si scava lavorando, e il PoC è la prima palata.** Lo scoring per collana è ciò che ci fa entrare; la calibrazione sul catalogo della casa — successi e flop, in perimetro riservato — è ciò che renderebbe doloroso sostituirci dopo dodici mesi. Al condizionale, finché quel corpus non esiste: oggi non abbiamo un vantaggio sui dati, abbiamo il meccanismo che può produrlo. Il primo è una funzionalità, il secondo è un asset che appartiene alla relazione e non si trasferisce a un competitor.

Il progetto nasce sull'editoria italiana ma la struttura non è italiana: i profili di collana sono configurabili in qualsiasi lingua, e il problema — troppi manoscritti, troppo poco tempo di lettura senior — è identico in Francia, Spagna e Germania. La presenza europea del gruppo è la via naturale di espansione dopo il primo caso d'uso validato, non un'ambizione da slide.

---

## Watch list — minacce che dobbiamo monitorare

| Minaccia | Probabilità | Azione |
|----------|-------------|--------|
| Startup italiana competitor su stesso verticale | Bassa oggi | Monitorare LinkedIn, Crunchbase, Dealroom mensile |
| Spines / Sudowrite lanciano modulo per publisher | Media | Distinguersi su localizzazione IT + workflow trade |
| OpenAI lancia "Publishing GPT" o agenti specializzati | Bassa-media | Difenderci con verticalità + relazioni clienti |
| Mondadori internalizza AI publishing con AWS | Media nel medio termine | Diventare partner indispensabile prima → uscita possibile via acquisition |
| Editori europei (es. Bertelsmann) lanciano tool simili | Bassa | Vantaggio first-mover in IT, espansione UE poi |
| Un rilevatore IA sbaglia e l'editore perde fiducia nell'intero sistema | Media se mal presentato | Mai un verdetto: indicatore con confidenza, passaggi a sostegno, decisione all'editor. È la ragione per cui l'AI-check resta in roadmap finché non è calibrato |
| Ondata di manoscritti generati con IA (Kobo: ~45% rifiutati nel 2025) | **In corso** | È vento a favore, non minaccia: aumenta il volume in ingresso e rende urgente il triage. Da usare come dato di apertura, non come allarme |

---

## Owner del documento

Da rivedere mensilmente: il panorama AI publishing si muove velocemente. Aggiungere nuove voci alla tabella comparativa appena emergono.
