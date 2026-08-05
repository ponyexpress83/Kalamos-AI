# Q&A Prep — Domande probabili dal selection panel

> Le domande più probabili al pitch panel PLAI, con risposte preparate.
> Per la call: leggi prima `briefing-call.md`, che contiene le otto che fanno più male.
> Provare ad alta voce. Risposte target: 30-60 secondi ciascuna.

---

## DOMANDE PRODOTTO

### 1. "Come fate a sapere che il fit-score per collana è davvero migliore di un prompt ben fatto su ChatGPT?"
> Su un singolo manoscritto un prompt ben fatto ci arriva vicino, ed è giusto dirlo. La differenza è su tre cose che un prompt non ha. Primo: il catalogo modellato collana per collana, che l'editore non deve riscrivere ogni volta. Secondo: i controlli che impediscono all'output di inventare — la collana proposta viene verificata contro il catalogo reale e la citazione contro il testo caricato; con ChatGPT una collana inesistente arriva all'editor senza che nessuno se ne accorga. Terzo: il loop di calibrazione, che fa migliorare il sistema a ogni scheda validata. È la differenza fra rispondere bene una volta e migliorare a ogni iterazione.
>
> ⚠️ **Non dire** "è un embedding confrontato con un vector profile": il retrieval vettoriale è progettato, non ancora costruito. Se te lo chiedono, la risposta è al punto 29.

### 2. "Cosa succede se Anthropic / OpenAI lancia un servizio per editori domani?"
> Sarebbe un endorsement della categoria, non una minaccia. Big Tech vende modelli orizzontali; noi vendiamo una soluzione verticale con workflow specifico, lingua italiana, integrazione enterprise editoriale. Se succedesse, diventeremmo target di acquisizione, non vittime.

### 3. "Quanto siete dipendenti da Claude / Anthropic?"
> Oggi giriamo su Claude, e il modello è dietro una sola variabile di configurazione: cambiarlo è una riga, non una riscrittura. Non ho ancora fatto un benchmark comparativo su un altro fornitore — lo dico perché lo scoprireste comunque. Quello che ho misurato è il costo: siamo intorno a tre-sei centesimi per scheda, quindi anche un raddoppio del listino non tocca il modello di business. Il rischio vero non è il prezzo, è la disponibilità del servizio, e si copre con un secondo fornitore in fallback: è lavoro di giorni, non di mesi.

### 4. "Come gestite l'IP del manoscritto?"
> Clausola contrattuale esplicita: il manoscritto resta proprietà dell'autore/editore, mai usato per training del modello base (opt-out garantito da Anthropic), encryption at-rest, isolamento per tenant. È il primo punto che chiediamo di chiarire in ogni contratto pilot.

### 5. "Il fit-score per una collana richiede di avere il corpus pubblicato. Come lo ottenete?"
> Per il PoC, lo costruiamo insieme all'editore: 50-100 titoli pubblicati nella collana target, processati come corpus di calibrazione. Per scalare oltre il PoC, si costruisce una volta sola per collana, poi si aggiorna periodicamente con i nuovi pubblicati.

---

## DOMANDE BUSINESS

### 6. "Avete traction reale?"
> No, e lo dico per primo. Nessun pilota, nessun ricavo, nessuna misura di concordanza con un editor reale. Quello che abbiamo è una demo pubblica funzionante con inferenza vera, nove cataloghi editoriali modellati, e un PoC disegnato fino ai KPI. È esattamente il buco che il PoC deve chiudere — ed è il motivo per cui siamo qui invece che a chiedere un round a un fondo.
>
> ⚠️ Se hai conversazioni qualificate o LOI reali al momento della call, aggiungile qui con nome e data. Se non ce le hai, la risposta sopra è più forte di una vaga: un panel che riceve mille candidature riconosce il vago al primo colpo.

### 7. "Perché un editore dovrebbe comprare da voi e non costruirsi il tool internamente?"
> Tre ragioni. (1) Costo opportunità: un major dovrebbe distogliere 4-6 ML engineer per 18 mesi per arrivare al nostro punto attuale. (2) Verticalità: il fit-score è il risultato di iterazione su workflow editoriali, non solo codice. (3) L'asset di calibrazione: il corpus costruito con i vostri editor — rubrica, esempi giudicati, soglie, titoli riusciti e flop — cresce ogni mese e resta vostro. Un competitor non ce l'ha; un team interno dovrebbe ricostruirlo da zero.
>
> ⚠️ **Non dire mai "network effect fra clienti" o "calibrazioni anonimizzate condivise".** Contraddice la promessa di riservatezza su cui vendiamo la calibrazione (i flop di una casa non escono dal suo perimetro) ed è il modo più rapido per perdere la fiducia di un editore. Il valore si accumula *dentro* ogni relazione, non *fra* i clienti.

### 8. "ARPU 55K vi sembra realistico per il mercato italiano?"
> Sì, ma l'ancora non è il costo della singola scheda — è la capacità. Un editore oggi valuta seriamente meno del 15% di ciò che riceve; con Kalamos copre l'intero flusso, e il valore sta nei manoscritti che oggi non legge affatto. Anche con la stima di settore più prudente sul costo per scheda, su migliaia di schede/anno il valore creato per un Pro tier supera i €300K. ARPU €42K = capture intorno al 14%. Conservativo.

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
> Onesto. *"Abbiamo scelto Sperling & Kupfer e sappiamo perché: il volume di sottomissioni garantisce un archivio con abbastanza titoli acquisiti per validare il recall, l'identità editoriale è definita, c'è apertura all'innovation. La conferma operativa dipende dall'intro che PLAI può facilitare. Se internamente indicate uno sponsor più immediato in un'altra divisione — Einaudi Stile Libero è la più naturale — ci adattiamo."*

### 17. "Cosa fa Kalamos in 12 mesi se entra in PLAI?"
> Tre milestone: (1) 3 pilot enterprise (1 Mondadori + 2 altri editori target), (2) ARR €170K, (3) team 5 persone. KPI di accelerazione: recall ≥80% sui titoli acquisiti, misurato su un archivio retrospettivo di 500+ manoscritti.

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

## DOMANDE TECNICHE (addestramento e difensibilità)

### 26. "Come addestrate il modello? Avete un modello vostro o è una chiamata a Claude?"
> Onestamente: oggi non abbiamo un modello nostro, ed è una scelta. Kalamos gira su Claude. "Addestrare Kalamos" vuol dire quattro cose. Codificare in prompt strutturati la rubrica di valutazione di Sperling — il lavoro degli editor, non nostro. Dare al modello esempi di manoscritti già giudicati, così rispecchia il vostro gusto e non un giudizio generico. Descrivere ogni collana a partire dal catalogo pubblicato, ed è ciò che oggi fa il fit-score; il passo successivo è costruire quel profilo per via vettoriale, così il modello confronta il testo con i passaggi di catalogo più vicini invece che con una descrizione. E tarare le soglie di decisione sui vostri verdetti storici. Il fine-tuning di un modello proprietario è un'ottimizzazione futura, sensata quando i dati la giustificano — non un prerequisito.

### 27. "Allora è prompt engineering con un altro nome. Cosa vi rende difendibili?"
> In parte è giusto chiamarla così, e non mi nascondo. La difensibilità non è nell'algoritmo — embeddare un testo contro un catalogo è cosa nota, un competitor la replica in settimane. È nel corpus di calibrazione: rubrica, esempi gold, soglie, costruiti conversazione per conversazione con i vostri editor. Cresce a ogni mese di uso. Un competitor non lo ha; un team interno dovrebbe ricostruirlo da zero. Vendiamo l'asset accumulato, non il codice.

### 28. "Quanti dati servono perché funzioni? E se l'archivio di Sperling è troppo piccolo?"
> Per la calibrazione bastano poche decine di manoscritti già giudicati: il modello di frontiera fa il lavoro pesante, gli esempi lo orientano. Per la validazione serve invece abbastanza storico da contenere un numero significativo di titoli acquisiti — è la ragione per cui guardiamo a 18-24 mesi di archivio e per cui abbiamo scelto Sperling, che ha il volume giusto. Se l'archivio fosse magro, allarghiamo la finestra temporale prima di ridurre il campione.

---

## DOMANDE NATE DALLA DEMO (le più probabili in call)

### 29. "Perché non usate un database vettoriale? Sarebbe l'approccio standard."
> Perché non l'ho ancora costruito, e preferisco dirvelo che farvelo scoprire. Oggi il catalogo è descritto in modo strutturato — nove case, trentacinque collane reali — e passato al modello insieme al testo. Il retrieval vettoriale serve a due cose precise: restringere il campo, così il modello confronta il manoscritto con le due o tre collane più vicine invece che con tutte, e rendere il fit più difendibile, perché l'editor vede *contro quali passaggi di catalogo* il testo è stato confrontato. È il primo lavoro tecnico del PoC, e ha senso farlo su un catalogo vero, non sui nove che ho modellato per la demo.

### 30. "Come impedite al modello di inventare una collana che non esiste?"
> Con del codice, non con un prompt. La collana che il modello propone viene confrontata con il catalogo reale di quell'editore: se non c'è, viene scartata prima che la scheda arrivi all'editor. Stessa cosa per la citazione: deve comparire nel testo caricato, altrimenti la scheda lo segnala. L'abbiamo costruito dopo un errore vero — in una versione precedente il modello aveva attribuito a un editore una collana inesistente. In redazione basta quello per chiudere la conversazione, e nessun prompt lo impedisce in modo affidabile.

### 31. "Quanto vi costa una scheda?"
> Tre-sei centesimi di API, a seconda della lunghezza del testo. È calcolato sui prompt reali con il listino pubblico, e la demo mostra il costo misurato sui token effettivi a ogni analisi. Il numero interessante non è quello: è che senza il tetto sull'estratto rappresentativo sarebbe circa sette volte tanto. La leva non è il prezzo del modello, è quanto testo gli mandi.

### 32. "Valutate su un estratto e non sul romanzo intero. Non è un limite serio?"
> Per il triage no, ed è deliberato: incipit, campione centrale e finale, con i tagli su confini di scena, bastano a decidere se un testo merita una lettura vera — è più o meno quello che fa un lettore quando deve smaltire una pila. La scheda dichiara sempre quando è prodotta su estratto. Per l'editing strutturale, che è un altro prodotto, serve il testo intero, e lì il costo cambia. Confondere le due cose sarebbe disonesto verso l'editore.

### 33. "E se il modello sbaglia su un manoscritto che poi diventa un bestseller?"
> Succederà, e il sistema è tarato per renderlo meno probabile del contrario: la north-star del PoC è il **recall sui titoli acquisiti** — di ciò che avete comprato, quanto vi avremmo segnalato — non la precisione. Un falso positivo costa un'ora di lettura; un falso negativo costa un libro. E la raccomandazione non è mai un cestino automatico: è un ordine di priorità su una coda che oggi non viene letta affatto.

### 34. "Il vostro sistema segnala i manoscritti scritti con l'IA?"
> Non ancora, è in roadmap, e quando ci sarà non sarà un verdetto. I rilevatori hanno falsi positivi importanti: un falso positivo che chiude la porta a un autore vero è un danno peggiore del problema. Daremo un indicatore con livello di confidenza e i passaggi che l'hanno determinato, e la decisione resterà all'editor. Il contesto è concreto: nel 2025 Kobo ha rifiutato circa il 45% degli autopubblicati ricevuti per sospetta generazione IA. Per noi è anche una questione di posizionamento — Kalamos è un valutatore che difende il lavoro umano, non un generatore.

### 35. "Perché dovremmo darvi i nostri dati di vendita, compresi i fallimenti?"
> Perché sono l'unico modo per non farvi ripagare letture che avete già pagato una volta. I flop dichiarati restano nel perimetro concordato: non escono, non sono visibili ad altre case, non alimentano modelli condivisi. E potete iniziare senza: il PoC parte dall'archivio delle decisioni storiche, che avete già. La calibrazione sulle vendite è il passo due, quando avrete visto come trattiamo il passo uno.

### 36. "Funziona solo in italiano?"
> Oggi è costruito e provato sull'editoria italiana, che è il mercato dove abbiamo l'autorità per parlare. La struttura però non è italiana: i profili di collana sono descrizioni configurabili in qualunque lingua, e il problema — troppi manoscritti, troppo poco tempo di lettura senior — è identico in Francia, Spagna e Germania. La presenza europea del Gruppo è la via naturale di espansione dopo il primo caso d'uso validato, non un'ambizione da slide.

### 37. "La citazione la confrontate parola per parola? È un match esatto?"
> È un match letterale ancorato all'inizio della citazione, con tolleranza sui troncamenti. Se il modello cita una frase lunga e la tronca con i puntini, il controllo accetta la corrispondenza sull'incipit invece di bocciarla: verifica che la frase *cominci* dove dice, non che sia identica fino all'ultima parola. È una tolleranza voluta — un controllo troppo rigido segnalerebbe come sospette citazioni corrette, e un allarme che grida sempre non lo guarda più nessuno.

### 38. "E se il modello sbaglia tutte le collane insieme? Cosa vede l'editor?"
> Vede una stima etichettata come offline, non un giudizio AI spacciato per tale. Se nessuna delle collane proposte esiste nel catalogo, la scheda non passa il controllo e il sistema ripiega sulla valutazione euristica, che porta in cima un banner che dice cos'è. Il sistema degrada, ma non mente mai sulla natura di ciò che mostra: è il comportamento che voglio, perché l'errore che non posso permettermi non è "oggi la qualità è più bassa", è "vi ho dato per buono qualcosa che non lo era".

### 39. "Quanto ci vuole a metterlo dentro il nostro flusso?"
> Per il PoC, niente integrazione: lavoriamo sull'archivio e su una coda separata, così non tocchiamo i vostri sistemi mentre state ancora decidendo se vi serve. L'integrazione — casella di posta dedicata, export nel vostro formato di scheda — è la fase successiva ed è deliberatamente fuori dai novanta giorni. Chiedere a una redazione di cambiare workflow prima di aver visto i risultati è il modo più sicuro di far fallire un pilota.

---

## REGOLE DI RISPOSTA

1. **Mai dire "non lo so"** senza aggiungere "ci stiamo lavorando, te lo dico entro [data]"
2. **Mai bluffare numeri**: i panelist controllano dopo
3. **Pause di 1-2 secondi** prima di rispondere: dà tempo di pensare e fa sembrare ponderato
4. **Non vendere troppo**: una risposta umile e specifica batte una risposta entusiasta e generica
5. **Se la domanda è ambigua**: chiedere chiarimento, non indovinare
6. **Se sbagli**: "Ho risposto male prima, riprendo: [risposta corretta]" — la trasparenza vince
