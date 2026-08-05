# Briefing per la call PLAI

> Il documento da leggere trenta minuti prima. Tutto il resto è approfondimento.
> Aggiornato: 5 agosto 2026 — verificato sulla demo online, non a memoria.

---

## 0. Da fare stasera (15 minuti, in quest'ordine)

- [ ] **Genera le schede reali.** Con il server attivo e `ANTHROPIC_API_KEY` impostata: `node scripts/generate-schede.mjs`. Senza questo passaggio la coda in redazione mostra **stime euristiche offline etichettate**, non inferenza vera. Se un panelist chiede "questa è AI?" la risposta onesta oggi è "questa coda no, è una stima di superficie; l'AI la vedi ora" — recuperabile, ma è meglio non doverla dare.
- [ ] **Svuota la sessione del browser.** In Redazione, sezione "Analizzati in questa sessione", clicca **svuota**. Le analisi di prova restano in `localStorage` e fanno dire alla card KPI un numero diverso dall'intestazione della pagina: sul proiettore è un invito a chiedere "quindi quanti sono?". Dopo, ricarica e controlla che la card dica **4**.
- [ ] Apri `kalamos-ai.vercel.app`, entra in **Sperling & Kupfer**, lascia il tab aperto.
- [ ] Secondo tab su `kalamos-ai.vercel.app/redazione?casa=einaudi` — è il tuo colpo, non cercarlo dal vivo.
- [ ] Un `.txt` di prova sul desktop — **non un PDF**: sui PDF il controllo della citazione non può confermare nulla (vedi Momento 3).
- [ ] Un `Ctrl+P` su una scheda, solo per guardare l'impaginazione del PDF esportato.
- [ ] Apri la coda dal telefono e fai gli screenshot: coda Sperling, coda Einaudi, una scheda.
- [ ] Hotspot del telefono pronto.

---

## 1. I primi 90 secondi

Non partire dal prodotto. Parti dal gesto quotidiano di chi ti ascolta.

> "Un editor di Sperling apre la posta il lunedì mattina e trova quaranta manoscritti. Sa già che trentotto non sono per la sua lista, ma per saperlo davvero deve leggerli — e leggere costa giorni-persona di lettori senior. Così due cose succedono insieme: l'autore aspetta mesi una risposta, e ogni tanto il manoscritto giusto si perde nel rumore.
>
> Kalamos legge quei quaranta manoscritti prima di lui e gli consegna la coda già ordinata: per ciascuno una scheda di lettura, la collana del *suo* catalogo a cui il testo somiglia di più, e un passaggio citato dal testo a sostegno del giudizio. Non decide niente. Toglie l'attesa, non il giudizio.
>
> Ve lo mostro su quattro manoscritti veri, in due minuti."

**Perché funziona**: nomini una divisione reale, un gesto reale, e il valore è "toglie l'attesa" — non "rivoluziona l'editoria".

---

## 2. La demo — cinque minuti, tre momenti

Lo script click-per-click è in `06-product/demo-script.md`. Qui la struttura da tenere in testa.

### Momento 1 — La scrivania (60 secondi)
Sei dentro **Sperling & Kupfer**. Quattro manoscritti in arrivo, con provenienza (email, portale proposte, agenzia) e data. Ognuno ha una collana suggerita del catalogo reale di Sperling e una percentuale di fit.

> "Questa non è la vista di un autore che carica il suo romanzo. È la scrivania di una redazione: i manoscritti arrivano, Kalamos li ha già letti."

### Momento 2 — Il colpo (90 secondi)
Cambia redazione: da Sperling a **Einaudi**. **La coda si ribalta.**

| Manoscritto | Sperling & Kupfer | Einaudi |
|---|---|---|
| *Il giardino di vetro* (letterario) | **27% — Scarta** | **90% — Prioritario** (Stile Libero) |
| *La stagione delle locuste* (noir civile) | 31% — Scarta | **95% — Prioritario** (Stile Libero) |
| *Sette giorni a Portofino* (feel-good) | **73% — Seconda lettura** (Pandora) | 35% — Seconda lettura (Supercoralli) |
| *Le ombre del passato* (giallo con cliché) | 42% — Scarta | 32% — Scarta |

> "Lo stesso testo, due redazioni, due destini opposti. Il fit non misura se un libro è bello: misura il rapporto fra quel testo e quel catalogo. È la differenza fra un giudizio letterario e una decisione editoriale."

Due dettagli da far notare, se c'è spazio:
- *Le ombre del passato* va male **ovunque**: la prosa è piena di cliché. Prosa debole = scarta in ogni casa. Il sistema distingue "non è per voi" da "non è buono".
- Da Einaudi il feel-good non finisce in Stile Libero ma in **Supercoralli**: la collana cambia dentro la stessa casa.

### Momento 3 — Il giudizio verificabile (90 secondi)
Apri una scheda. Scorri fino a **Passaggio a sostegno**.

> ⚠️ **Usa un testo incollato o un `.txt`, mai un PDF.** Sui PDF l'applicazione non estrae il testo (lo legge il modello direttamente), quindi la citazione non è confrontabile e a schermo compare un messaggio che lo dice — non la conferma. Se pronunci "il sistema controlla che quella frase esista" mentre lo schermo dice il contrario, perdi il momento migliore che hai.

> "Ogni giudizio è ancorato a una citazione letterale del manoscritto, e il sistema controlla che quella frase esista davvero nel testo caricato. E la collana proposta viene verificata contro il catalogo reale dell'editore: se il modello ne inventa una, il codice la scarta prima che arrivi all'editor.
>
> Questo pezzo l'abbiamo costruito dopo un errore vero: in una versione precedente il modello aveva attribuito a un editore una collana che non esiste. In redazione basta quello per chiudere la conversazione."

**Questo è il momento che ti distingue dalle altre application.** Non stai dicendo "la nostra AI è brava". Stai dicendo "so dove sbaglia e l'ho messa in gabbia".

### Chiusura (30 secondi)
Aggiungi **un** manoscritto alla coda dal vivo, se la rete regge: circa trenta secondi. Se non regge, non insistere: hai già mostrato tutto.

**Non fare il batch dal vivo**: i file girano in sequenza, tre `.txt` sono un minuto e quarantadue secondi di schermo fermo. Se vuoi mostrarlo, caricalo prima della call e apri la Redazione a cose fatte.

---

## 3. I numeri che devi sapere a memoria

| Cosa | Numero | Come è ottenuto |
|---|---|---|
| Case editrici / collane nella demo | **9 / 35** | Reali, verificate sui cataloghi pubblici |
| Costo API per scheda | **$0,03–0,06** (dollari: il listino è in USD e la demo stampa `~$0.06`) | Calcolato sui prompt reali, listino pubblico Anthropic |
| Costo senza tetto sull'estratto | ~$0,39 | Stessa base — il tetto vale ~7× |
| Tempo per scheda | **~30 secondi** (media misurata oggi: **28s**) | Misurato in produzione su 6 analisi: 24-30s |
| Modello in produzione | `claude-opus-4-8` | Se te lo chiedono: il modello sta dietro una variabile d'ambiente, cambiarlo è una riga |
| Riferimento di settore per una scheda | €150–500 e 5–15 giorni | **Stima di settore, da validare in Fase 1 del PoC** |
| Piloti in corso / ricavi | **zero** | Detto per primo, non per ultimo |
| PoC proposto | 90 giorni, Sperling & Kupfer, ~300 manoscritti retrospettivi + 30-50 live | `03-poc-proposal/90-day-plan.md` |
| Manoscritti rifiutati da Kobo nel 2025 per sospetta IA | ~45% | Livres Hebdo / ActuaLitté, dichiarazioni del CEO Tamblyn |

**La regola**: se un numero non è in questa tabella, non pronunciarlo. Di' "non ce l'ho, te lo mando domani".

---

## 4. L'ask, in una frase

> "Chiediamo il percorso early-stage — €100K per circa il 7% — e, subito dopo, la porta su una divisione per il PoC. Il PoC è già disegnato: novanta giorni su Sperling & Kupfer, validato sull'archivio di manoscritti che hanno già giudicato, quindi senza chiedere ai loro lettori di rileggere nulla. Quello che non possiamo darci da soli è l'accesso: è esattamente ciò che PLAI dà."

---

## 5. Le otto domande che possono farti male

**1. "Questa è AI o è una demo finta?"**
> "Il motore è Claude, con output vincolato a uno schema e validato. Le schede che vedete sono generate dal vivo [*se hai lanciato lo script*] / La coda che vedete usa una stima offline etichettata come tale, perché la demo deve funzionare anche senza chiave; l'analisi vera la faccio adesso su un manoscritto che scegliete voi."

**2. "Avete clienti?"**
> "No. Nessun pilota, nessun ricavo, nessuna misura di concordanza con un editor reale. È esattamente il buco che il PoC deve chiudere, ed è il motivo per cui siamo qui invece che a chiedere un round."

**3. "Quanto è difendibile? È prompt engineering."**
> "In parte sì, e non me ne nascondo. Il codice si replica in settimane. Quello che non si replica è la calibrazione sul catalogo di una casa — i titoli riusciti *e* i flop dichiarati, in perimetro riservato — perché richiede che l'editore ci dica cosa non ha funzionato, e lo dice solo a chi si fida. Quel corpus cresce ogni mese e appartiene alla relazione, non al software."

**4. "Ci sono già Sudowrite, Spines, ProWritingAid."**
> "Sono costruiti per autori indipendenti che vogliono pubblicare, non per editori che devono scegliere. Nessuno di loro sa cosa sia una collana. Noi partiamo dal catalogo dell'editore, non dal testo dell'autore."

**5. "Mondadori se lo fa in casa con AWS."**
> "Può farlo, in dodici-diciotto mesi con un team dedicato. Noi siamo operativi in novanta giorni. E se poi volete internalizzare, parliamone: licenza o acquisizione sono esiti che ci stanno bene, non sconfitte."

**6. "Il modello allucina. Come vi fidiamo?"**
> "Non chiediamo di fidarvi, chiediamo di verificare. Ogni giudizio cita un passaggio letterale del manoscritto e il sistema controlla che quella frase esista nel testo. La collana proposta viene confrontata con il catalogo reale: se non esiste, il codice la scarta prima che vi arrivi. Sono controlli deterministici, non un secondo modello che giudica il primo."

**7. "Sostituisce i nostri editor."**
> "No, e non è una cortesia: è il confine su cui abbiamo costruito il prodotto. Kalamos non scrive e non decide. Oggi un editor legge davvero una frazione di ciò che riceve; con noi fa triage informato su tutto e usa la lettura profonda dove serve. Più capacità di decidere, non meno potere."

**8. "Siete in due, di cui uno part-time."**
> "Sì, ed è il nostro limite più serio. Sto completando l'uscita da Smart Content per essere full-time. Il team è piccolo ma la combinazione è rara: sviluppo software e filologia da una parte, una poetessa pubblicata dall'altra. Il primo hire post-accelerazione è un advisor editoriale con un nome riconoscibile nel settore."

Le altre venticinque sono in `q-and-a-prep.md`.

---

## 6. Cosa non dire, mai

- ❌ **"Siamo in produzione"** — è una demo pubblica funzionante, il prodotto è pre-pilota. La differenza si nota subito e costa la credibilità di tutto il resto.
- ❌ **"Usiamo RAG con database vettoriale"** — è progettato, non costruito. Se te lo chiedono: *"Oggi il catalogo è strutturato e passato al modello; il retrieval vettoriale è il passo successivo, serve a restringere il campo e a tagliare il costo."*
- ❌ **"Riduciamo il backlog del 90%"** — non l'hai misurato su nessuna redazione. Di' cosa misuri e come.
- ❌ **Numeri di traction inventati.** I panelist controllano dopo, e PLAI riceve mille candidature l'anno: hanno visto tutti i trucchi.
- ❌ **"Rivoluzionare", "disruptive", "game-changer".** Stai parlando con un editore, non con un fondo americano.
- ❌ **Parlare di PONYX, ProntoSito, Helianta** se non ti chiedono esplicitamente il tuo percorso. PLAI investe in Kalamos, non in un portafoglio.

---

## 7. Se qualcosa va storto

| Se… | Fai così |
|---|---|
| La rete cade | Passi agli screenshot nel telefono. Li hai preparati stasera. |
| L'analisi dal vivo va in timeout | *"Ci sta mettendo troppo, la rete non aiuta — la scheda che vedete è generata dallo stesso flusso, andiamo avanti."* Non dare spiegazioni tecniche che non puoi verificare: oggi in produzione le analisi tornano in 24-30 secondi, quindi la scusa del "limite del piano gratuito" sarebbe falsa. |
| Ti chiedono un numero che non hai | *"Non ce l'ho e non voglio inventarlo. Te lo mando entro domani."* Poi mandalo davvero. |
| Ti contestano un dato | Non difenderlo. *"Può essere, verifico e ti faccio sapere."* Vale più di una discussione vinta. |
| Vai lungo | Salta il Momento 3 e vai alla chiusura. Il ribaltamento della coda è la cosa che devono ricordare. |

---

## 8. La frase da lasciare per ultima

> "Non stiamo costruendo un'AI che scrive libri. Ne stanno nascendo troppe, e agli editori stanno creando un problema, non risolvendolo. Stiamo costruendo lo strumento che aiuta un editore a trovare, in mezzo a quel rumore, le poche cose che valgono la sua attenzione. Il giudizio resta suo. Noi togliamo l'attesa."
