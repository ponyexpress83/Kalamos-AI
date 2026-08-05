# Problem & Solution (sezione application)

> Sezione dedicata al *problem statement* e alla *solution*.
> Spesso campi separati nei form: tenere strutturati ma riusabili.

---

## PROBLEM (draft v1)

I grandi editori trade italiani sono strutturalmente sotto-capacità nella valutazione dei manoscritti in entrata. Tre dati delineano il problema:

1. **Volume**: 8.000–15.000 manoscritti/anno per un major. Capacità di valutazione effettiva: meno del 15% del flusso.
2. **Tempo**: una scheda di lettura completa richiede 5–15 giorni di lavoro a un lettore senior. Il backlog cresce più velocemente di quanto si possa smaltire.
3. **Costo**: €150–500 a scheda completa, prevalentemente in lavoro umano qualificato non scalabile.

Le conseguenze: decisioni di pubblicazione basate su un campione non rappresentativo dei manoscritti ricevuti, talenti potenzialmente forti rifiutati senza lettura, lettori senior occupati al 70% su materiale che si capisce in 20 minuti che non passerà.

I tool AI consumer (Sudowrite, NovelAI, ChatGPT generalisti) non risolvono questo problema: sono pensati per aiutare a *scrivere*, non per supportare un editore nel *valutare a scala*.

---

## SOLUTION (draft v1)

Kalamos AI è un *editorial intelligence engine*: una piattaforma SaaS che riceve un manoscritto e produce, in meno di 30 minuti, una scheda di lettura strutturata + un fit-score calibrato sull'identità di una collana editoriale specifica.

L'output non è un riassunto generico. È:
- **Struttura narrativa** (arco, ritmo, snodi).
- **Voce e registro** (analisi stilistica, riferimenti possibili).
- **Mercato di riferimento** (target, posizionamento, comparable).
- **Fit-score di collana**: lo stesso romanzo letterario che nella demo ottiene 27% da Sperling & Kupfer (raccomandazione: scarta) ottiene 90% da Einaudi su Stile Libero (raccomandazione: prioritario). Il fit misura il rapporto fra testo e catalogo, non una qualità astratta.
- **Verdetto operativo** (richiamare l'autore / chiedere revisioni / archiviare con feedback).

L'editor riceve un input strutturato che gli permette di decidere in 20 minuti se vale la pena leggere il manoscritto in versione integrale. Il giudizio finale resta umano, sempre. Kalamos è l'imbuto che ribalta il rapporto segnale/rumore.

**Differenza chiave vs tool generici**: il fit-scoring per collana. Una scheda di lettura "neutra" non aiuta un editore di Sperling, perché ogni casa editrice (e ogni collana al suo interno) ha un'identità precisa che Kalamos modella esplicitamente.

---

## Note di compilazione
- Verificare il limite caratteri del form: spesso sono due campi separati, ciascuno 500–1.000 caratteri.
- Se il form fonde i due, ridurre il problem a 3 righe (volume/tempo/costo) e dare più spazio alla solution.
- Mai aprire il problem con "Negli ultimi anni l'industria editoriale ha visto un'esplosione di...". Andare dritti ai numeri.
