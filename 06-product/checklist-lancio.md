# Checklist di lancio

*14 ottobre 2026, per il lancio del 15. Tutto ciò che il codice poteva fare da solo è fatto e verificato; qui c'è solo ciò che richiede dati o accessi che ha il fondatore.*

Alla fine, `npm run verifica-lancio` deve rispondere «Tutto pronto».

## Stasera, in quest'ordine

### 1. I dati dell'impresa — obbligatorio

Compilare `config/azienda.ts`: ragione sociale, partita IVA, sede, iscrizione al registro, email di contatto. Poi commit e push.

Senza questi dati il footer non mostra chi pubblica il sito, `/privacy` mostra un avviso al posto del titolare e il modulo pilota non ha un indirizzo di ripiego. La partita IVA sul sito è un obbligo (art. 35 DPR 633/1972): da confermare con il commercialista, insieme al testo di `/privacy`, che va fatto rivedere a un legale.

### 2. Dove arrivano le richieste di pilota — obbligatorio, una delle due

- **Con invio automatico (consigliato).** Account su resend.com, una API key. Su Vercel, in Settings → Environment Variables: `RESEND_API_KEY` e `KALAMOS_LEADS_TO`. Con il mittente di prova (`onboarding@resend.dev`) Resend consegna solo all'indirizzo con cui è stato aperto l'account: `KALAMOS_LEADS_TO` deve essere quello. Per un mittente proprio serve verificare il dominio su Resend e impostare `KALAMOS_MAIL_FROM`. Poi un nuovo deploy e una richiesta di prova da `/pilota`.
- **Senza servizio di invio.** Basta l'email di contatto del punto 1: il modulo propone una mail già compilata, che l'editore manda dalla propria casella con un clic.

L'invio tramite Resend non è stato verificato da questo ambiente (dominio non raggiungibile). La richiesta di prova va fatta.

### 3. Le schede reali in coda — fortemente consigliato

Oggi la redazione demo mostra stime euristiche. Dal proprio computer, nella cartella del progetto:

```bash
BASE_URL=https://kalamos-ai.vercel.app npm run schede
```

Lo script usa la chiave già configurata in produzione e genera 36 schede (4 manoscritti × 9 case). Rispetta il limite di 5 analisi al minuto, quindi ci vuole almeno un quarto d'ora. Se si interrompe, rilanciandolo riparte da dove era arrivato.

Costo **calcolato** con il tetto di output: al massimo $4,97 su `claude-opus-4-8`. Alla fine lo script stampa il costo **misurato** dai token.

Se su Vercel è impostato `KALAMOS_API_TOKEN`, va passato anche quello: `KALAMOS_API_TOKEN=... BASE_URL=... npm run schede`. Mentre lo script gira, evitare analisi dal sito dalla stessa rete, perché condividono il limite orario di 40.

Poi:

```bash
git add data/schede && git commit -m "dati: schede reali in cache" && git push
```

### 4. Vercel

- Scheda **Analytics** del progetto: attivare Web Analytics. Senza, il sito funziona ma non conta le visite (e nella console compare un 404 su `/_vercel/insights/script.js`).
- `ANTHROPIC_API_KEY` presente e valida.
- Se il lancio usa un dominio diverso da `kalamos-ai.vercel.app`: `NEXT_PUBLIC_SITE_URL` con il dominio nuovo, poi un nuovo deploy.

### 5. Il giro a mano, dopo l'ultimo deploy

1. Landing → «Richiedi un pilota» → invio di una richiesta vera: deve arrivare la mail (o aprirsi quella compilata).
2. Redazione → Einaudi: le righe non devono più dire «stime offline»; tempo e costo per scheda devono mostrare un numero.
3. Analizza → incolla un testo: nessun avviso «il server non ha eseguito l'analisi AI».
4. In una finestra anonima, `/workspace` porta a `/login` senza mostrare nulla.
5. Da telefono: menu con Redazione, Analizza, Pilota; footer con i dati dell'impresa.

## Cosa la piattaforma non fa ancora, da sapere prima di parlarne

- **Account e dati condivisi per casa editrice.** Tutto vive nel browser di chi la usa: un pilota oggi richiede una configurazione dedicata, a mano. È la fase 3 della roadmap.
- **Collegamento alla casella proposte.** La landing dice che è in sviluppo; i testi si caricano a mano.
- **DPA e NDA modello.** `/pilota` promette condizioni di trattamento firmate prima del primo manoscritto: vanno preparate prima del primo sì.
- **Verdetti degradati.** Se l'AI non risponde, l'analisi ripiega sull'euristica, dichiarandolo. È la fase 2.
- **Contratti e versioni** sono schermate dimostrative, e la landing lo dice.
