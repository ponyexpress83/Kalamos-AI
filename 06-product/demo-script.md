# Demo Script — Kalamos AI

> Script click-per-click sulla demo reale (`kalamos-ai.vercel.app`).
> Durata: 4-5 minuti in versione piena, 90 secondi in versione compressa.
> Provare ad alta voce almeno due volte prima della call.

---

## Prima di iniziare

- [ ] `node scripts/generate-schede.mjs` eseguito (server attivo + `ANTHROPIC_API_KEY`): senza, la coda mostra stime euristiche etichettate, non inferenza reale.
- [ ] Tab 1 aperto su `kalamos-ai.vercel.app/redazione?casa=sperling-kupfer`
- [ ] Tab 2 aperto su `kalamos-ai.vercel.app/redazione?casa=einaudi` — il cambio di redazione è il momento decisivo, non cercarlo dal vivo
- [ ] Un `.txt` sul desktop per l'analisi in diretta
- [ ] Screenshot delle tre schermate nel telefono, come rete di sicurezza

---

## Versione piena (4-5 minuti)

### [0:00–0:30] Apertura — parla del gesto, non del prodotto

*(schermo non ancora condiviso)*

> "Un editor di Sperling apre la posta il lunedì e trova quaranta manoscritti. Sa già che trentotto non sono per la sua lista, ma per saperlo davvero deve leggerli, e leggere costa giorni-persona di lettori senior. Il risultato è che l'autore aspetta mesi e ogni tanto il manoscritto giusto si perde nel rumore.
>
> Vi mostro la scrivania di quell'editor con Kalamos acceso."

*(condividi lo schermo — Tab 1)*

### [0:30–1:30] La scrivania di redazione

> "Questa è **Sperling & Kupfer**. Non è la vista di un autore che carica il suo romanzo: è la coda dei manoscritti in arrivo, con la provenienza — email, portale proposte, agenzia — e la data. Kalamos li ha già letti tutti."

*(indica una riga, senza cliccare)*

> "Per ciascuno propone una collana **del catalogo di Sperling** e una percentuale di fit. In testa c'è *Sette giorni a Portofino*, feel-good, 73% su **Pandora**. In fondo un romanzo letterario al 27%, con raccomandazione di scarto."

*(pausa di due secondi — lascia leggere la tabella)*

### [1:30–2:30] Il ribaltamento — il momento che devono ricordare

*(passa al Tab 2)*

> "Adesso cambio redazione. Stessi quattro manoscritti, stessa giornata. Questa è **Einaudi**."

*(silenzio per due secondi, lascia che leggano)*

> "Il romanzo letterario che da Sperling era un 27% da scartare, qui è **90%, prioritario, Einaudi Stile Libero**. Il noir passa da 31 a **95%**. E il feel-good che a Sperling era in testa scende a 35, e per giunta cambia collana: non finisce in Stile Libero ma in Supercoralli.
>
> Il fit non misura se un libro è bello. Misura il rapporto fra quel testo e quel catalogo. È la differenza fra un giudizio letterario e una decisione editoriale."

*(se hai tempo, aggiungi)*

> "Un solo manoscritto va male in entrambe le case: il giallo pieno di cliché. Prosa debole significa scarta ovunque. Il sistema distingue *non è per voi* da *non è buono*, e sono due informazioni diverse per un editor."

### [2:30–3:45] La scheda — il giudizio verificabile

*(clicca su una riga — apri la scheda)*

> "Questa è la scheda di lettura: sintesi, voce e struttura, voto di prosa, target, comparabili, punti di forza e criticità."

*(scorri fino a **Passaggio a sostegno**)*

> "E qui c'è la parte a cui tengo di più. Ogni giudizio è ancorato a una citazione **letterale** del manoscritto, e il sistema verifica che quella frase esista davvero nel testo caricato. La collana proposta viene confrontata con il catalogo reale dell'editore: se il modello se ne inventa una, il codice la scarta prima che arrivi all'editor.
>
> Questo pezzo l'abbiamo costruito dopo un errore vero: in una versione precedente il modello aveva attribuito a un editore una collana che non esiste. In redazione basta quello per chiudere la conversazione. Nessun prompt lo impedisce in modo affidabile — una lista di controllo sì."

### [3:45–4:30] Analisi dal vivo (se la rete regge)

*(torna in redazione → "+ Aggiungi manoscritto" → carica il `.txt`)*

> "Faccio l'analisi adesso, così vedete che non è un video. Trenta secondi circa."

*(mentre gira)*

> "In alto la redazione mostra i KPI misurati: tempo per scheda e costo API per scheda, calcolato sui token effettivi. Siamo intorno a tre-sei centesimi. Il riferimento di settore per una scheda professionale è 150-500 euro e 5-15 giorni — è una stima di settore, da validare sui dati reali dell'editore, ed è il primo numero che il PoC deve misurare davvero."

### [4:30–5:00] Chiusura

> "Kalamos non scrive il libro e non decide cosa pubblicare. Legge prima dell'editor e gli consegna la coda ordinata, con il perché e la citazione a sostegno. Toglie l'attesa, non il giudizio."

*(chiudi la condivisione)*

---

## Versione compressa (90 secondi)

Se hai poco tempo, tieni solo questo:

1. **[0:00–0:20]** L'editor, i quaranta manoscritti del lunedì, i giorni-persona.
2. **[0:20–0:50]** Tab Sperling: la coda ordinata con collana e fit.
3. **[0:50–1:20]** Tab Einaudi: il ribaltamento. *"Lo stesso testo, due redazioni, due destini opposti."*
4. **[1:20–1:30]** *"Il giudizio è verificabile: ogni scheda cita il testo, e la collana è controllata contro il catalogo reale."*

Il ribaltamento della coda è l'unica cosa che devono ricordare. Tutto il resto è dettaglio.

---

## Numeri della demo — verificati il 5 agosto 2026

| Manoscritto | Sperling & Kupfer | Einaudi | Il Battello a Vapore | Ladolfi |
|---|---|---|---|---|
| *Il giardino di vetro* — letterario | 27% Scarta | **90% Prioritario** (Stile Libero) | 53% Seconda lettura (Azzurra) | 25% Scarta |
| *La stagione delle locuste* — noir civile | 31% Scarta | **95% Prioritario** (Stile Libero) | 37% Seconda lettura (Arancio) | 12% Scarta |
| *Sette giorni a Portofino* — feel-good | **73% Seconda lettura** (Pandora) | 35% Seconda lettura (Supercoralli) | 44% Seconda lettura (Azzurra) | 8% Scarta |
| *Le ombre del passato* — giallo con cliché | 42% Scarta | 32% Scarta | 22% Scarta | 8% Scarta |

> Valori della modalità offline etichettata (senza chiave API). Con le schede reali generate, i numeri cambiano: **rileggi la tabella dopo aver lanciato `generate-schede.mjs`** e non citare a memoria quelli vecchi.

Nota per te: su Sperling tutti e quattro finiscono su *Pandora*, perché le altre collane sono Saggi, Economia e Varia. Non è un difetto — su Sperling il segnale è la percentuale, non la varietà di collana. La varietà si vede su Einaudi e sul Battello.

---

## Cose da NON fare durante la demo

- ❌ Mostrare console, codice, DevTools
- ❌ Dire "è ancora un MVP, ci sono dei bug"
- ❌ Scorrere veloce: due secondi fermi su ogni vista che conta
- ❌ Aprire più di due schede di lettura (una fatta bene basta)
- ❌ Chiamare "clienti" gli editori nel selettore: sono cataloghi pubblici modellati, non partner
- ❌ Presentare le stime offline come inferenza AI: sono etichettate, e l'etichetta è un punto a favore, non da nascondere

---

## Se la demo salta

1. **Screenshot nel telefono** — le tre schermate: coda Sperling, coda Einaudi, scheda con il passaggio citato.
2. **La tabella qui sopra**, letta ad alta voce: il ribaltamento si capisce anche senza schermo.
3. Non scusarti più di una volta. *"Ve la mando appena chiudiamo"* e vai avanti col discorso.
