/**
 * Chi pubblica il sito. DA COMPLETARE PRIMA DEL LANCIO.
 *
 * - La partita IVA va indicata nella home page del sito dell'impresa
 *   (art. 35 DPR 633/1972); per le società l'art. 2250 c.c. aggiunge sede e
 *   iscrizione al registro delle imprese. Da confermare con il commercialista.
 * - L'informativa privacy (/privacy) deve nominare il titolare del trattamento
 *   e un recapito.
 * - `emailContatto` è pubblica: compare nel footer e riceve le richieste di
 *   pilota se non è impostata KALAMOS_LEADS_TO.
 *
 * Dove un valore è null il footer lo omette, /privacy mostra un avviso e
 * `npm run verifica-lancio` lo segnala.
 */
export const azienda: {
  ragioneSociale: string | null;
  partitaIva: string | null;
  sede: string | null;
  /** Es. "REA GR-123456" oppure "Registro imprese di Grosseto n. …". */
  registroImprese: string | null;
  emailContatto: string | null;
  /** Se diversa da emailContatto, per le richieste sui dati personali. */
  emailPrivacy: string | null;
} = {
  ragioneSociale: null,
  partitaIva: null,
  sede: null,
  registroImprese: null,
  emailContatto: null,
  emailPrivacy: null,
};

/** Recapito per le richieste privacy: quello dedicato, altrimenti il contatto generale. */
export const recapitoPrivacy = () => azienda.emailPrivacy ?? azienda.emailContatto;
