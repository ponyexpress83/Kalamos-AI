# MVP Scope — Cosa deve fare Kalamos AI per il pitch PLAI

> Quello che deve essere pronto e dimostrabile **prima del submit**.
> Tutto il resto è feature post-PoC.

---

## MVP must-have (entro submit application)

1. **Upload manoscritto** (PDF, DOCX) con parsing affidabile fino a 150K parole
2. **Generazione scheda di lettura strutturata** con almeno queste sezioni:
   - Sinossi (300 parole)
   - Analisi struttura narrativa
   - Voce e registro
   - Target di mercato e comparable
   - Verdetto operativo (3 opzioni)
3. **Fit-scoring su 1 collana di test** (es. profilo costruito su 50 titoli pubblicati di una collana reale)
4. **Output esportabile** in PDF + JSON
5. **Demo accessibile via link** (no installazione richiesta per il panel)

---

## MVP should-have (forte vantaggio se pronto)

6. **Workspace multi-utente** (editor + lettori)
7. **Versioning della scheda** (editor può modificare e salvare versione finale)
8. **Confronto multi-collana** (stesso manoscritto, fit-score su 3+ collane)
9. **Dashboard volume** (manoscritti in coda, processati, decisi)

---

## Feature post-MVP ad alto valore (roadmap dichiarabile al panel)

### Calibrazione sul catalogo dell'editore (esempi positivi E negativi)
L'editore carica, in un perimetro riservato, titoli già pubblicati che considera
riusciti **e** titoli andati male commercialmente ("flop dichiarati"): i primi
insegnano al sistema lo stile e l'identità della casa, i secondi impediscono di
pre-selezionare opere del tipo che ha già deluso. È l'estensione naturale del
PoC retrospettivo (l'archivio con decisioni storiche è già una calibrazione su
esempi reali) e del loop di feedback dell'editor già presente nella demo.
Requisito non negoziabile: massima confidenzialità (i flop di una casa non
devono mai essere visibili ad altri, né uscire dal perimetro concordato).

### Verifica di provenienza AI (AI-check)
Segnalazione dei manoscritti con probabile scrittura parzialmente o interamente
generata da IA. Contesto di mercato: nel 2025 Kobo ha rifiutato ~45% dei libri
autopubblicati ricevuti per sospetta generazione IA di bassa qualità (fonte:
Livres Hebdo / ActuaLitté, dichiarazioni del CEO Michael Tamblyn); le grandi
case francesi dichiarano di rifiutare libri scritti con IA ma alcuni passano
comunque il filtro. Per gli editori un pre-screening di provenienza è una
garanzia di serietà, e rafforza il nostro posizionamento: Kalamos è un
**valutatore** che difende il lavoro umano, non un generatore.
Vincolo di onestà: i rilevatori IA hanno falsi positivi significativi → il
segnale va presentato come **indicatore con livello di confidenza**, mai come
verdetto automatico; la decisione resta all'editor. Non promettere "detection
certa" al panel: promettere il segnale calibrato e il workflow di verifica.

---

## MVP nice-to-have (post-pilot, non bloccare)

10. Integrazione email per ricezione manoscritti automatica
11. Mobile companion per editor in viaggio
12. Estensione browser per import da Gmail
13. Multilingua output (EN, ES, FR)
14. Analytics di trend (cosa emerge dai manoscritti del mese)

---

## Cosa NON va costruito ora (anti-feature)

- ❌ Generazione di testo editoriale (Kalamos NON scrive)
- ❌ AI per gli autori (saremmo nel mercato consumer Sudowrite — sbagliato)
- ❌ Marketplace manoscritti
- ❌ Social/community features
- ❌ AI per la copertina, marketing del libro, ecc.

---

## Demo path (cosa mostrare a Mondadori / panel PLAI)

**Scenario di demo da provare 20 volte**:

1. Editor apre Kalamos, dashboard mostra "12 nuovi manoscritti in coda"
2. Click su manoscritto X → vede la scheda generata, tempo di lettura della scheda: 3-4 minuti
3. Scheda mostra fit-score per la collana "Strade Blu" (es. 72/100) — buon match
4. Editor scrolla verdetto operativo: "Richiamare l'autore per chiedere capitoli aggiuntivi"
5. Editor clicca "Esporta scheda PDF" → genera documento professionale
6. Editor torna alla dashboard, vede metriche: "questa settimana 47 manoscritti processati, 6 selezionati per lettura integrale"

**Durata demo: 60-90 secondi.** Se serve di più, è troppo complessa.

---

## Stato attuale (da aggiornare)
- [ ] Upload + parsing: status?
- [ ] Generazione scheda: status?
- [ ] Fit-scoring: status?
- [ ] Demo link funzionante: status?
- [ ] Manoscritto reale processato e validato da lettore senior: status?

## Action critica
**Se l'MVP non è demo-ready entro 3 settimane dal submit**: posticipare il submit. PLAI è rolling. Meglio submit forte tra 6 settimane che debole adesso.
