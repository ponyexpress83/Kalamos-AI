# Revisione dell'informativa privacy

*Pagina `/privacy` (`app/privacy/page.tsx`), confrontata con l'art. 13 GDPR. 16 ottobre 2026.*

> Revisione di lavoro, non parere legale. Le correzioni sono già applicate alla pagina; i punti dell'ultima sezione restano da far decidere a un avvocato abilitato.

## Cosa mancava, e cosa è stato corretto

| Requisito dell'art. 13 | Prima | Ora |
|---|---|---|
| Identità e contatti del titolare (par. 1, a) | Vuoto | Smart Content S.r.l.s. e info@kalamos.studio. **Mancano sede e P.IVA**, da `config/azienda.ts` |
| Dati di contatto del DPO (par. 1, b) | Non detto | Dichiarato che non è nominato |
| Base giuridica per ogni finalità (par. 1, c) | Mancava per i testi analizzati, le statistiche e la sicurezza | Indicata per ciascuna: art. 6.1.b per modulo e analisi, 6.1.f per dati di terzi nei testi, statistiche e sicurezza |
| Legittimi interessi perseguiti (par. 1, d) | Non detti | Esplicitati: fornire il servizio richiesto, misurare l'uso in forma aggregata, proteggere da abusi |
| Destinatari (par. 1, e) | Presenti | Invariati; precisato il ruolo di Vercel anche per i log |
| Trasferimenti extra-SEE e modo di ottenere copia delle garanzie (par. 1, f) | Mancava come ottenere copia | Aggiunto |
| Periodo di conservazione (par. 2, a) | Presente per il modulo | Aggiunto il caso dei log di errore del modulo, che prima non era dichiarato |
| Obbligatorietà del conferimento e conseguenze (par. 2, e) | Non detto | Aggiunto: i campi con asterisco servono a rispondere |
| Decisioni automatizzate (par. 2, f) | Non detto | Aggiunto: la scheda è un supporto, nessuna decisione basata unicamente su trattamento automatizzato (art. 22) |
| Diritti e termine di risposta (par. 2, b; art. 12) | Presenti | Aggiunto il termine di un mese |
| Cookie e memoria locale (art. 122 Codice privacy) | Detto «tecnico» senza riferimento | Spiegato perché non serve consenso |

Due affermazioni sono state rese più prudenti. «Anthropic non usa i dati per addestrare» ora è attribuita ai termini commerciali di Anthropic, invece che affermata da noi. La pagina invita a non caricare testi di terzi senza autorizzazione, né testi con dati particolari.

## Da far decidere all'avvocato

1. **Dati di terzi nei testi della demo pubblica.** Chi carica un manoscritto può caricare dati di persone che non sanno nulla di Kalamos. La base indicata è il legittimo interesse (art. 6.1.f); va verificata, insieme all'obbligo informativo verso quegli interessati (art. 14, con le eccezioni del par. 5).
2. **Dati particolari (art. 9).** Un memoir può contenere dati sanitari di persone reali. Oggi la pagina sconsiglia di caricarli, ma il servizio non lo impedisce. Valutare se basta.
3. **Trasferimenti negli Stati Uniti.** Verificare quale garanzia offre davvero ciascun fornitore (adesione al Data Privacy Framework o clausole standard nel loro DPA), lo stato vigente del Data Privacy Framework e i DPA che Smart Content ha accettato con Vercel, Anthropic e Resend. Da qui non è stato possibile consultarli.
4. **Conservazione di 24 mesi per le richieste di pilota.** È una scelta, non un obbligo: confermarla o cambiarla.
5. **Vercel Web Analytics senza consenso.** Lo strumento non usa cookie e restituisce dati aggregati. Verificare che rientri fra le statistiche che non richiedono consenso secondo le linee guida del Garante sui cookie e altri strumenti di tracciamento.
6. **Registro dei trattamenti (art. 30).** Smart Content dovrebbe tenerne uno: quello di titolare per il sito e quello di responsabile per i piloti.
