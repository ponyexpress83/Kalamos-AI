# PLAI Application Form — Master

> Questo file contiene le risposte a tutti i campi del form PLAI in versione draft. Compilare in italiano. Quando il form è online, copiare campo per campo.
>
> **Nota importante**: il form esatto va recuperato sul sito plai-accelerator.com/call-2026 al momento della submission. Le sezioni qui sono dedotte da convenzioni accelerator + analisi batch precedenti. **Verificare il form ufficiale prima di considerare questo file definitivo.**

---

## SEZIONE 1 — Anagrafica startup

### 1.1 Nome startup
**Kalamos AI**

### 1.2 Website
[DA OTTENERE — landing minimale almeno entro submission]

### 1.3 Sede legale
[DA DEFINIRE — probabile Grosseto o Milano, in base a costituzione SRL]

### 1.4 Anno di fondazione
2026 (in corso di costituzione)

### 1.5 Numero dipendenti
2 founder + 1-2 advisor (in fase di onboarding)

### 1.6 Stage
**Pre-seed / Pre-product** — concept validato, MVP in costruzione, candidatura PoC pronta per primo deployment

### 1.7 Vertical principale
**Publishing**

### 1.8 Vertical secondari di applicabilità
New Media & Advertising, Education

### 1.9 Logo
[Asset da preparare — vedi `assets/`]

### 1.10 Pitch in una frase (max ~150 caratteri)
*Kalamos AI è l'infrastruttura di intelligenza editoriale che permette ai grandi editori di valutare 10× più manoscritti senza perdere il giudizio umano.*

---

## SEZIONE 2 — Problema e soluzione

### 2.1 Problema (300-500 parole)

I grandi publisher trade italiani ricevono tra 5.000 e 20.000 manoscritti all'anno, tra sottomissioni dirette, agenzie letterarie e scouting. Il processo standard di valutazione prevede che ogni manoscritto significativo venga sottoposto a una "scheda di lettura" — un documento strutturato di 2-5 pagine che sintetizza la trama, valuta la qualità della prosa, identifica il target demografico, propone titoli comparabili e raccomanda un'azione editoriale.

Una scheda di lettura fatta bene richiede 5-15 giorni di lavoro da parte di un lettore esperto e costa al publisher tra 150 e 500 euro tra retribuzione e overhead organizzativo. Anche un grande publisher può permettersi di produrre schede formali solo per una frazione dei manoscritti ricevuti — il resto viene rifiutato sulla base di sinossi, lettere di accompagnamento, o intuizione veloce di una segreteria editoriale.

Questo collo di bottiglia produce tre conseguenze concrete:

1. **Perdita di valore editoriale**: una parte di opere meritevoli viene rifiutata senza essere letta davvero, perché il filtro iniziale è imperfetto. Storicamente, molti casi editoriali importanti sono stati pubblicati solo dopo molteplici rifiuti.

2. **Time-to-market dilatato**: dal momento della submission al "sì/no" finale possono passare 3-9 mesi, periodo durante il quale l'autore può anche ritirare il manoscritto o accettare altre offerte.

3. **Costo operativo lineare**: l'unico modo per leggere più manoscritti è assumere più lettori, scalando i costi linearmente. Questo è economicamente insostenibile in un settore con margini compressi e backlist sempre più frammentata.

Il problema è particolarmente acuto per **divisioni editoriali con identità di collana forte** (es. Strade Blu, Einaudi Stile Libero, Sellerio La memoria) dove la valutazione richiede non solo qualità generale del testo ma anche fit specifico con l'estetica e il pubblico della collana — un giudizio che richiede esperienza profonda del catalogo.

Le soluzioni AI generaliste (ChatGPT, Claude usati ad hoc dall'editor) sono inadeguate: producono output non strutturato, richiedono prompt sofisticati per ogni sessione, e non capiscono il concetto di identità editoriale. I tool internazionali esistenti (Sudowrite, Spines, ProWritingAid) sono costruiti per autori indipendenti, non per publisher trade, e non parlano la lingua del settore.

**Word count attuale: ~370 parole. Soglia ok.**

### 2.2 Soluzione (300-500 parole)

Kalamos AI è un SaaS B2B che produce schede di lettura editoriali strutturate in meno di un minuto per manoscritto (triage su estratto rappresentativo; sotto i 30 minuti sul testo integrale), calibrato sull'identità di una specifica collana o casa editrice. Il sistema è costruito su tre componenti tecniche:

1. **Editorial analysis engine**: pipeline AI multi-step che processa il manoscritto integrale producendo sintesi strutturata (trama, personaggi, tematiche), valutazione qualitativa della prosa, identificazione del target demografico e di mercato, raccomandazione editoriale.

2. **Editorial identity scorer**: modello di fit-scoring che valuta quanto un manoscritto sia coerente con l'identità editoriale di una collana specifica. Lo stesso testo riceve scoring diversi se valutato per Strade Blu vs Einaudi Stile Libero vs Mondadori Libri Trade — un differenziale tecnico che richiede vera comprensione editoriale e che nessun tool generalista può replicare.

3. **Comparable engine**: identificazione di titoli comparabili sul mercato italiano e internazionale, con stima qualitativa di performance commerciale e posizionamento.

L'output di Kalamos è una scheda di lettura strutturata in formato compatibile con i template editoriali esistenti dei publisher trade — questo riduce la friction di adozione: l'editor non deve cambiare workflow, riceve solo input più ricco e veloce.

La differenza tecnica chiave rispetto a un ChatGPT generico non sta nella sofisticatezza del modello base (usiamo i migliori LLM disponibili: Claude, GPT-4 e successori) ma nell'**architettura specializzata**: prompt engineering verticale, retrieval su corpus di valutazioni editoriali, scoring calibrato per collana, output strutturato. Tutto questo richiede competenza editoriale autentica nel team che costruisce — non si replica leggendo qualche libro di publishing.

**Il valore concreto per un publisher**:
- Riduzione del tempo per scheda da giorni a meno di un minuto per il triage. La baseline di 5-15 giorni è una stima di settore [DA VERIFICARE sui dati reali dell'editore in Fase 1 del PoC]: il rapporto va misurato, non annunciato
- Riduzione del costo per scheda da €150-500 a <€15 all-in (~95% riduzione costo)
- Possibilità di valutare in modo informato 10× più manoscritti senza assumere lettori
- Recupero di valore editoriale da manoscritti che sarebbero stati rifiutati senza lettura

**L'editor umano resta nel loop**: Kalamos non decide cosa pubblicare, produce input più ricco al decisore. Il valore è amplificazione di capacità, non sostituzione di giudizio.

**Word count attuale: ~360 parole. Soglia ok.**

### 2.3 Mercato target
- **Primario**: case editrici trade italiane con volume >1.000 manoscritti/anno (5-10 grandi gruppi)
- **Secondario**: agenzie letterarie italiane e UE
- **Terziario (espansione futura)**: case editrici trade UE in Spagna, Francia, Germania

### 2.4 Stima TAM/SAM/SOM
> Da rifinire in `07-research/market-sizing.md`, ma per submission:

- **TAM** (publishing trade Italia + UE): ~€500M spesa annua in valutazione editoriale e workflow tools
- **SAM** (publishing trade Italia, segmento gross): ~€80M
- **SOM** (segmento serviceable nel primo 3 anni): ~€8-15M

---

## SEZIONE 3 — Tecnologia

### 3.1 Tecnologie usate
- Foundation models: Claude (Anthropic), GPT-4+, modelli open-source per task specifici
- Backend: Python, FastAPI, Postgres, pgvector
- Frontend: Next.js, TypeScript
- Infrastructure: AWS (con credits PLAI partner)
- ML Ops: Modal, LangSmith / Helicone per monitoring prompt

### 3.2 Grado di innovazione
**Innovazione applicativa verticale**: non sviluppiamo nuovi modelli AI fondamentali, ma costruiamo un'architettura specializzata che esistenti foundation models possano essere applicati con efficacia in un dominio (publishing trade italiano) che nessun tool generico copre. La novità sta nella combinazione di:
- Prompt engineering verticale validato da expert editoriali
- Retrieval su corpus di valutazioni editoriali
- Fit-scoring per identità di collana (tecnica originale)
- Output strutturato compatibile con workflow esistenti

### 3.3 IP / brevetti
Nessun brevetto al momento. Vantaggio difensivo principale: prompt library + dataset di calibrazione editoriale + relazioni con publisher trade.

### 3.4 Roadmap tecnologica 12 mesi
- M0-M3: MVP + PoC Mondadori (se selezionati)
- M3-M6: Generalizzazione del PoC, addizione di 2-3 publisher trade pilot
- M6-M9: Espansione modulare (es. modulo agenzie letterarie, modulo magazine)
- M9-M12: Espansione UE (primo mercato secondario)

---

## SEZIONE 4 — Business model

### 4.1 Come monetizziamo
SaaS B2B con pricing per tier basato su volume manoscritti processati e numero di "identità editoriali" configurabili. Tier indicativi (da rifinire in `05-financials/business-model.md`):

- **Starter**: fino a 200 manoscritti/anno, 1 identità di collana — €2.500/mese
- **Professional**: fino a 1.000 manoscritti/anno, 5 identità — €8.000/mese
- **Enterprise**: volume custom, identità illimitate, integrazioni custom — €25.000/mese + setup

### 4.2 Unit economics (indicative)
- CAC stimato: €5.000-15.000 per cliente Enterprise (cycle vendita lungo, B2B)
- LTV stimato (3 anni): €200.000-500.000 per cliente Enterprise
- Margine lordo: 70-80% (costi dominati da API LLM)
- Payback period: 4-8 mesi

### 4.3 Pricing strategy
Pricing premium giustificato dalla verticalità e dal valore tangibile (riduzione costo schede di 10-20×). Non competiamo su prezzo con ChatGPT — competiamo su qualità di workflow editoriale.

---

## SEZIONE 5 — Traction & validation

### 5.1 Traction attuale
**Pre-revenue, pre-product launch.** In fase di pre-validation con conversazioni informali con editor e agenti letterari italiani.

### 5.2 Pilot / LOI / clienti in pipeline
[DA OTTENERE prima della submission — almeno 2-3 lettere di intenti informali da editor / consulenti editoriali]

### 5.3 Partner strategici attuali
[Eventuali advisor, mentor, partner tecnici già onboard. Da popolare onestamente.]

---

## SEZIONE 6 — Team

### 6.1 Founder (bios brevi)
> Vedi `00-context/team-bios.md` versione 3 righe per ciascuno.

### 6.2 Equity split
[DA DEFINIRE]

### 6.3 Full-time / part-time
- Valerio: full-time committed da costituzione SRL
- Ilaria: part-time iniziale, full-time se PoC ottenuto
- Altri membri: TBD

### 6.4 Advisor
[DA INGAGGIARE prima della submission — almeno 1 advisor editoriale di settore]

---

## SEZIONE 7 — Fit con PLAI e Gruppo Mondadori

### 7.1 Perché PLAI
PLAI è l'unico acceleratore italiano con focus esplicito su AI applicata + sponsor industriale nel publishing (Mondadori). Per noi è il fit perfetto: il vostro vertical Publishing è il nostro mercato primario, il vostro sponsor è il nostro cliente ideale, e i vostri partner (AWS, Startupbootcamp) coprono esattamente le competenze tecniche e di acceleration che mancano nel nostro team early-stage.

### 7.2 Cosa cerchiamo da PLAI
1. Capitale (€100K initial + follow-on potenziali) per costruire MVP e raggiungere prima validation di mercato
2. **Accesso a una divisione Mondadori per PoC operativo di 90 giorni** (descritto in dettaglio nella nostra proposta PoC allegata)
3. Mentorship strategica (commerciale, fundraising successivo)
4. Network industriale per espansione a publisher trade italiani secondari

### 7.3 Proposta PoC concreta
**Abbiamo già una proposta operativa pronta**: PoC di 90 giorni su Sperling & Kupfer, con un braccio retrospettivo su ~300 manoscritti già valutati dall'archivio (le decisioni editoriali storiche sono il ground truth) più un pilot live di 30-50 manoscritti per testare workflow e tempi. KPI primario: recall sui titoli che la divisione ha effettivamente acquisito. Questo disegno non chiede ai lettori Mondadori di rileggere centinaia di manoscritti. Budget €100K compatibile con allocation PLAI. Tutto documentato nel one-pager allegato.

> Allegare in submission: `03-poc-proposal/poc-onepager.pdf` (da generare)

### 7.4 Cosa offriamo a Mondadori (oltre alla soluzione tecnica)
- First-look su deployment esteso post-PoC
- Co-branding sul case study di successo
- Possibilità di prelazione su licensing o partnership esclusiva nel mercato italiano per N mesi

---

## SEZIONE 8 — Funding & ask

### 8.1 Ask totale a PLAI
€100K equity initial + €100K budget PoC (= €200K total resources). Open a follow-on €200K in fase post-PoC se i KPI sono raggiunti.

### 8.2 Use of funds €100K equity
- 40% sviluppo prodotto (MVP + iterazione post-PoC)
- 25% team (consulenti tech + editorial)
- 20% commerciale e business development
- 10% operations (legal, GDPR, contabilità)
- 5% buffer

### 8.3 Funding già raccolto
[DA POPOLARE — onesti se zero, segnalare bootstrap di Valerio se applicabile]

### 8.4 Round successivi previsti
Seed €500K-1M in fase M12-M18 (post-PoC validato), pre-Series A €2-3M in fase M18-M24.

---

## SEZIONE 9 — Domande aperte tipiche di un application form

### 9.1 "Perché ora?"
La convergenza di 3 fattori rende questo il momento giusto:
1. **Tecnologia matura**: i foundation models hanno raggiunto la soglia di qualità per produrre output editoriale credibile (era impensabile 18 mesi fa)
2. **Pressione economica sul publishing trade**: margini in compressione, necessità di efficientare workflow non più rimandabile
3. **Vuoto competitivo**: il segmento "AI verticale per publisher trade" non ha ancora un player dominante nel mercato italiano

### 9.2 "Qual è il vostro più grande rischio?"
**Adozione editor-side**: anche se il sistema è tecnicamente valido, una resistenza culturale al ruolo dell'AI nei flussi editoriali può rallentare l'adozione. Mitigazione: framing chiaro "potenziamento non sostituzione" + coinvolgimento editor nel processo di calibrazione + advisor editoriale di settore nel team.

### 9.3 "Avete competitor?"
Nessun competitor verticale italiano identificato. Concorrenti potenziali futuri: (a) startup internazionali che entrano in IT, (b) Mondadori o altri editori che internalizzano lo sviluppo, (c) tool generici che si specializzano. Dettaglio in `07-research/competitors.md`.

### 9.4 "Perché vincereste vs un team interno Mondadori che fa la stessa cosa?"
Velocità (3 mesi vs 12-18), competenza verticale già accumulata, focus dedicato (non distratto da altre priorità), scalabilità verso altri publisher (Mondadori potrebbe rivendere o licensare la soluzione co-sviluppata, se desidera).

---

## CHECKLIST PRE-SUBMISSION

Prima di submittare, verificare:

- [ ] Tutte le `[DA POPOLARE]` sono state risolte o sostituite con bozze accettabili
- [ ] Word count rispettato per ogni sezione (tipicamente form PLAI ha limiti hard)
- [ ] Allegato PoC one-pager PDF
- [ ] Allegato pitch deck PDF (12 slide)
- [ ] Logo allegato in PNG ad alta risoluzione
- [ ] Bio team complete con LinkedIn link
- [ ] Privacy policy e termini compresi
- [ ] **`/pressure-test` eseguito sulla risposta più lunga (problema/soluzione)**
- [ ] **`/plai-fit-check` eseguito sulla candidatura completa**
- [ ] Versione final inviata anche per warm intro a 1-2 persone PLAI prima della submission ufficiale (se applicabile)

---

## Versioning

| Versione | Data | Note |
|----------|------|------|
| v0.1 | 2026-05-24 | Bozza iniziale strutturata, molti campi da popolare |
