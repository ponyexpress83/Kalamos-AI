# CLAUDE.md — Progetto Kalamos AI × PLAI 2026

Questo file è la **memoria persistente del progetto** per ogni sessione di Claude Code. Leggilo per intero all'inizio di ogni sessione. Non riassumerlo, non saltarlo.

---

## 0. Obiettivo del progetto

**Vincere la Call PLAI 2026 con Kalamos AI** ottenendo:
1. Ingresso al programma di accelerazione
2. €100K iniziali in equity + fino a €300K totali (follow-on)
3. Fino a €100K aggiuntivi per un PoC reale con una divisione del Gruppo Mondadori
4. Accesso a mentorship, network corporate, casi d'uso interni

PLAI è una **rolling call always-on per tutto il 2026**: ogni candidatura viene valutata progressivamente. Non c'è una scadenza unica → la qualità della prima impressione è tutto, e si può iterare la candidatura.

**Link ufficiale**: https://www.plai-accelerator.com/call-2026/

---

## 1. Chi è il founder (contesto operativo)

**Valerio Gestri** — imprenditore italiano basato a Grosseto, Toscana. Opera attraverso PONYX (AI startup studio). Kalamos AI è una delle sue venture.

- 8+ anni di esperienza mobile dev (iOS Swift/SwiftUI, Android Kotlin/Compose, React Native)
- Background in Lettere e Filologia Moderna (Laurea) → ponte naturale tra mondo editoriale e tech
- Co-founder con **Ilaria Cesarini** (compagna, insegnante e poetessa pubblicata da Pequod) → competenza editoriale autentica nel team
- Sta uscendo da Smart Content Srls (vendita in corso) e ricostituendo una nuova SRL innovativa come holding

**Importante**: il team è ridotto ma verticalmente competente. Non vendere "fuffa team" — vendi la rara combinazione **tech + editoria reale**.

---

## 2. Cos'è Kalamos AI

**Tagline**: *L'Editorial Intelligence Engine per editori, agenzie letterarie e aggregatori di contenuti.*

**Stato attuale**: pre-product. Concept maturo, business plan esistente, deck parziale. **Da costruire ancora** il MVP. Questo è OK per PLAI (accetta pre-incorporated/pre-money).

### Cosa fa concretamente Kalamos AI

Un SaaS B2B che porta intelligenza editoriale nei workflow di chi pubblica:

1. **Manuscript triage & evaluation**: AI che valuta manoscritti in arrivo (sintesi, qualità prosa, fit editoriale, target demografico, comparabili di mercato) → riduce il backlog dei lettori interni del 70-90%.
2. **Editorial fit scoring**: matching tra un manoscritto e l'identità editoriale di una divisione/collana (es. Sperling vs Einaudi Stile Libero vs Mondadori Strade Blu).
3. **Comparable analysis**: dato un testo, identifica titoli comparabili sul mercato italiano + internazionale e ne valuta performance commerciale.
4. **Editorial workflow augmentation**: aiuto su scheda di lettura, editing strutturale, rilevazione coerenza interna, suggerimenti di cut.

### Cosa NON è Kalamos AI

- Non è un generatore di contenuti (no "scrivi il libro per me")
- Non è un tool di marketing/distribuzione
- Non è un correttore grammaticale evoluto
- Non sostituisce l'editor — **lo potenzia**

Questa distinzione è critica: in ogni materiale per PLAI, ribadiscila. Il rischio è essere confusi con ChatGPT-wrappers per editor.

---

## 3. Perché Kalamos AI può vincere PLAI (la tesi strategica)

### Fit verticale perfetto
Mondadori = primo editore italiano. **Publishing** è una delle 5 aree prioritarie PLAI. Più di 350 case editrici nel gruppo. Migliaia di manoscritti gestiti all'anno. Il dolore è reale, misurabile, costoso.

### Differenziazione vs concorrenti generici
La maggior parte delle 500+ application sarà di:
- Tool AI generici "per content creation"
- Wrapper ChatGPT con UI nuova
- Soluzioni martech/adtech generaliste

Kalamos è **verticale, profondo, costruito da chi conosce davvero il mondo editoriale**. Questo è il nostro vantaggio difendibile.

### PoC immediato e misurabile
Possiamo proporre subito un PoC concreto:
- **90 giorni**, **Sperling & Kupfer**, **braccio retrospettivo** su ~300 manoscritti già valutati dall'archivio (decisioni storiche = ground truth) + **pilot live** su 30-50 manoscritti, **KPI quantitativi** con north-star sul recall dei titoli acquisiti.

Questo trasforma la candidatura da "speranza" a "proposta operativa pronta".

### Team con autenticità editoriale
Il combo Valerio (tech + filologia) + Ilaria (poetessa pubblicata) è raro. Non siamo "ingegneri che hanno letto un libro": abbiamo radici nell'editoria.

---

## 4. Mappa del progetto (struttura cartelle)

```
kalamos-ai-plai/
├── CLAUDE.md                   # Questo file (memoria progetto)
├── README.md                   # Guida d'uso umana
├── ROADMAP.md                  # Piano settimanale fino al pitch
│
├── .claude/commands/           # Slash commands Claude Code custom
│   ├── pressure-test.md
│   ├── rewrite-tight.md
│   ├── translate-en.md
│   └── plai-fit-check.md
│
├── 00-context/                 # Conoscenza di base (immutabile)
│   ├── plai-call-2026.md       # Tutto su PLAI 2026
│   ├── mondadori-ecosystem.md  # Brand, divisioni, decision makers
│   ├── previous-batches.md     # Chi ha vinto prima, pattern di selezione
│   ├── kalamos-current-state.md
│   └── team-bios.md
│
├── 01-positioning/             # Il nostro messaggio
│   ├── core-message.md         # Il pitch in una pagina
│   ├── differentiation.md      # Tabella vs concorrenti
│   ├── elevator-pitches.md     # 30s / 60s / 3min
│   └── narrative-arc.md
│
├── 02-application/             # Form PLAI compilato
│   ├── form-master.md          # Tutte le risposte del form
│   ├── company-description.md
│   ├── problem-solution.md
│   ├── traction-validation.md
│   └── ask-and-use-of-funds.md
│
├── 03-poc-proposal/            # Il PoC concreto da proporre
│   ├── 90-day-plan.md          # Cuore strategico
│   ├── target-division.md      # Sperling vs Einaudi SL vs altre
│   ├── kpis-success-criteria.md
│   ├── budget-100k.md
│   └── poc-onepager.pdf        # Output finale
│
├── 04-pitch-deck/              # Deck per Demo Day / colloqui
│   ├── outline.md              # Struttura 12 slide
│   ├── speaker-notes.md
│   ├── slides/                 # Una cartella per slide
│   └── deck-final.pptx         # Output finale
│
├── 05-financials/              # Numeri
│   ├── business-model.md
│   ├── unit-economics.md
│   ├── projections-3y.xlsx
│   └── cap-table-current.md
│
├── 06-product/                 # Prodotto e tech
│   ├── architecture.md
│   ├── mvp-scope.md
│   ├── demo-script.md
│   └── mockups/
│
├── 07-research/                # Intelligence di mercato e competitor
│   ├── market-sizing.md
│   ├── competitors.md
│   ├── mondadori-deep-dive.md
│   └── industry-trends.md
│
├── 08-outreach/                # Strategia contatto pre/post application
│   ├── plai-decision-makers.md
│   ├── warm-intros.md
│   ├── outreach-templates.md
│   └── follow-up-cadence.md
│
├── 09-demo-day/                # Preparazione finale
│   ├── q-and-a-prep.md         # 50+ domande possibili e risposte
│   ├── objection-handling.md
│   └── rehearsal-log.md
│
├── prompts/                    # Prompt riusabili
│   ├── investor-tone.md
│   ├── editorial-tone.md
│   └── critique-mode.md
│
├── scripts/                    # Automazioni
│   ├── build-deck.py
│   └── word-count.sh
│
└── assets/                     # Loghi, immagini, dati grezzi
```

---

## 5. Convenzioni di scrittura (LEGGI PRIMA DI SCRIVERE)

### Lingua
- **Italiano** per tutti i deliverable destinati a PLAI (il bando è italiano, i decision maker sono italiani, l'autenticità linguistica conta).
- **Inglese** solo per la versione internazionale del deck (se richiesta) o per termini tecnici universali.
- Se Claude scrive in inglese per default, **tradurre subito in italiano** — non chiedere conferma.

### Tono
- **Editoriale, non da SaaS generico**. Pensa al tono di una proposta a Feltrinelli o Adelphi, non a un pitch di Y Combinator tradotto male.
- Evita: "rivoluzionare", "disrupt", "leverage", "synergie", "AI-powered" (overused), "game-changer".
- Usa: verbi concreti ("ridurre", "automatizzare", "validare"), numeri reali, riferimenti specifici a opere/autori/case editrici.
- **Mai vendere fumo**. Se non sappiamo qualcosa, dirlo. PLAI valuta startup serie, non TED talk.

### Densità
- **Una frase = un'idea**. Niente paragrafi-fiume.
- Bullet point solo quando l'informazione è davvero elencabile (3+ item paralleli). Altrimenti prosa.
- Numero massimo di parole per ogni risposta del form: rispettare i limiti del form quando noti, altrimenti **≤150 parole per "executive answer"**, **≤400 per descrizioni estese**.

### Formattazione
- Markdown sempre.
- Headings H2 e H3, mai H1 dentro file (l'H1 è il titolo file).
- Tabelle quando confronti opzioni.
- Quote (`>`) solo per citazioni reali (testimonianze, articoli, dati).

---

## 6. Workflow tipo di una sessione Claude Code

Quando Valerio apre una sessione, di solito chiede una di queste cose:

1. **"Lavoriamo su [sezione X]"** → vai in `0X-folder/`, leggi cosa c'è già, identifica i gap, proponi i prossimi 1-3 task concreti, esegui.
2. **"Rivedi [file]"** → modalità critica costruttiva. Usa lo slash command `/pressure-test`.
3. **"Genera il deck"** → leggi `04-pitch-deck/outline.md`, genera markdown slide per slide, poi usa `scripts/build-deck.py` per produrre il pptx.
4. **"Cosa manca per essere pronti?"** → leggi `ROADMAP.md`, fai gap analysis, restituisci una lista prioritizzata.
5. **"Pressure-test il PoC"** → modalità diavolo: fai 10 obiezioni tecniche/strategiche al PoC come se fossi il selection panel PLAI.

### Regole di sessione
- **Sempre** leggere `CLAUDE.md` (questo file) all'inizio di ogni nuova sessione.
- **Sempre** leggere `ROADMAP.md` per capire dove siamo nel piano.
- **Mai** inventare numeri, partnership, traction. Se non c'è, scrivere `[DA VERIFICARE]` o `[DA OTTENERE]`.
- **Sempre** chiedere prima di sovrascrivere file in `01-positioning/` e `03-poc-proposal/` (sono i due asset più strategici).
- Quando completi un task significativo, aggiungi una riga al log in `ROADMAP.md` con data e descrizione.

---

## 7. Tre cose che valgono il 70% del successo

Se ti distrai, ricordati che queste tre cose contano più di tutto il resto:

1. **Il PoC proposal di 90 giorni** (`03-poc-proposal/90-day-plan.md`)
   PLAI ha €100K specifici per PoC. Se il nostro è già chiavi-in-mano, partiamo con un vantaggio enorme. Deve essere così concreto che il selection panel possa immaginarsi di firmare il contratto domani.

2. **La differenziazione vs tool generici** (`01-positioning/differentiation.md`)
   Se PLAI ci vede come "un altro wrapper AI per editor", siamo morti. Dobbiamo dimostrare verticalità tecnica e autorità editoriale in ogni materiale.

3. **Il fit con UNA divisione specifica Mondadori** (`03-poc-proposal/target-division.md`)
   Non parlare di "Mondadori" come monolite. Identifica UNA divisione, UN problema preciso, UN responsabile reale che potrebbe sponsorizzare il PoC. Cita brand, collane, processi specifici.

---

## 8. Cose da NON fare mai

- ❌ Non citare Mondadori in modo generico ("il grande gruppo editoriale"). Sii specifico: brand, collane, persone.
- ❌ Non promettere AGI o "intelligenza editoriale generale". Promettiamo cose misurabili.
- ❌ Non scrivere come ChatGPT scrive di default (frasi compiacenti, "in conclusione", "esploriamo insieme"). Scrivi come un caporedattore.
- ❌ Non includere altre venture di Valerio (PONYX, ProntoSito, Helianta) nel materiale PLAI tranne dove serve come prova di esperienza. PLAI investe in **Kalamos AI**, non in un portfolio.
- ❌ Non inserire frasi che presuppongono il dialogo con un modello AI ("certo, posso aiutarti...", "ottima domanda..."). Tutto il materiale è destinato a esseri umani.
- ❌ Non promettere il PoC su tutto il gruppo Mondadori al day 1. Una divisione, un caso d'uso, poi scaling.

---

## 9. Stato di avanzamento (aggiornare quando cambia)

| Sezione | Stato | Owner | Note |
|---------|-------|-------|------|
| 00-context | 🟢 base esistente | Claude | da arricchire con ricerca aggiornata Mondadori |
| 01-positioning | 🟡 bozza esistente | Valerio+Claude | da rifinire dopo lavoro precedente |
| 02-application | 🔴 da fare | — | partire dopo positioning chiuso |
| 03-poc-proposal | 🟢 design retrospettivo + divisione fissata | Claude | KPI riancorati su recall/κ; validare volumi reali in Fase 1 |
| 04-pitch-deck | 🔴 outline solo | — | da costruire |
| 05-financials | 🔴 da fare | Valerio | esiste in formato vecchio |
| 06-product | 🟡 parziale | Claude+Valerio | architecture + 2 schede di esempio (fit-score per collana) pronte; manca MVP cliccabile |
| 07-research | 🟡 parziale | Claude | competitor + market sizing OK, deep-dive Mondadori manca |
| 08-outreach | 🔴 da fare | Valerio | identificare decision maker PLAI è prioritario |
| 09-demo-day | 🔴 in lontananza | — | solo dopo essere stati selezionati |

Aggiorna questa tabella ogni volta che chiudi una sezione.

---

## 10. Riferimenti rapidi

- **PLAI sito**: https://www.plai-accelerator.com/call-2026/
- **PLAI partner**: Startupbootcamp, I3P, AWS, ElevenLabs, Fastweb+Vodafone, IFAB, Multiversity, PwC, StartupItalia
- **Aree prioritarie**: Education, Retail, New Media & Advertising, **Publishing**, Corporate
- **Investimento iniziale**: €100K equity per startup early-stage in cambio di ~7% (storico 2025)
- **Follow-on potenziale**: fino a €300K totali
- **Budget PoC**: fino a €100K per progetto pilota concreto

---

*Ultimo aggiornamento di questo file: 24 maggio 2026. Aggiornare il timestamp se modifichi il contenuto.*
