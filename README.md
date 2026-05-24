# Kalamos AI × PLAI 2026

> Progetto Claude Code per vincere la **Call PLAI 2026** del Gruppo Mondadori con **Kalamos AI**.

## Cos'è questo repository

Non è un repo di codice. È un **workspace strutturato per la candidatura PLAI**, ottimizzato per essere usato con Claude Code (o qualsiasi assistente AI che legge file).

L'idea: invece di gestire la candidatura come una serie di chat sparse, qui c'è un **single source of truth** versionabile, dove ogni asset (positioning, application, PoC, deck, financials) vive in un file dedicato che puoi rifinire iterativamente.

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
