# Verso la versione definitiva

*Debug completo, percorso di conversione, piano. 14 ottobre 2026.*

## In breve

Il giudizio regge. Ma oggi la piattaforma non converte: non esiste un solo punto in cui un editore possa dire «voglio provarlo», e la prima schermata che vede mostra stime euristiche invece di schede reali.

Il debug ha trovato ventidue difetti. Quindici sono corretti in cinque commit, ciascuno riverificato nel browser; gli altri sette sono in §4, e quelli che toccano il motore sono in un file a parte. Il più serio era di sicurezza: il workspace sembrava protetto, ma consegnava il suo contenuto anche a chi non era entrato.

Metodo: lettura di tutto il codice applicativo, build di produzione, server locale, giro completo in Chromium (desktop e 390 px) con script ripetibili, `curl` sulle route. I numeri di costo sono **calcolati** da `lib/limiti.ts` e dal listino in `lib/pricing.ts`, non misurati.

---

## 1. Cosa è stato corretto

| # | Difetto | Effetto per chi usa la demo | Commit |
|---|---|---|---|
| 1 | Il controllo di sessione stava nel layout del workspace | Senza sessione arrivava un redirect con dentro tutta la pagina; la richiesta RSC rispondeva 200 con i dati del contratto | `b05ef7b` |
| 2 | Segreto di sessione con un ripiego pubblico sempre attivo | Con l'accesso demo chiuso, un token firmato col ripiego apriva il workspace | `b05ef7b` |
| 3 | `/api/ask` senza limite di frequenza | Chiamate a pagamento ripetibili all'infinito con una sessione ottenuta in un clic | `b05ef7b` |
| 4 | Login senza limite e confronto non a tempo costante | Tentativi illimitati sulle credenziali riservate | `b05ef7b` |
| 5 | Le decisioni salvate non comparivano in Memoria | Il percorso «decido → la memoria ricorda perché» si rompeva proprio sulla pagina che doveva dimostrarlo | `f5890c6` |
| 6 | Date fisse ad agosto-settembre | A ottobre la scrivania mostrava «scadenze attive» passate da sei settimane | `f5890c6` |
| 7 | Stesso libro con autori diversi fra workspace e redazione | Bellacqua/Bevilacqua, Monterosso/Montersino, «La stazione/La stagione delle locuste» | `f5890c6` |
| 8 | Filtri per provenienza inerti | Pulsanti che non rispondono, davanti all'editore | `f5890c6` |
| 9 | Ask: la domanda suggerita sull'autrice riceveva la risposta generica | «autrice» non contiene «autore» | `f5890c6` |
| 10 | Un 429 spiegato come «tempo limite del server… o piano Vercel Pro» | Diagnosi sbagliata mostrata a un editore | `1687a32` |
| 11 | Server senza chiave: scheda etichettata «offline» anche senza averlo scelto | È la confusione da cui era nato «le API non funzionano» | `1687a32` |
| 12 | PDF oltre ~3 MB e testi enormi rifiutati dalla piattaforma prima della route | Errore generico; ora il limite è detto prima dell'invio | `1687a32` |
| 13 | «Trascina o seleziona» senza gestione del rilascio | Il browser apriva il file trascinato al posto della demo | `1687a32` |
| 14 | Su telefono il menu portava solo a `/login` | Redazione e analisi non raggiungibili dal menu | `6210bb2` |
| 15 | Frasi su una calibrazione che non esiste; case del catalogo che sembrano clienti; comparabili non verificati presentati come gli altri campi | Promesse non mantenute: il contrario della linea «mai vendere fumo» | `6210bb2`, `1aca8f8` |

Nello stesso giro: pagina 404 in italiano, favicon, metadati Open Graph, font servito dal nostro dominio (zero richieste esterne dalla landing, verificato), barra mobile del workspace con «Analizza» e uscita.

**File protetti (§4): nessuna modifica.** Quello che riguarda il motore è in `06-product/note-motore.md`.

---

## 2. Il percorso di conversione, punto per punto

Il cliente iniziale è l'editore indipendente o medio (`CLAUDE.md` §8). Arriva da un link: una mail, un messaggio, una presentazione. Ecco cosa trova oggi, verificato nel browser.

| Punto | Oggi | Cosa serve |
|---|---|---|
| **Landing** | Parla a una giuria: «Pronto per una demo editoriale end-to-end», «Safe demo path», «Workspace dimostrativo». Metà delle etichette in inglese («Editorial intelligence infrastructure», «Workspace ready»). Vende anche Contract e Version Intelligence, che sono fuori scopo (§3) e sono schermate dimostrative | Una pagina per l'editore: il suo problema, una prova, un'offerta, un modo di contattarci |
| **Prima schermata (redazione)** | Le quattro schede in coda sono stime euristiche («stime offline etichettate»). Tempo e costo per scheda mostrano «—». Una scheda simulata dice «Prioritario, fit 95%» sulla base di «lessico evocativo» | Schede reali in cache per tutte le nove case |
| **Momento di valore (la scheda)** | Buona, con citazione verificata. Dopo, niente | Il passo successivo, proprio qui |
| **Passo successivo** | Nessuna CTA di contatto, nessun modulo, nessuna mail, nessun prezzo in tutta la piattaforma | «Richiedi un pilota», in tre punti |
| **Fiducia** | Nessun footer, nessuna ragione sociale, nessuna partita IVA. `/riservatezza` descrive bene il flusso ma non è un'informativa privacy (manca il titolare). Nessun DPA | Identità legale, informativa, elenco dei sub-responsabili, DPA modello |
| **Misura** | Nessuna analytics: oggi non sapremmo dire quanti editori hanno aperto una scheda | Analytics senza cookie e sei eventi |

### Le cinque mosse, in ordine

**1. Schede reali in cache per tutte le case.** È la mossa con il rapporto più alto fra effetto e lavoro. `scripts/generate-schede.mjs` esiste, ma oggi `data/schede/` è vuota (le schede non sono mai state committate) e lo script analizza solo le tre case di default.
Da fare: una scheda per coppia manoscritto-casa, salvata come `data/schede/<id>__<casa>.json`, perché la raccomandazione dipende dalla casa e non si possono mescolare i fit di giri diversi. `lib/schede.ts` e `Scrivania` vanno adattati a leggere per casa.
Costo **calcolato** col tetto di output: $0,14 a scheda su `claude-opus-4-8`, $0,08 su `claude-sonnet-4-6`. Per 4 manoscritti × 9 case: al massimo $4,97 su Opus, $2,99 su Sonnet.

**2. «Richiedi un pilota».** Tre punti di ingresso: landing, fondo della scheda, intestazione della redazione. Un modulo breve: nome, casa editrice, ruolo, email, proposte al mese, canali di arrivo.
La soluzione più leggera per un solo sviluppatore: una route `/api/pilota` che manda una mail al fondatore tramite un servizio di invio (Resend o equivalente), con campo esca contro i bot e `consumaQuota` già pronta. Nessun database finché non c'è la fase 3.
**Servono tre decisioni tue** prima di costruirlo: quale offerta (pilota gratuito? a prezzo simbolico? quante settimane?), quale indirizzo riceve le richieste, chi risponde ed entro quando.

**3. Landing riscritta per l'editore indipendente.** In italiano, nel tono di §9. Una proposta di apertura, da verificare: *«La scheda di lettura in meno di un minuto, sulle collane del vostro catalogo. La decisione resta vostra, e la memoria del perché anche.»* Il «meno di un minuto» va accompagnato dal numero di misure (§6).
Contract e Version Intelligence: toglierle dalla landing o marcarle «in esplorazione». La scelta è tua: le hai costruite per Mondadori il 29 agosto.

**4. Fiducia.** Footer con ragione sociale, sede e partita IVA `[DA OTTENERE]`. In Italia l'obbligo di indicare la partita IVA sul sito dell'impresa discende dall'art. 35 del DPR 633/1972, e per le società l'art. 2250 c.c. aggiunge sede e iscrizione al registro: da confermare con il commercialista.
Poi un'informativa privacy (art. 13 GDPR), indispensabile appena il modulo raccoglie dati, e un elenco dei sub-responsabili (Anthropic, Vercel, il servizio di invio mail). Per il pilota, un DPA (art. 28) e un NDA modello: un editore con manoscritti inediti li chiederà alla prima telefonata.

**5. Misura.** Analytics senza cookie, così non serve il banner: Vercel Web Analytics, oppure Plausible. Sei eventi: landing → redazione → scheda aperta → analisi dal vivo → clic su «Richiedi un pilota» → modulo inviato. Senza questi «convertire dal primo giorno» non si può verificare.

### Sull'offerta

Il listino in `05-financials/business-model.md` parte da €5.000 di setup e €18.000 l'anno per lo Starter. Sono ipotesi mai provate su un cliente `[DA VERIFICARE]`. Per un editore indipendente italiano mi sembrano probabilmente fuori portata, ma è un giudizio e non una misura. Il compito assegnato da PLAI è portare uso misurato: un pilota a costo basso o nullo, in cambio di feedback scritto e dei dati di concordanza, serve quel compito meglio di un prezzo pieno.

---

## 3. Cosa manca per la versione definitiva

Per «versione definitiva» intendo questo: una redazione la usa ogni giorno in un pilota pagato, con dati veri. Oggi è una demo: tutto vive nel browser, due editor della stessa casa non vedono la stessa coda.

| Blocco | Stato | Raccomandazione | Manutenzione |
|---|---|---|---|
| **Fase 2 — niente verdetti degradati** | 🔴 | `KALAMOS_MODE`: in `produzione` nessun ripiego sull'euristica, errore esplicito e lavoro rimesso in coda | Bassa |
| **Fase 3 — dati e accessi per casa** | 🔴 | Un solo fornitore per Postgres, autenticazione e archivio file, per avere meno pezzi (per esempio Supabase). Utenti per casa con link via mail. **La fase prevede una fermata: è una raccomandazione, non una decisione** | Media |
| **Ingestione dalla casella proposte** | 🔴 | Indirizzo dedicato o inoltro con webhook di posta in arrivo. In `da-demo-a-prodotto.md` è «la funzione che decide l'adozione», e lo confermo | Media |
| **Analisi asincrona** | 🔴 | Oggi è sincrona con limite di 60 s su Vercel. Una tabella di lavori più un'esecuzione in background toglie timeout e attese | Media |
| **Fase 4 — provenienza** | 🟡 | Il workspace la mostra su dati demo; la coda della redazione no. Tassonomia chiusa e filtro, come da roadmap | Bassa |
| **Fase 5 — memoria delle decisioni** | 🟡 | Ora la decisione arriva in Memoria, ma solo nel browser e con etichette in inglese («Strong interest», «Pass»). Servono le ragioni da vocabolario chiuso, meno di dieci secondi per registrarle ed export CSV | Bassa, dopo la fase 3 |
| **Concordanza visibile all'editore** | 🔴 | È il numero che trasforma un pilota in rinnovo | Bassa, dopo la fase 5 |
| **Legale** | 🔴 | Informativa, DPA, NDA, sub-responsabili, eventuale accordo zero-data-retention con Anthropic | Una tantum |
| **Fasi 6 e 7** | 🔴 | Dopo il primo pilota, come da roadmap | — |

Ordine consigliato: fase 2 → fase 3 → ingestione → analisi asincrona → fase 5 con export. Le mosse di conversione 1, 4 e 5 non dipendono da nulla di questo: si fanno subito.

**Una riga da non attraversare.** Il punto 1.4 di `da-demo-a-prodotto.md` (bozza di risposta all'autore) è stato scritto il 5 agosto, prima del perimetro di §2. Una bozza che l'editor copia e invia dalla propria casella probabilmente non è «messaggistica verso l'autore». Ma è proprio il caso in cui §2 dice di fermarsi e chiedere: non va costruita senza una tua decisione.

---

## 4. Altri difetti trovati e non corretti

Priorità bassa, oppure richiedono una scelta.

- «Analizza» dal workspace porta a `/demo`, fuori dalla cornice del workspace: cambiano intestazione e layout. Va portata dentro, o il workspace va dichiarato come percorso separato.
- L'analisi senza redazione scelta preseleziona tre case (`defaultOn`), mentre il testo accanto consiglia «1-2 per volta».
- Le righe della coda sono `<tr>` cliccabili: non raggiungibili da tastiera né apribili in una nuova scheda.
- La schermata di attesa scandisce passaggi a tempo («Ricerca dei comparabili di mercato…») che non corrispondono a ciò che accade. Meglio una riga sola e vera.
- `?casa=<id>` con un id inesistente salva il valore sbagliato nel browser.
- L'email della sessione demo è `editor.demo@kalamos.ai`. Il dominio è nostro? `[DA VERIFICARE]`
- `robots.txt` e `sitemap.xml` assenti: poco rilevanti in questa fase.

---

## 5. Cosa non ho potuto verificare da qui

- **Il sito pubblicato.** `kalamos-ai.vercel.app` non è raggiungibile da questo ambiente; tutto è stato verificato in locale sulla stessa build. Dopo il deploy va riaperto a mano.
- **Il limite di 4,5 MB** sul corpo delle richieste Vercel viene dalla documentazione Vercel, che oggi non ho potuto riaprire (dominio non raggiungibile).
- **L'esito di PLAI** atteso a settembre non risulta nel repository.
- **Variabili sul deployment.** Con l'accesso demo aperto non cambia nulla. Se un giorno imposti `KALAMOS_DISABLE_PUBLIC_DEMO=true`, ora serve anche `KALAMOS_SESSION_SECRET`, altrimenti nessuno entra: il login lo dice esplicitamente (503).

## 6. Disallineamenti con `CLAUDE.md`

- §1 dice «nessuna autenticazione»: oggi c'è il login demo del workspace, aggiunto il 29 agosto.
- §3 mette contratti e versioni fuori scopo; la landing li vende come moduli 04 e 05.
- Il claim chiesto il 6 agosto («per i flussi editoriali delle case editrici e gruppi editoriali») è sparito nella riscrittura della landing del 29 agosto.

Non ho toccato `CLAUDE.md`: la sua riscrittura è stata una fase con fermata, e queste scelte sono tue.
