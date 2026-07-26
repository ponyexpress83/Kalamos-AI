# Kalamos AI × PLAI 2026

> Progetto Claude Code per vincere la **Call PLAI 2026** del Gruppo Mondadori con **Kalamos AI**.

## Cos'è questo repository

È in parte un **workspace strutturato per la candidatura PLAI** (i documenti nelle cartelle numerate) e in parte un **prototipo MVP cliccabile** di Kalamos AI (app Next.js alla root — vedi sotto).

L'idea: invece di gestire la candidatura come una serie di chat sparse, qui c'è un **single source of truth** versionabile, dove ogni asset (positioning, application, PoC, deck, financials) vive in un file dedicato che puoi rifinire iterativamente.

## Demo cliccabile (app Next.js)

La demo dimostrativa del prodotto: **Analizza** → scegli un manoscritto (4 testi originali precaricati) oppure incolla un testo o carica un `.txt`/`.pdf` → seleziona una o più collane → ottieni una **scheda di lettura strutturata** con **fit-score diverso per collana** (sintesi, voto prosa, comparabili, forze/criticità, raccomandazione). La vista **Redazione** mostra una tabella ordinabile di tutti i manoscritti analizzati, con KPI di throughput.

L'analisi dal vivo gira su Claude (Anthropic) in una route server (`/api/analyze`) che **non espone mai la chiave al client**. Le 4 schede demo sono in cache: la demo parte istantanea anche **senza chiave e offline**; la chiave serve solo per analizzare testi nuovi (incolla/upload) o per "ri-analizzare dal vivo" un demo.

### Setup

```bash
# 1. Configura la chiave API (necessaria solo per l'analisi dal vivo)
cp .env.example .env.local
#   poi apri .env.local e incolla la tua ANTHROPIC_API_KEY

npm install
npm run dev      # http://localhost:3000  (niente login)
npm run build    # build di produzione
```

Variabili d'ambiente (vedi `.env.example`):

- `ANTHROPIC_API_KEY` — chiave Anthropic. **Mai hardcoded.** Senza chiave restano disponibili le 4 schede demo in cache.
- `ANTHROPIC_MODEL` — opzionale, default `claude-sonnet-4-6` (rapido, rientra nei 10s delle function su Vercel Hobby). Su piano Pro puoi usare `claude-opus-4-8` per la massima qualità.

### Modalità dimostrativa offline (sempre provabile)

L'analisi dal vivo su Claude produce una scheda ricca ma richiede ~20–40s: **non rientra nei 10s delle function del piano Vercel Hobby**. Per rendere la demo provabile **con qualsiasi manoscritto**, in qualunque contesto (dal palco, su Hobby, offline, o senza chiave), c'è una **modalità dimostrativa offline** (checkbox sotto "Analizza"):

- Genera una scheda **istantanea** da un'euristica sui segnali del testo (lunghezza, dialogo, cliché, avverbi, lessico di genere) e fa comunque **divergere i fit-score per collana** (testo commerciale → Sperling alto; letterario → Einaudi/Strade Blu alti; slush → scarta).
- È **chiaramente etichettata come "anteprima simulata"** — non è inferenza AI. Serve a provare il flusso, non a sostituire la valutazione reale.
- Scatta anche **in automatico come fallback** se l'analisi dal vivo va in timeout o manca la chiave (per testo incollato / `.txt`; i PDF richiedono la chiave).

In sintesi: i 4 demo in cache e la modalità offline garantiscono che la demo **funzioni sempre**; l'analisi dal vivo (Pro consigliato) resta il valore reale.

### Come aggiungere un manoscritto demo

1. Metti il file di testo in `data/manuscripts/` (es. `05_titolo.txt`).
2. Aggiungi una voce in `lib/manuscripts.ts` (`id`, `file`, `titolo`, `autore`, `genere`, `parole`).
3. (Facoltativo) Per la scheda istantanea in cache e la presenza in Redazione, aggiungi la scheda pre-generata in `lib/cache.ts` con la stessa `id`. Senza cache il manoscritto si analizza comunque dal vivo.

### Collane incluse

La demo copre più reparti (config `config/imprints.ts`):

- **Narrativa** — Sperling & Kupfer, Einaudi Stile Libero, Mondadori Strade Blu *(selezionate di default)*
- **Poesia** — Ladolfi Editore, Samuele Editore, Interno Poesia
- **Bambini e ragazzi** — Il Battello a Vapore (narrativa per ragazzi), Topipittori (albi illustrati)
- **Generi** — Il Giallo Mondadori (giallo), Fanucci Editore (fantasy), Harmony (romance), Bao Publishing (graphic novel)

I chip sono raggruppati per reparto; di default sono attive le tre collane di narrativa (per tenere l'analisi dal vivo rapida e coerente con i demo). Un testo in versi indirizza il fit verso le collane di poesia, un giallo verso Il Giallo Mondadori, e così via — anche in modalità offline.

### Come aggiungere o modificare una collana

Edita `config/imprints.ts`: aggiungi un oggetto con `id`, `nome`, `gruppo`, `reparto` (sezione UI), `profilo` (guida l'euristica offline), una `descrizione` (testo iniettato nel prompt dal vivo) e, se vuoi che sia preselezionata, `defaultOn: true`. Niente altro da toccare: UI e API leggono da lì. Scrivi descrizioni che facciano **divergere** i punteggi.

**Deploy su Vercel**: collegare il repo; Vercel rileva Next.js e builda da solo. Imposta `ANTHROPIC_API_KEY` tra le Environment Variables del progetto.

**Riservatezza**: l'app serve solo le proprie route (`/`, `/redazione`, `/scheda/...`, `/api/analyze`). I documenti `.md` riservati (`05-financials/`, `08-outreach/`, ecc.) **non** vengono pubblicati dal sito — restano nel repo ma non sono raggiungibili via URL. Restano però visibili a chi ha accesso al repository Git: valuta la visibilità del repo separatamente. Il testo del manoscritto analizzato dal vivo viene inviato all'API Anthropic solo per la valutazione.


## Setup (3 minuti)

```bash
# 1. Clona / estrai questa cartella ovunque
cd kalamos-ai-plai

# 2. Installa Claude Code (se non l'hai già fatto)
npm install -g @anthropic-ai/claude-code

# 3. Avvia Claude Code in questa cartella
claude

# 4. Al primo prompt, scrivi:
# "Leggi CLAUDE.md e ROADMAP.md, poi dimmi su cosa lavoriamo oggi"
```

Claude Code leggerà automaticamente `CLAUDE.md` a ogni sessione e avrà tutto il contesto strategico del progetto.

## Come è organizzato

Le cartelle sono numerate per ordine logico di lavoro, non temporale:

| Cartella | Cosa contiene | Quando lavorarci |
|----------|---------------|------------------|
| `00-context/` | Tutto ciò che sappiamo su PLAI, Mondadori, e Kalamos oggi | All'inizio, poi consultazione |
| `01-positioning/` | Il messaggio core di Kalamos AI | Settimana 1 |
| `02-application/` | Form PLAI compilato | Dopo il positioning |
| `03-poc-proposal/` | Il PoC concreto da proporre (cuore strategico) | In parallelo al positioning |
| `04-pitch-deck/` | Deck PPTX per Demo Day e colloqui | Dopo l'application |
| `05-financials/` | Numeri (business model, proiezioni) | In parallelo al deck |
| `06-product/` | Architettura tecnica, MVP scope, demo script | Quando si parla con il selection panel |
| `07-research/` | Market sizing, competitor, deep-dive Mondadori | Mai "finito", arricchimento continuo |
| `08-outreach/` | Strategia contatto pre/post application | Prima di submittare |
| `09-demo-day/` | Prep finale (Q&A, obiezioni, rehearsal) | Solo se selezionati |

## Slash commands Claude Code utili

In `.claude/commands/` ci sono comandi custom che puoi richiamare con `/` dentro Claude Code:

- `/pressure-test` — Claude diventa un investor scettico e attacca il documento corrente con 10 obiezioni dure.
- `/rewrite-tight` — riscrive un testo in versione più stringata, taglia il 30% delle parole senza perdere sostanza.
- `/translate-en` — traduce il documento in inglese mantenendo il tono editoriale.
- `/plai-fit-check` — valuta quanto un testo è allineato ai criteri di selezione PLAI.

## Sessione tipo (quando torni a lavorarci)

```
> claude
# Claude legge CLAUDE.md automaticamente

Tu: Leggi ROADMAP.md, dimmi cosa è prioritario oggi.

Claude: [propone 2-3 task con stima tempo]

Tu: Facciamo il primo.

Claude: [esegue, mostra output, chiede review]

Tu: /pressure-test
# Claude attacca il proprio output dal punto di vista PLAI

Tu: Ok, applica le 3 obiezioni più forti.

Claude: [riscrive incorporando le critiche]

Tu: Aggiorna ROADMAP con questo lavoro chiuso.
```

## Tre regole per non sbagliare

1. **Non saltare il positioning**. Tutto il resto deriva da lì. Se cambi positioning a metà strada, ricominci.
2. **Il PoC è il cuore commerciale**. È l'unico modo concreto per trasformare la candidatura in conversazione operativa con Mondadori.
3. **Aggiorna `ROADMAP.md` ogni volta che chiudi un pezzo**. Il rischio del lavoro a sessioni AI è perdere il filo. Il roadmap è la memoria condivisa.

## Quando NON usare Claude Code

- Per le **negoziazioni vere** con PLAI: scrivi tu, leggi tu, decidi tu. L'AI può fare prep, mai sostituire.
- Per i **numeri finanziari**: Claude può strutturare i fogli ma i numeri li metti tu (non inventa traction).
- Per la **demo del prodotto**: dovrai costruire un MVP funzionante. Nessun deck regge se al colloquio non c'è almeno un prototipo cliccabile.

---

*Buona candidatura. Quando vinci offrimi un caffè a Segrate.*
