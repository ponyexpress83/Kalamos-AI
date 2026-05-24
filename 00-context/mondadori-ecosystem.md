# Ecosistema Gruppo Mondadori — Mappa per Kalamos AI

> Documento di lavoro. Da arricchire con ricerca puntuale (sito mondadorigroup.com, LinkedIn, bilanci annuali). Le note `[VERIFICARE]` indicano dati da confermare.

---

## Vista d'insieme

Il **Gruppo Mondadori** è il primo gruppo editoriale italiano. Quotato a Piazza Affari (BIT: MN). Operativo principalmente in 4 aree:

1. **Libri** (trade publishing, education, retail)
2. **Magazines** (consumer magazines, digital)
3. **Retail** (catene librerie, distribuzione)
4. **Education** (scolastica, formazione)

Per Kalamos AI il focus è **Libri Trade**, con interesse secondario per Education e Magazines.

---

## Divisioni Libri Trade — mappatura per fit Kalamos

> Questa è la sezione più importante. Identificare LA divisione target per il PoC.

### Casa editrice generaliste / commerciali

**Mondadori Libri Trade** (la "mainstream")
- Catalogo molto ampio, narrativa commerciale, saggistica generale
- Volume manoscritti in arrivo: probabilmente alto
- Fit Kalamos: ✅ Alto per triage iniziale, scoring di fit, comparable analysis

**Sperling & Kupfer**
- Narrativa commerciale, manualistica, self-help, true crime
- Pubblico ampio, ricerca di nuove voci
- Volume manoscritti: alto, con molti unsolicited
- Fit Kalamos: ✅✅ **Candidato principale per PoC** — alto volume + need di triage rapido + identità editoriale chiara da matchare

**Piemme**
- Narrativa per ragazzi, narrativa adulta, saggistica
- Brand storico, lavora molto su scouting agenzie
- Fit Kalamos: ✅ Buono, ma probabilmente meno volume unsolicited

### Case editrici di valore / letterarie

**Einaudi**
- Letteratura alta, saggistica accademica
- Acquisizioni molto curate, processo lungo
- Fit Kalamos: 🟡 Possibile per supporto editing, meno per triage (volume manoscritti più contenuto, qualità editoriale fortemente human-driven)

**Einaudi Stile Libero**
- Narrativa contemporanea italiana e internazionale
- Volume più alto di Einaudi, ricerca di voci nuove
- Fit Kalamos: ✅✅ **Secondo candidato per PoC** — alta sensibilità su scouting + identità editoriale forte = sfida ideale per "fit scoring"

**Frassinelli, Bompiani, Marsilio**
- Catalogo letterario di prestigio
- Acquisizioni curate
- Fit Kalamos: 🟡 Possibile per advanced editorial workflow, non per triage

### Case editrici di nicchia

**Strade Blu (collana Mondadori)**
- Thriller / suspense di alta qualità
- Identità di collana fortissima
- Fit Kalamos: ✅ Eccellente per "fit scoring" — identità chiara da matchare contro manoscritti

**Rizzoli** (parte del gruppo)
- Narrativa, saggistica, illustrati
- Volume alto
- Fit Kalamos: ✅ Buono

### Education

**Mondadori Education**
- Manuali scolastici, formazione adulti
- Use case diverso (non manoscritti narrativi)
- Fit Kalamos: 🟡 Estensione futura possibile, non per il PoC iniziale

---

## Top 3 divisioni candidate per PoC (analisi comparativa)

| Criterio | Sperling & Kupfer | Einaudi Stile Libero | Strade Blu |
|----------|-------------------|---------------------|------------|
| Volume manoscritti annuo | ~Alto | ~Medio-alto | ~Medio |
| Identità editoriale matchabile | Buona | Forte | Fortissima |
| Apertura a innovation | Storica | Media | Bassa-media |
| Dolore visibile su triage | Sì | Sì | Meno |
| Risparmio potenziale del PoC | Alto | Alto | Medio |
| Visibilità del successo | Alta (volume) | Altissima (prestigio) | Alta (verticalità) |

**Raccomandazione operativa**: PoC principale su **Sperling & Kupfer** (massimo impatto operativo immediato) + caso d'uso secondario su **Einaudi Stile Libero** (massima credibilità editoriale del risultato).

⚠️ Questa scelta va validata in `03-poc-proposal/target-division.md` con ricerca puntuale sul volume manoscritti reale di ogni divisione.

---

## Decision makers (da mappare con LinkedIn)

> Fare ricerca puntuale e popolare `08-outreach/plai-decision-makers.md`.

Ruoli da identificare:

**Lato PLAI (acceleratore)**
- Head of PLAI
- Investment Manager
- Program Manager
- AI Tech Lead PLAI

**Lato Mondadori (corporate)**
- Antonio Porro — CEO Gruppo Mondadori
- CTO Gruppo Mondadori
- Chief Digital Officer
- Director of Innovation

**Lato Mondadori (Publishing)**
- Direttore Editoriale Sperling & Kupfer
- Direttore Einaudi Stile Libero
- Responsabile Scouting Mondadori Libri Trade
- Responsabile Diritti

**Lato editoriale operativo (per validation interviews)**
- Editor senior (5-10 per validare il problem statement)
- Lettori freelance Mondadori (5+ per capire workflow attuale)
- Agenti letterari (3-5 per capire il lato submission)

---

## Workflow editoriale tipo (la cosa che Kalamos AI vuole automatizzare)

> Versione semplificata. Da validare con interviste a editor.

1. **Submission**: manoscritto arriva (via agente, scout, unsolicited)
2. **Pre-triage** (segreteria editoriale): smistamento per genere/collana → 1-3 giorni
3. **Prima lettura** (lettore esterno / interno): scheda di lettura → **5-15 giorni di lavoro per manoscritto**
4. **Valutazione editoriale** (editor): legge scheda + estratti, decide se procedere → 1-2 settimane
5. **Acquisition meeting** (collegio editoriale): decisione finale di acquisto → bimestrale tipicamente
6. **Negoziazione diritti**: con autore/agenzia

Il collo di bottiglia critico: **step 3-4** (prima lettura e valutazione). Tempo medio dal submission al "sì/no" finale: **3-9 mesi**. Tasso di accettazione: **<2%** della maggior parte dei publisher trade.

**Cosa fa Kalamos AI**: comprime drasticamente lo step 3 (da settimane a ore) e supporta lo step 4 fornendo all'editor scheda di lettura + comparable analysis + fit scoring già pronti.

---

## Sezioni da arricchire

- [ ] Volume manoscritti annuo per divisione (numeri reali)
- [ ] Costo medio di una scheda di lettura (€)
- [ ] Tempo medio dal submission al rifiuto/accettazione per divisione
- [ ] Numero lettori interni/esterni per divisione
- [ ] Tasso accettazione storico per divisione
- [ ] Esistenza di tool digitali interni (workflow management, scoring)
- [ ] Esperimenti AI passati di Mondadori (cosa hanno provato, cosa non ha funzionato)
