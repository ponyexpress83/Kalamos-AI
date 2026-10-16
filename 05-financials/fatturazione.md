# Fatturazione

*16 ottobre 2026. Richiesta: «attiva l'emissione automatica delle fatture».*

## Perché oggi non si può attivare

**Non c'è niente che la faccia partire.** La piattaforma non ha prezzi pubblici, pagamenti online né clienti paganti. Le condizioni del pilota si concordano in telefonata (pagina `/pilota`). Un'emissione automatica ha bisogno di un evento (un pagamento, un rinnovo) e di un importo certo: oggi non ci sono né l'uno né l'altro.

**L'invio allo SDI è irreversibile.** Una fattura elettronica sbagliata si corregge solo con una nota di credito. La skill che usi già per Fatture in Cloud lo dice in modo non derogabile: si crea, si verifica, si mostra il riepilogo e si invia solo dopo un sì esplicito. Un invio senza conferma andrebbe contro quella regola.

**Mancano gli accessi.** Servono l'account Fatture in Cloud di Smart Content e, per automatizzare, un'app autorizzata alle sue API, più un fornitore di pagamenti (per esempio Stripe) se il prezzo si incassa online.

## Come si fattura il primo pilota

Con la skill «fattura-fatture-in-cloud», da Claude in Chrome, con conferma prima dell'invio. Un dettaglio: la skill duplica l'ultima fattura del cliente, e una casa editrice nuova non ne ha. La prima volta va creata l'anagrafica in Fatture in Cloud con i dati veri della casa: ragione sociale, P.IVA, codice destinatario o PEC. Quei dati li dà la casa, non vanno ricostruiti.

## Quando ha senso automatizzare

Quando esiste un abbonamento ricorrente con un prezzo fisso. Lo schema consigliato è **semi-automatico**:

1. Il pagamento va a buon fine (per esempio un evento Stripe `invoice.paid`).
2. Kalamos crea la bozza in Fatture in Cloud tramite API, con i dati del cliente già in anagrafica, e lancia la verifica formale.
3. Arriva una mail con il riepilogo, e l'invio allo SDI parte con un clic di conferma.

È la stessa regola della skill, applicata da codice. L'invio interamente automatico si valuta solo dopo qualche mese di bozze senza errori, e con il commercialista.

## Le decisioni che servono prima

1. Prezzi del pilota e dell'abbonamento: le cifre in `business-model.md` sono ipotesi mai provate.
2. Pagamento con bonifico su fattura, oppure carta o addebito online.
3. Accesso API di Fatture in Cloud per Smart Content.
4. Con il commercialista: regime IVA, centro di ricavo, descrizione del servizio in fattura.
