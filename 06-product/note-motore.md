# Note sul motore di giudizio

Osservazioni sui file che `CLAUDE.md` §4 chiede di non modificare durante la validazione retrospettiva. Sono scritte qui invece che corrette nel codice. Nessuna cambia il giudizio; alcune cambiano quello che succede quando il giudizio non arriva.

*Prima stesura: 14 ottobre 2026, dal debug in `verso-la-versione-definitiva.md`.*

## `app/api/analyze/route.ts`

**1. Tempi che non tornano.** Il client Anthropic ha `timeout: 55_000` e `maxRetries: 1`, la funzione ha `maxDuration = 60`. Se il primo tentativo scade a 55 secondi, il secondo non ha tempo di finire. Vercel chiude la funzione a 60 secondi e risponde con una pagina non JSON. Oggi il client lo gestisce (messaggio di tempo limite), ma il secondo tentativo spende token senza poter mai concludere.
Proposta: `maxRetries: 0`, oppure un timeout di circa 25 secondi con un tentativo. Meglio ancora l'analisi asincrona (vedi il rapporto, §3).

**2. Il ripiego sull'euristica a stato 200.** Nel `catch`, qualunque errore che non sia di autenticazione restituisce l'euristica con stato 200: limite di frequenza di Anthropic, rete, scheda non valida, collane tutte inventate. È la fase 2 della roadmap. Per ora il client almeno lo dichiara («il server non ha eseguito l'analisi AI»).

**3. Due 401 diversi.** Token condiviso mancante e chiave Anthropic non valida rispondono entrambi 401, con messaggi diversi. Dal 14 ottobre il client mostra il messaggio del server, quindi si distinguono; un codice applicativo nel corpo (`motivo: "token" | "chiave"`) renderebbe la distinzione robusta.

**4. La quota si consuma prima della validazione.** Anche una richiesta 400 o 413 conta nel limite di 5 al minuto. In una demo dal vivo, due errori di input lasciano tre analisi. Non è grave, ma va saputo.

## `lib/limiti.ts`

Non è tra i file protetti, ma tocca la stessa route. `MAX_PDF_BYTES` valeva 6 MB, mentre su Vercel il corpo di una richiesta si ferma a 4,5 MB (documentazione Vercel, non riverificata oggi): un PDF in base64 oltre circa 3,2 MB non arrivava mai alla route. **Risolto il 14 ottobre**: il client blocca prima dell'invio e il tetto del server è sceso a 3 MB.

## `config/publishers.ts`

`defaultOn` è attivo su tre case (Sperling & Kupfer, Einaudi, Il Battello a Vapore), mentre l'interfaccia consiglia «1-2 case per volta» per l'analisi dal vivo. Un'analisi senza redazione scelta parte quindi già nella condizione sconsigliata. **Risolto il 14 ottobre** in `components/Analyzer.tsx`, che preseleziona solo le prime due, senza toccare il catalogo.

## `lib/heuristic.ts`

L'euristica produce verdetti netti: «Prioritario» con fit 95% su segnali di superficie («lessico evocativo»). Nella coda della redazione, finché mancano le schede reali in cache, è la prima cosa che un editore vede. Le etichette dicono che è una stima, ma il banner verde «Prioritario» pesa più dell'etichetta. Due vie: le schede reali in cache (mossa 1 del rapporto) oppure, in fase 2, un'euristica che non emetta raccomandazioni ma solo segnali.
