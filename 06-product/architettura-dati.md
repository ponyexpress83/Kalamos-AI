# Architettura dati: account per casa editrice e casella proposte

*Fase 3 della roadmap, più l'ingestione dalla posta. 16 ottobre 2026.*

> **Fermata.** La roadmap prevede che la fase 3 si progetti e poi si fermi per una decisione del fondatore prima di scrivere codice. Questo documento è il progetto. Le cinque decisioni sono in fondo.

## Perché serve

Oggi tutto vive nel browser di chi usa Kalamos: due editor della stessa casa non vedono la stessa coda, e chiudere il browser significa perdere il lavoro. È anche il motivo per cui il DPA (`10-legale/dpa-pilota.md`, Allegato C) vieta di avviare un pilota prima che esistano account personali, isolamento per casa e un database cifrato.

## Cosa deve fare, e cosa no

**Deve.** Ogni casa editrice ha il suo spazio, i suoi utenti, le sue collane. I manoscritti entrano da soli dalla casella proposte o si caricano a mano. L'analisi gira in background e la coda si riempie già analizzata. Le decisioni e il loro perché restano, interrogabili ed esportabili.

**Non deve** (CLAUDE.md §2 e §3). Niente account per gli autori. Nessuna risposta automatica agli autori: l'ingestione legge, non scrive. Niente onboarding self-service: una casa nuova la inseriamo noi, con uno script, come prevede la roadmap. Nessuna modifica al motore di giudizio: la route di analisi si chiama com'è oggi.

## Il modello dei dati

Ogni tabella con dati di una casa porta `organization_id`, e il database stesso impedisce di leggere righe di un'altra casa (row level security). L'isolamento non dipende da un `WHERE` dimenticato nel codice.

| Entità | Cosa rappresenta | Campi principali |
|---|---|---|
| `organization` | La casa editrice cliente | nome, stato del pilota, date |
| `imprint` | Marchio della casa (per i gruppi) | organization, nome |
| `collection` | Collana del catalogo | imprint, nome, profilo, descrizione: il contenuto di `config/publishers.ts`, migrato senza toccarlo |
| `user` | Persona della redazione | organization, email, ruolo (`admin`, `editor`, `lettore`) |
| `opportunity` | Una proposta arrivata | organization, provenienza (tassonomia chiusa della fase 4), lingua, mittente, arrivata il |
| `manuscript` | Il testo di una proposta | opportunity, file in archivio, impronta per i duplicati, parole, data di cancellazione prevista |
| `analysis` | Una scheda | manuscript, collane valutate, scheda JSON, modello, token, costo, tempo, esito dei controlli, stato del lavoro |
| `decision` | La decisione della redazione | analysis, utente, verdetto, ragioni (vocabolario chiuso della fase 5), collana giusta se diversa, nota, secondi impiegati |
| `event` | Registro di chi ha fatto cosa | organization, utente, azione, oggetto, quando |

`decision` è il dato che rende Kalamos «memoria» e che misura la concordanza: per questo è progettato fin d'ora con le ragioni strutturate, anche se l'interfaccia della fase 5 arriverà dopo.

## Tre scelte tecniche

### 1. Database, accessi, archivio file

| | **A. Supabase** | **B. Neon + Auth.js + Vercel Blob** |
|---|---|---|
| Pezzi da mantenere | Uno: Postgres, accessi con link via mail, archivio file, row level security | Tre fornitori e una libreria di autenticazione da integrare |
| Isolamento per casa | Row level security nativa, legata all'utente autenticato | Row level security in Postgres, ma il legame con l'utente va costruito |
| Regione UE | Selezionabile alla creazione del progetto | Selezionabile per database e archivio |
| Uscita | È Postgres: i dati si esportano con gli strumenti standard | Idem |
| Costo indicativo | Piano gratuito per lo sviluppo; piano a pagamento intorno a $25 al mese `[DA VERIFICARE sul listino]` | Piani gratuiti generosi, poi a consumo `[DA VERIFICARE]` |

**Raccomandazione: A, Supabase.** Il criterio decisivo è §7 di CLAUDE.md: c'è un solo sviluppatore, e un fornitore solo per dati, accessi e file costa meno manutenzione di tre. Il piano gratuito non va bene per un pilota: sospende i progetti inattivi e non ha copie di sicurezza adeguate `[DA VERIFICARE]`.

### 2. La casella proposte

Gli autori continuano a scrivere a `proposte@casaeditrice.it`. La casa imposta un inoltro automatico verso un indirizzo dedicato, per esempio `einaudi@in.kalamos.studio`. Il fornitore di posta in arrivo riceve il messaggio e lo passa a Kalamos. Kalamos verifica la firma del fornitore, scarta i duplicati (Message-ID e impronta del testo), salva testo e allegati e mette il manoscritto in coda.

**Il vincolo tecnico da sapere.** Una funzione Vercel accetta al massimo 4,5 MB per richiesta. Un messaggio con un PDF da 5 MB, se il fornitore lo spedisce intero dentro la notifica, non passa. Serve un fornitore che conservi gli allegati e mandi solo i riferimenti da scaricare, oppure un passaggio intermedio che li metta in archivio prima.

| Opzione | Come gestisce gli allegati | Note |
|---|---|---|
| Fornitore di posta in arrivo con allegati conservati (per esempio Mailgun; verificare se Resend lo fa già) | Notifica leggera con link agli allegati | Il più semplice; se Resend lo offre, un fornitore in meno `[DA VERIFICARE]` |
| Cloudflare Email Routing con un Worker | Il Worker salva gli allegati e chiama Kalamos con i riferimenti | Più controllo, un pezzo di codice in più da mantenere |
| Lettura diretta della casella della casa (API Gmail o Microsoft) | Accesso alla casella vera | Richiede permessi ampi sulla posta della casa: da evitare nel pilota |

**Formati.** Oggi Kalamos legge `.txt` e PDF. I manoscritti arrivano spesso in `.docx`: serve la conversione in testo, per esempio con la libreria `mammoth`. Senza, metà della casella resta fuori.

### 3. L'analisi in background

Oggi l'analisi è una richiesta sincrona con un limite di 60 secondi. Con la posta in arrivo diventa un lavoro in coda: una riga in `analysis` con stato `in_coda`, un esecutore che la prende, chiama la route di analisi esistente e registra il risultato. Se fallisce, ritenta, e dopo tre tentativi la segna come errore visibile, senza ripiegare sull'euristica: è la fase 2.

L'esecutore può essere un cron di Vercel (la frequenza al minuto richiede il piano Pro) oppure un servizio di code come Upstash QStash `[DA VERIFICARE limiti e prezzi]`. Con Supabase c'è anche la via interna, con le sue funzioni.

## Quanto costa, a 500 manoscritti al mese

Tutti i numeri sono **calcolati**, non misurati.

| Voce | Calcolo | Ordine di grandezza |
|---|---|---|
| Analisi su Opus | Tetto di $0,19 a scheda sul percorso testo (`06-product/limiti-e-costi.md`) × 500 | al massimo $95 al mese; il reale è sotto, perché il tetto assume l'output massimo |
| Testo conservato | Un romanzo di 90.000 parole è circa 550 KB di testo × 500 | circa 275 MB al mese, se si conserva il testo intero |
| PDF originali | 1-3 MB l'uno × 500 | 0,5-1,5 GB al mese: conviene conservare solo il testo estratto e cancellare l'originale |
| Schede e decisioni | circa 6 KB a scheda × 500 | trascurabile |
| Database e archivio | Piano a pagamento del fornitore | `[DA VERIFICARE sul listino]` |
| Posta in arrivo | Dipende dal fornitore scelto | `[DA VERIFICARE]` |

La voce che cresce davvero è l'archivio dei PDF. Una regola di conservazione (per esempio: testo cancellato 30 giorni dopo la decisione, scheda e decisione conservate) tiene basso il costo e alleggerisce il DPA.

## In che ordine si costruisce

1. Progetto Supabase in regione UE; schema, row level security e test automatici dell'isolamento: un utente di una casa che prova a leggere dati di un'altra deve ricevere zero righe.
2. Accessi con link via mail; script di inserimento di una casa (organization, collane da `config/publishers.ts`, primi utenti).
3. Coda persistente e caricamento manuale, sulla route di analisi esistente, con l'esecutore in background e la fase 2 (niente ripiego silenzioso).
4. Decisioni con ragioni strutturate ed export CSV.
5. Casella proposte: indirizzo dedicato, verifica della firma, duplicati, `.docx`.
6. Riscrittura di `/riservatezza` e di `/privacy`, che diventano false nel momento in cui i testi vengono conservati; Allegato C del DPA aggiornato con le misure attive.

La demo pubblica resta com'è, nel browser: i dati veri dei piloti vivono solo nello spazio della loro casa.

## Le cinque decisioni che servono per partire

1. **Fornitore:** Supabase (raccomandato) oppure Neon con Auth.js e Vercel Blob.
2. **Regione dei dati:** UE (raccomandato: semplifica il DPA e i trasferimenti).
3. **Posta in arrivo:** quale fornitore, dopo aver verificato se Resend gestisce già la posta in arrivo con gli allegati conservati.
4. **Conservazione dei manoscritti:** per quanto tenere il testo dopo la decisione. La proposta è 30 giorni.
5. **Piano Vercel:** il passaggio a Pro serve per il cron al minuto e per funzioni più lunghe `[DA VERIFICARE]`, e va messo nel conto.

Con le decisioni prese e l'account del database creato, si parte dal punto 1.
