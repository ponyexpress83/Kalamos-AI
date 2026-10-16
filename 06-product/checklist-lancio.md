# Checklist di lancio

*Aggiornata il 16 ottobre 2026. Quello che il codice poteva fare da solo è fatto e verificato; qui c'è ciò che richiede dati, accessi o decisioni del fondatore.*

Alla fine, `npm run verifica-lancio` deve rispondere «Tutto pronto».

## Prima del lancio

### 1. Dati dell'impresa — mancano tre campi

In `config/azienda.ts` ci sono già **Smart Content S.r.l.s.** e **info@kalamos.studio**. Mancano **partita IVA, sede e numero REA**: vanno copiati dalla visura camerale (la pagina di ufficiocamerale.it non era raggiungibile da dove sono stati scritti). Se li mandi, li inserisco io.

La partita IVA sul sito è un obbligo (art. 35 DPR 633/1972). Da confermare con il commercialista.

### 2. Richieste di pilota via email, con Resend

Sì: con Resend ogni richiesta arriva come email a **info@kalamos.studio**, con oggetto «Richiesta pilota — nome della casa». Il «Rispondi» va direttamente all'editore che l'ha mandata.

1. Crea l'account su resend.com.
2. **Consigliato: verifica il dominio.** In Resend → Domains → Add domain, inserisci `kalamos.studio`. Resend mostra alcuni record DNS: vanno aggiunti nel pannello di chi gestisce il dominio. Quando lo stato diventa «Verified», su Vercel imposta anche `KALAMOS_MAIL_FROM` = `Kalamos <pilota@kalamos.studio>`.
   *Alternativa senza DNS:* il mittente di prova `onboarding@resend.dev` consegna solo all'indirizzo con cui è stato aperto l'account Resend. Funziona se l'account è registrato proprio con info@kalamos.studio.
3. Resend → API Keys → Create, con permesso di sola spedizione. Copia la chiave.
4. Vercel → progetto kalamos-ai → Settings → Environment Variables, ambiente Production: `RESEND_API_KEY` = la chiave. `KALAMOS_LEADS_TO` non serve: il destinatario è già info@kalamos.studio.
5. Vercel → Deployments → sull'ultimo deploy «Redeploy»: le variabili valgono solo per i deploy successivi.
6. Prova: una richiesta da `/pilota` deve arrivare in casella.

Finché Resend non è configurato il modulo funziona lo stesso: propone una mail già compilata verso info@kalamos.studio, da mandare con un clic.

### 3. Le schede reali in coda

L'errore che ha visto Ilaria (`Could not read package.json`) dipende dalla cartella: il comando va lanciato dentro la copia del progetto, non nella cartella utente. Sul Mac, nel Terminale:

```bash
cd ~
git clone https://github.com/ponyexpress83/Kalamos-AI.git
cd Kalamos-AI
git checkout claude/determined-gauss-pishqb
node --version
BASE_URL=https://kalamos-ai.vercel.app npm run schede
```

`node --version` deve rispondere 18 o più. Non serve `npm install`: lo script usa solo Node. Se il repository è privato, `git clone` chiede l'accesso GitHub.

Lo script genera 36 schede (4 manoscritti × 9 case) con la chiave già configurata in produzione, rispettando il limite di 5 analisi al minuto: almeno un quarto d'ora. Se si interrompe, rilanciarlo riparte da dove era arrivato. Il costo **calcolato** con il tetto di output è al massimo $4,97 su `claude-opus-4-8`; alla fine stampa il costo **misurato**.

Poi, da chi ha accesso in scrittura al repository:

```bash
git add data/schede && git commit -m "dati: schede reali in cache" && git push
```

**Più semplice:** consenti `kalamos-ai.vercel.app` nelle impostazioni di rete dell'ambiente Claude Code (Network access → Allowed domains). A quel punto le schede le genero e le pubblico io.

### 4. Vercel

- Scheda **Analytics**: attivare Web Analytics.
- `ANTHROPIC_API_KEY` presente e valida.
- Dominio diverso da `kalamos-ai.vercel.app`: impostare `NEXT_PUBLIC_SITE_URL` e fare un nuovo deploy.

### 5. Il giro a mano, dopo l'ultimo deploy

1. Landing → «Richiedi un pilota» → una richiesta vera: deve arrivare la mail.
2. Redazione → Einaudi: le righe non devono dire «stime offline»; tempo e costo per scheda mostrano un numero.
3. Analizza → incolla un testo: nessun avviso «il server non ha eseguito l'analisi AI».
4. Finestra anonima → `/workspace`: si viene portati a `/login` senza vedere nulla.
5. Da telefono: menu con Redazione, Analizza, Pilota; footer con i dati dell'impresa.

## Prima del primo pilota (non del lancio)

| Cosa | Stato | Chi |
|---|---|---|
| DPA e NDA | Bozze in `10-legale/`, anche in Word | Avvocato: revisione e firma |
| Informativa privacy | Rivista sull'art. 13 e pubblicata; punti aperti in `10-legale/revisione-informativa.md` | Avvocato: validazione |
| Account per casa editrice, database, casella proposte | Progetto in `06-product/architettura-dati.md`, fermo per le cinque decisioni in fondo | Fondatore: decisioni e account del database |
| Fatturazione | Il primo pilota si fattura con la skill Fatture in Cloud; piano in `05-financials/fatturazione.md` | Fondatore e commercialista: prezzi, metodo di pagamento |

Il DPA vieta di avviare un pilota prima che account personali, isolamento per casa e database cifrato esistano (Allegato C). È la ragione per cui la fase 3 viene prima del primo sì.
