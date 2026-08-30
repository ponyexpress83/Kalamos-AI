# Kalamos AI - Load test suite

Suite k6 per misurare separatamente frontend/Vercel e analisi AI.

## Prerequisiti

Installa k6:

```bash
brew install k6
```

Verifica:

```bash
k6 version
```

## Regola di sicurezza

Non lanciare 10/20 VU su `/api/analyze` in produzione. La route di produzione ha intenzionalmente rate limit e chiamate AI a pagamento. I profili oltre 5 VU vanno eseguiti solo su un deployment di load test dedicato, con budget e limiti esplicitamente configurati.

## 1. Smoke/load test web - nessuna chiamata AI

Testa home e login con rampa 5 -> 10 -> 20 utenti virtuali.

```bash
k6 run load-tests/web-smoke.js
```

Controlla soprattutto:

- `http_req_failed`: target < 1%
- `http_req_duration p(95)`: target < 2000 ms
- status 5xx: zero

Per una preview:

```bash
BASE_URL=https://your-preview.vercel.app k6 run load-tests/web-smoke.js
```

## 2. Baseline AI sequenziale

Esegue 3 analisi una alla volta con testo sintetico.

```bash
k6 run load-tests/ai-sequential.js
```

Se la produzione richiede `KALAMOS_API_TOKEN`:

```bash
KALAMOS_API_TOKEN='...' k6 run load-tests/ai-sequential.js
```

Per cambiare numero di iterazioni:

```bash
ITERATIONS=5 k6 run load-tests/ai-sequential.js
```

## 3. Concorrenza AI controllata

Partire da 2 VU:

```bash
VUS=2 DURATION=20s k6 run load-tests/ai-concurrent.js
```

Poi, solo se il precedente passa:

```bash
VUS=3 DURATION=20s k6 run load-tests/ai-concurrent.js
VUS=5 DURATION=20s k6 run load-tests/ai-concurrent.js
```

Un HTTP 429 e' un rate limit intenzionale, non un crash. Un 5xx e' invece un errore da investigare.

## 4. Test 10/20 VU

Da fare esclusivamente su deployment separato. Sequenza consigliata:

```bash
BASE_URL=https://load-test-preview.vercel.app VUS=10 DURATION=30s k6 run load-tests/ai-concurrent.js
BASE_URL=https://load-test-preview.vercel.app VUS=20 DURATION=30s k6 run load-tests/ai-concurrent.js
```

Prima di farlo verificare:

1. modello AI scelto e budget;
2. rate limit del deployment di test;
3. nessun documento reale o riservato;
4. tetto di spesa per richiesta;
5. disponibilita' a controllare Vercel e provider subito dopo.

## Cosa registrare

Per ogni scenario salva:

| Scenario | VU | Richieste | Successo | p50 | p95 | 429 | 5xx |
|---|---:|---:|---:|---:|---:|---:|---:|
| Web | 20 | | | | | n/a | |
| AI baseline | 1 | | | | | | |
| AI concurrent | 2 | | | | | | |
| AI concurrent | 3 | | | | | | |
| AI concurrent | 5 | | | | | | |
| AI staging | 10 | | | | | | |
| AI staging | 20 | | | | | | |

Non usare numeri stimati nel pitch: riportare solo risultati misurati.

## Interpretazione rapida

- `200`: analisi completata.
- `429`: protezione di rate limiting attivata correttamente.
- `413`: input o costo stimato oltre i fusibili configurati.
- `401/403`: token/origine non configurati per il test.
- `5xx`: errore applicativo/provider da investigare.
- timeout > 60s: il percorso sincrono e' saturo o il provider e' lento; per scala enterprise va spostato su coda/job asincrono.

## Obiettivo Mondadori

Produrre una tabella con dati reali di throughput, success rate e latenza p95, distinguendo chiaramente:

- frontend/web concurrency;
- AI concurrency sul pilot;
- limite intenzionale di produzione;
- risultato del deployment di load test dedicato.
