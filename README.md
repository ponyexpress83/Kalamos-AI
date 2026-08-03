# Kalamos AI × PLAI 2026

> Progetto Claude Code per vincere la **Call PLAI 2026** del Gruppo Mondadori con **Kalamos AI**.

## Cos'è questo repository

È in parte un **workspace strutturato per la candidatura PLAI** (i documenti nelle cartelle numerate) e in parte un **prototipo MVP cliccabile** di Kalamos AI (app Next.js alla root — vedi sotto).

L'idea: invece di gestire la candidatura come una serie di chat sparse, qui c'è un **single source of truth** versionabile, dove ogni asset (positioning, application, PoC, deck, financials) vive in un file dedicato che puoi rifinire iterativamente.

## Demo cliccabile (app Next.js)

**Rotte:** `/` è la **landing** (logo e presentazione) da cui si entra alla **versione di test senza credenziali**; `/demo` è l'app di analisi; `/redazione` la vista d'insieme; `/scheda/[id]` la scheda dei demo.

La demo dimostrativa del prodotto: **Analizza** → scegli un manoscritto (4 testi originali precaricati) oppure incolla un testo o carica un `.txt`/`.pdf` → **scegli la casa editrice** (il cliente) → ottieni una **scheda di lettura strutturata** (sintesi, voto prosa, comparabili, forze/criticità, raccomandazione) in cui Kalamos **suggerisce automaticamente la collana più adatta** tra quelle **reali** del catalogo di quell'editore. La vista **Redazione** mostra una tabella ordinabile dei manoscritti con la collana suggerita.

L'analisi dal vivo gira su Claude (Anthropic) in una route server (`/api/analyze`) che **non espone mai la chiave al client**. Senza chiave la demo resta provabile: la modalità offline (euristica etichettata) e le stime della Redazione funzionano anche **offline**; la chiave serve per l'analisi dal vivo reale su testi qualsiasi.

Il **logo** è un componente SVG (`components/Logo.tsx`) nei colori di brand (inchiostro `#14213d`, corallo `#cb5a3c`, carta `#f7f3ec`): per sostituirlo con l'asset ufficiale, rimpiazza quel componente.

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

- `ANTHROPIC_API_KEY` — chiave Anthropic. **Mai hardcoded.** Senza chiave la demo resta provabile in modalità offline (euristica etichettata) e la Redazione mostra le stime.
- `ANTHROPIC_MODEL` — opzionale, default `claude-sonnet-4-6` (rapido, rientra nei 10s delle function su Vercel Hobby). Su piano Pro puoi usare `claude-opus-4-8` per la massima qualità.

### Modalità dimostrativa offline (sempre provabile)

L'analisi dal vivo su Claude produce una scheda ricca ma richiede ~20–40s: **non rientra nei 10s delle function del piano Vercel Hobby**. Per rendere la demo provabile **con qualsiasi manoscritto**, in qualunque contesto (dal palco, su Hobby, offline, o senza chiave), c'è una **modalità dimostrativa offline** (checkbox sotto "Analizza"):

- Genera una scheda **istantanea** da un'euristica sui segnali del testo (versi, dialogo, cliché, avverbi, lessico di genere) e suggerisce comunque una **collana reale per editore** (poesia in versi → case di poesia; giallo → *La memoria* di Sellerio; slush → scarta).
- È **chiaramente etichettata come "anteprima simulata"** — non è inferenza AI. Serve a provare il flusso, non a sostituire la valutazione reale.
- Scatta anche **in automatico come fallback** se l'analisi dal vivo va in timeout o manca la chiave (per testo incollato / `.txt`; i PDF richiedono la chiave).

In sintesi: i 4 demo in cache e la modalità offline garantiscono che la demo **funzioni sempre**; l'analisi dal vivo (Pro consigliato) resta il valore reale.

### Come aggiungere un manoscritto demo

1. Metti il file di testo in `data/manuscripts/` (es. `05_titolo.txt`).
2. Aggiungi una voce in `lib/manuscripts.ts` (`id`, `file`, `titolo`, `autore`, `genere`, `parole`).
3. (Facoltativo) Per la scheda istantanea in cache e la presenza in Redazione, aggiungi la scheda pre-generata in `lib/cache.ts` con la stessa `id`. Senza cache il manoscritto si analizza comunque dal vivo.

### Case editrici e collane (reali)

Si seleziona la **casa editrice** (il cliente); Kalamos suggerisce la **collana** più adatta tra quelle **reali** del suo catalogo. Case e collane sono verificate — nessuna collana inventata (config `config/publishers.ts`), raggruppate per ambito:

- **Poesia** — Giuliano Ladolfi Editore (Atelier poesia, Perle poesia, Zaffiro, Onice, Opale) · Samuele Editore (Scilla, La Gialla, I Poeti di Pordenone) · Interno Poesia (Interno Libri, Books, Novecento, Classici, Beta)
- **Narrativa** — Einaudi (Supercoralli, I Coralli, Einaudi Stile Libero) · Sellerio (La memoria, Il contesto, La rosa dei venti) *(default)*
- **Bambini e ragazzi** — Il Battello a Vapore/Piemme (Serie Bianca, Azzurra, Arancio, Rossa per fasce d'età) · Topipittori (Albi, Parola magica, Gli anni in tasca, PiPPO)
- **Fantasy e fantascienza** — Oscar Vault/Mondadori (Oscar Fantastica, Draghi, Fabula, Ink)

Di default sono attive Einaudi e Sellerio (i demo sono narrativa). Un testo in versi indirizza il fit verso le case di poesia, un giallo verso *La memoria* di Sellerio, e così via — anche in modalità offline.

### Come aggiungere o modificare una casa editrice / collana

Edita `config/publishers.ts`: ogni casa ha `id`, `nome`, `ambito` (sezione UI), `descrizione` (iniettata nel prompt dal vivo), `defaultOn` opzionale e l'elenco `collane`. Ogni collana ha `nome`, `descrizione` (reale) e `profilo` (guida l'euristica offline). Usa **solo collane reali** e descrizioni che facciano divergere i punteggi.

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
