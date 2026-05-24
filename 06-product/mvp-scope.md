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
