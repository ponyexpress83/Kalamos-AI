# I fusibili di `/api/analyze` — come sono stati scelti i numeri

> Fase 1. Ogni valore qui sotto è calcolato dal listino pubblico Anthropic e dai
> limiti già presenti nel codice. Nessuno è scelto a occhio.

---

## Perché serviva

Fino a oggi `/api/analyze` era un POST pubblico: nessuna autenticazione, nessun
rate limit, nessun controllo di origine, nessun tetto sulla dimensione
dell'input. Chiunque conoscesse l'indirizzo poteva far girare in ciclo la nostra
chiave Anthropic.

Il conto del rischio, con i numeri veri:

| | Valore |
|---|---|
| PDF da 6 MB, ~300 pagine reali | ~900.000 token di input |
| Costo su `claude-opus-4-8` (il modello in produzione) | ~**$4,63** per singola richiesta |
| Richieste possibili in un'ora, prima della fase 1 | **illimitate** |

Non era un rischio teorico: bastava un ciclo `curl`.

---

## Il listino su cui si fanno i conti

Da `lib/pricing.ts`, rilevato ad agosto 2026, in dollari per milione di token.

| Modello | Input | Output |
|---|---|---|
| `claude-sonnet-4-6` (default nel codice) | 3 | 15 |
| `claude-opus-4-8` (in produzione) | 5 | 25 |

Se il modello configurato non è in listino, `prezzoModello()` usa **il più caro
fra quelli noti**: una stima di spesa deve sbagliare rifiutando, non spendendo.

---

## Il testo è già limitato da solo

`lib/extract.ts` taglia a 12.000 token e manda un estratto. Quindi il costo del
percorso testuale è limitato **a monte**, qualunque sia la lunghezza inviata:

```
input  = 12.000 (estratto)  +  1.700 (catalogo + istruzioni, misurati)  = 13.700
output = 5.000 (max_tokens dichiarato nella route)
```

| Modello | Costo massimo per analisi su testo |
|---|---|
| sonnet-4-6 | $0,12 |
| opus-4-8 | **$0,19** |

**Conseguenza**: `MAX_TEXT_CHARS = 1.200.000` non serve a contenere la spesa, che
è già contenuta. Serve a non far transitare corpi di richiesta enormi — banda,
memoria, e il limite di 4,5 MB delle funzioni serverless. Un milione e duecento
mila caratteri sono circa duecentomila parole: più di due romanzi lunghi.

---

## Il PDF è il vero rischio, perché non viene tagliato

Il PDF viene passato **intero** al modello: l'applicazione non ne estrae il
testo. Anthropic converte ogni pagina in testo più immagine, con un consumo
osservato fra 1.500 e 3.000 token per pagina. Usiamo **3.000**, il limite alto.

Dal tetto di spesa si ricava il numero di pagine ammesse:

```
budget input = tetto − costo output massimo
pagine       = (budget input / prezzo input) − 1.700 scaffolding, diviso 3.000
```

Con il tetto predefinito di **$1,00**:

| Modello | Costo output max | Budget input | Pagine ammesse |
|---|---|---|---|
| sonnet-4-6 | $0,075 | $0,925 | ~**102** |
| opus-4-8 | $0,125 | $0,875 | ~**57** |

`MAX_PDF_BYTES = 6 MB` è la seconda rete, non la prima: a ~60 KB per pagina
sono già circa 105 pagine, quindi in produzione il tetto di spesa morde prima.

**Come si contano le pagine.** Prima si cercano i marcatori `/Type /Page` nel
file; se il PDF comprime gli oggetti quei marcatori non si vedono, e si stima
dalla dimensione (60 KB per pagina). Fra le due stime si prende **la più alta**,
perché sottostimare le pagine significa sottostimare la spesa. Il messaggio di
errore dichiara quale metodo è stato usato.

---

## Rate limit: due finestre

| Finestra | Massimo |
|---|---|
| 60 secondi | 5 richieste |
| 60 minuti | 40 richieste |

La prima ferma la raffica, la seconda il ciclo lento. Una richiesta respinta dal
limitatore non consuma quota; una respinta per dimensione o costo sì, altrimenti
si potrebbe martellare gratis con richieste fuori misura.

Il batch dell'interfaccia manda fino a 5 file in sequenza, ciascuno ~28 secondi:
non tocca il limite del minuto.

**Limite da conoscere, e non nascosto**: il conteggio sta nella memoria del
processo. Su Vercel ogni istanza serverless ha la sua, quindi il limite è per
istanza e non globale. Con il traffico di una demo morde davvero; sotto attacco
distribuito no. La sostituzione naturale sarebbe un contatore su Redis, che non
introduciamo ora perché aggiunge infrastruttura da mantenere a fronte di un
rischio che il token già copre.

---

## Token condiviso e origine

`KALAMOS_API_TOKEN`, se impostata, rende obbligatorio l'header
`x-kalamos-token` (o `Authorization: Bearer`). Se non è impostata l'endpoint
resta aperto come oggi, così il deploy pubblico non si rompe.

`KALAMOS_ALLOWED_ORIGIN`, se impostata, rifiuta le richieste la cui origine non
coincide.

**Onestà su cosa protegge davvero.** Quando è il browser dell'applicazione a
chiamare l'endpoint, il token viaggia nel bundle
(`NEXT_PUBLIC_KALAMOS_API_TOKEN`): ferma gli script esterni e il ciclo
accidentale, non ferma chi apre gli strumenti di sviluppo. Il segreto vero
resta la chiave Anthropic, che non lascia mai il server. Per il pilota con un
editore la combinazione token + origine è sufficiente; per un'apertura più larga
servirà l'autenticazione vera della fase 3.

---

## Ordine dei controlli nella route

1. Token condiviso → 401
2. Origine → 403
3. Rate limit → 429 con `retry-after`
4. Tetti di dimensione (testo, PDF) → 413
5. **Tetto di spesa stimato** → 413

Il punto 5 sta **prima** del controllo della chiave API: è una validazione della
richiesta, non della nostra configurazione. Un PDF fuori misura deve ricevere
413 anche su un'installazione senza chiave.

---

## Verifica eseguita

Server locale, richieste reali. Comandi e uscite in
`ROADMAP.md` (log della fase 1); qui l'esito.

| Prova | Atteso | Ottenuto |
|---|---|---|
| Testo da 1.200.001 caratteri | 413 | 413, messaggio con il conteggio |
| Testo breve | passa | 200 |
| 6 richieste in un minuto | 429 alla sesta | 429, `retry-after: 43` |
| PDF sintetico da 20 pagine | passa il controllo di costo | supera, poi 503 per chiave assente |
| PDF sintetico da 120 pagine | 413 | 413, stimati $1,16 su tetto $1,00, 361.700 token |
| Senza token, con `KALAMOS_API_TOKEN` impostata | 401 | 401 |
| Token sbagliato | 401 | 401 |
| Token corretto, header e Bearer | passa | 200 in entrambi i casi |

I PDF di prova sono sintetici: contengono i marcatori `/Type /Page` e servono a
esercitare il conteggio, non sono documenti apribili. **Il rapporto fra pagine e
token non è stato misurato su PDF reali**: è preso dalla documentazione
Anthropic e usato al limite alto. Quando avremo PDF veri in pilota, va misurato.
