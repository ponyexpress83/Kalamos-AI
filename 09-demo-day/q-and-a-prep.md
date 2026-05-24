# Q&A Prep — Domande probabili dal selection panel

> Le 25 domande più probabili al pitch panel PLAI, con risposte preparate.
> Provare ad alta voce. Risposte target: 30-60 secondi ciascuna.

---

## DOMANDE PRODOTTO

### 1. "Come fate a sapere che il fit-score per collana è davvero migliore di un prompt ben fatto su ChatGPT?"
> Il fit-score non è un prompt: è un embedding del manoscritto confrontato con un vector profile costruito sul corpus pubblicato della collana. ChatGPT con il miglior prompt può imitarne l'output, ma non ha né il vector profile né il loop di calibrazione editor che noi alimentiamo nel tempo. È la differenza tra rispondere bene una volta e migliorare a ogni iterazione.

### 2. "Cosa succede se Anthropic / OpenAI lancia un servizio per editori domani?"
> Sarebbe un endorsement della categoria, non una minaccia. Big Tech vende modelli orizzontali; noi vendiamo una soluzione verticale con workflow specifico, lingua italiana, integrazione enterprise editoriale. Se succedesse, diventeremmo target di acquisizione, non vittime.

### 3. "Quanto siete dipendenti da Claude / Anthropic?"
> L'architettura è LLM-agnostic. Oggi usiamo Claude perché ha qualità superiore su task narrativi lunghi e finestra di contesto utile. Abbiamo testato fallback su modelli secondari per resilienza. Se Anthropic triplicasse i prezzi, potremmo passare a modelli open-source self-hosted con qualità accettabile, perdendo 10-15% di accuratezza ma non il prodotto.

### 4. "Come gestite l'IP del manoscritto?"
> Clausola contrattuale esplicita: il manoscritto resta proprietà dell'autore/editore, mai usato per training del modello base (opt-out garantito da Anthropic), encryption at-rest, isolamento per tenant. È il primo punto che chiediamo di chiarire in ogni contratto pilot.

### 5. "Il fit-score per una collana richiede di avere il corpus pubblicato. Come lo ottenete?"
> Per il PoC, lo costruiamo insieme all'editore: 50-100 titoli pubblicati nella collana target, processati come corpus di calibrazione. Per scalare oltre il PoC, si costruisce una volta sola per collana, poi si aggiorna periodicamente con i nuovi pubblicati.

---

## DOMANDE BUSINESS

### 6. "Avete traction reale?"
> Onestà calibrata sui numeri reali. Esempio: "Oggi abbiamo [N] conversazioni qualificate, [N] LOI, MVP processato su [N] manoscritti reali. PLAI è esattamente l'acceleratore della prima fase enterprise, non un sostituto del go-to-market."

### 7. "Perché un editore dovrebbe comprare da voi e non costruirsi il tool internamente?"
> Tre ragioni. (1) Costo opportunity: un major dovrebbe distogliere 4-6 ML engineer per 18 mesi per arrivare al nostro punto attuale. (2) Verticalità: il fit-score è il risultato di iterazione su workflow editoriali, non solo codice. (3) Network effect: ogni cliente Kalamos beneficia delle calibrazioni anonimizzate dell'intero network.

### 8. "ARPU 55K vi sembra realistico per il mercato italiano?"
> Sì, perché stiamo sostituendo €150-500 per scheda × migliaia di schede/anno. Per un Pro tier che processa 2.000 manoscritti, il valore creato è 300K+. ARPU 42K = capture del 14%. Conservativo.

### 9. "Quanto è lungo il sales ciclo enterprise editoriale?"
> 4-9 mesi. È lento e va detto. È il motivo per cui chiediamo l'accelerazione PLAI: il warm intro Mondadori comprime quel ciclo da 9 a 3 mesi per i primi 2-3 contratti.

### 10. "Churn previsto?"
> 8% annuo stato steady, più alto nei primi 6 mesi post-onboarding (rischio adoption interno). Mitigato con customer success dedicato e calibrazione iterativa.

---

## DOMANDE TEAM

### 11. "Chi siete?"
> Risposta breve: 1 frase per persona. *"[Valerio]: 8 anni di sviluppo, integrazione AI in pipeline produttive, laurea in Filologia Moderna. [Ilaria]: poetessa pubblicata da Pequod, voce editoriale che valida ogni output. [Advisor X]: ex-[nome editore], 20 anni di esperienza editoriale."*

### 12. "Siete un solo founder operativo?"
> [Se vero]: "Sì, oggi sì. È un limite che PLAI ci aiuta a risolvere: il primo hire post-accelerazione è un co-founder tecnico / operativo già identificato e in discussione."
> 
> [Se non vero]: chiarire chi è co-founder, ruolo, equity, vesting.

### 13. "Qualcuno del team ha esperienza enterprise sales?"
> [Onesto]: "Nel team core no. Per questo cerchiamo advisor con esperienza enterprise editoriale e supporto del network PLAI nelle prime trattative."

### 14. "Avete advisor editoriali?"
> [Critico — vedi action item: ingaggiare 1 advisor di nome PRIMA del submit].
> Risposta forte: *"Sì, [Nome cognome, ruolo passato in major editore]. Ci aiuta sul prodotto e sull'introduzione al network."*
> Risposta debole (se ancora no): *"Stiamo finalizzando l'ingaggio di [profilo]. Sarà annunciato entro [data]."* — meno forte ma onesta.

---

## DOMANDE STRATEGICHE

### 15. "Perché PLAI e non un VC normale?"
> Tre motivi specifici di PLAI: (1) accesso operativo Mondadori per PoC su dati reali, (2) network publishing italiano via i partner, (3) timing — accelerazione coincide con la nostra fase di product-market fit enterprise. VC ci darebbe solo capitale.

### 16. "Sperling come primary target: avete confermato il loro interesse?"
> Onesto. *"Abbiamo identificato Sperling come primary per fit volume/innovazione. Conferma operativa dipende dall'intro che PLAI può facilitare in fase di onboarding. Plan B: Einaudi Stile Libero, identificato come backup. Plan C: collaborare con il team PLAI per identificare la divisione meglio allineata."*

### 17. "Cosa fa Kalamos in 12 mesi se entra in PLAI?"
> Tre milestone: (1) 3 pilot enterprise (1 Mondadori + 2 altri editori target), (2) ARR €170K, (3) team 5 persone. KPI di accelerazione: 80% concordanza Kalamos vs lettore senior misurata su 500+ manoscritti.

### 18. "Cosa fa Kalamos in 12 mesi se NON entra in PLAI?"
> Stesso prodotto, sales ciclo più lungo (12-18 mesi per primi 2 contratti), probabile fundraising seed esterno per coprire il gap. Va detto perché segnala risolutezza, non disperazione.

### 19. "Qual è il rischio numero 1 del business?"
> Adoption editor. Il prodotto può essere tecnicamente perfetto, ma se gli editor senior lo percepiscono come minaccia o lo usano male, il valore non si materializza. Per questo il PoC ha KPI espliciti su Editor NPS (target ≥40) e include training/change management.

### 20. "Cosa NON costruirete mai?"
> Generazione di testo editoriale. Kalamos legge e valuta, non scrive. È la linea che teniamo per credibilità nel settore.

---

## DOMANDE PERSONALI / FOUNDER

### 21. "Cosa ti ha portato a fare questo?"
> [Risposta autentica, breve]. Esempio: *"Lavoro tra sviluppo software e editoria da anni. Ho visto editori bravi rifiutare manoscritti che non avevano mai letto, e lettori bravi sprecare settimane su materiale che si chiude in 20 minuti. Il problema è strutturale, non culturale: si può risolvere con uno strumento, mantenendo il giudizio umano dove conta."*

### 22. "Sei full-time su Kalamos?"
> [Onesto]. *"Sto completando la transizione da [contesto Smart Content]. Sarò full-time entro [data]. Nel frattempo, dedico [X]% del tempo a Kalamos."*

### 23. "Hai mai costruito una startup prima?"
> [Onesto]. *"Ho costruito e venduto [Smart Content Srls]. Operatività e cessione del business, non un exit da copertina ma un ciclo completo che mi ha insegnato cosa funziona e cosa no nel B2B italiano."*

---

## META — Domande sul processo

### 24. "Avete già fatto application altrove?"
> [Onesto]. Citare eventuali altre competition / acceleratori a cui avete applicato (WMF Startup, CNA Cambiamenti, ecc.). Non c'è esclusiva PLAI. Solo dire che PLAI è la prima scelta per integrazione Mondadori.

### 25. "Quanto velocemente potete chiudere se passate?"
> Pronti a firmare term sheet entro 30 giorni dalla comunicazione positiva, on-board entro 60 giorni, operativi su PoC entro 90 giorni. Tempistica realistica.

---

## REGOLE DI RISPOSTA

1. **Mai dire "non lo so"** senza aggiungere "ci stiamo lavorando, te lo dico entro [data]"
2. **Mai bluffare numeri**: i panelist controllano dopo
3. **Pause di 1-2 secondi** prima di rispondere: dà tempo di pensare e fa sembrare ponderato
4. **Non vendere troppo**: una risposta umile e specifica batte una risposta entusiasta e generica
5. **Se la domanda è ambigua**: chiedere chiarimento, non indovinare
6. **Se sbagli**: "Ho risposto male prima, riprendo: [risposta corretta]" — la trasparenza vince
