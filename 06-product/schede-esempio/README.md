# Schede di esempio — output target di Kalamos AI

> Cosa sono questi file e come usarli nel materiale PLAI.

---

## Cosa sono

Due schede di lettura su opere di **pubblico dominio**, prodotte nel formato esatto che Kalamos AI consegnerà a un editor. Servono a una cosa sola: far vedere — non raccontare — che aspetto ha l'output e quanto è profonda l'analisi.

Sono **esempi-target** (gold standard), scritti a mano sulla specifica del prodotto. **Non** sono generati dal sistema finito, che è ancora in costruzione. È una distinzione che teniamo esplicita: in un colloquio PLAI diciamo "questo è ciò che l'editor riceverà", non "questo l'ha scritto la macchina ieri". Vendere il formato è onesto; fingere una traction di prodotto non lo è.

## Perché opere note di pubblico dominio

Tre ragioni:

1. **Verificabilità**: le opere sono conosciute, quindi chiunque legga la scheda può giudicare se l'analisi regge. È un controllo di qualità, non un trucco.
2. **Legalità**: pubblico dominio (autori morti da oltre 70 anni) → nessun problema di IP nel mostrarle.
3. **Contrasto**: ne abbiamo scelte due deliberatamente opposte — un'avventura commerciale e un romanzo letterario introspettivo — per dimostrare il differenziatore tecnico centrale: **lo stesso framework di valutazione assegna fit-score diversi a collane diverse**.

Nel flusso reale Kalamos riceve i manoscritti anonimizzati (niente titolo/autore), per evitare che il giudizio sia inquinato dalla reputazione. Qui i titoli sono visibili apposta, perché il lettore possa valutare.

## Le due schede

| File | Opera | Genere | Serve a mostrare |
|------|-------|--------|------------------|
| `scheda-salgari-tigri-di-mompracem.md` | E. Salgari, *Le Tigri di Mompracem* (1900) | Avventura commerciale | Analisi di mercato + genere; fit alto su collana commerciale |
| `scheda-svevo-coscienza-di-zeno.md` | I. Svevo, *La coscienza di Zeno* (1923) | Letterario / modernista | Valutazione della prosa e della voce; fit alto su collana letteraria |

Messe affianco, il **ranking delle collane si ribalta**: l'avventura è forte per una lista commerciale e debole per una letteraria; il romanzo letterario, l'inverso. È la prova visiva che il fit-score non è un singolo numero di "qualità" ma una funzione del rapporto testo–collana.

## Doppio uso

Oltre alla demo, queste schede sono **esempi gold-standard per la calibrazione** (vedi `06-product/architecture.md`, punto 2 dell'addestramento): è il tipo di esempio in-context con cui si allinea il modello al gusto di una casa editrice. Produrne una manciata di alta qualità è un lavoro che serve due volte.

## Dove usarle

- **Deck**: slide 6 (demo) — uno screenshot di una scheda vale più di tre bullet.
- **Application**: allegato o link, come prova tangibile a sostegno della sezione prodotto.
- **Colloquio**: stampate, da mettere sul tavolo quando arriva l'obiezione "ma funziona davvero?".

## Disclaimer da tenere in ogni uso esterno

> Schede di esempio prodotte come riferimento del formato di output di Kalamos AI. Le opere sono di pubblico dominio. Gli esempi illustrano la struttura e la profondità d'analisi del prodotto; non costituiscono una validazione statistica delle performance, che è oggetto del PoC retrospettivo descritto in `03-poc-proposal/`.
