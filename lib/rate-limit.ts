/**
 * Rate limit a finestra scorrevole, tenuto in memoria di processo.
 *
 * LIMITE DA CONOSCERE, non nascosto: su Vercel ogni istanza serverless ha la
 * propria memoria, quindi questo conteggio è per istanza e non globale. Con il
 * traffico di una demo le istanze sono poche e il limite morde davvero; sotto
 * attacco distribuito no. Il vero lucchetto è il token condiviso
 * (`KALAMOS_API_TOKEN`): questo è la protezione contro l'abuso occasionale e
 * contro il ciclo accidentale, non contro un attaccante determinato.
 *
 * Se un giorno servirà un conteggio globale, la sostituzione naturale è un
 * contatore su Redis; non lo introduciamo ora perché aggiunge infrastruttura da
 * mantenere a fronte di un rischio che il token già copre.
 */

export interface Finestra {
  /** Ampiezza della finestra in millisecondi. */
  durataMs: number;
  /** Richieste ammesse dentro la finestra. */
  massimo: number;
}

export interface EsitoRateLimit {
  ammessa: boolean;
  /** Finestra che ha respinto la richiesta. */
  finestra?: Finestra;
  /** Secondi da attendere prima di riprovare. */
  riprovaFraSecondi?: number;
}

/** Due finestre insieme: una contro le raffiche, una contro il ciclo lento. */
export const FINESTRE_ANALISI: Finestra[] = [
  { durataMs: 60_000, massimo: 5 },
  { durataMs: 60 * 60_000, massimo: 40 },
];

const storico = new Map<string, number[]>();
/** Oltre questa soglia si ripulisce, per non far crescere la mappa senza fine. */
const MAX_CHIAVI = 5_000;

function ripulisci(adesso: number, orizzonteMs: number) {
  storico.forEach((tempi: number[], chiave: string) => {
    const vivi = tempi.filter((t) => adesso - t < orizzonteMs);
    if (vivi.length === 0) storico.delete(chiave);
    else storico.set(chiave, vivi);
  });
}

/**
 * Registra una richiesta e dice se è ammessa. La chiamata ha effetto solo se
 * la richiesta passa: una richiesta respinta non consuma quota.
 */
export function consumaQuota(
  chiave: string,
  finestre: Finestra[] = FINESTRE_ANALISI,
  adesso: number = Date.now(),
): EsitoRateLimit {
  const orizzonte = Math.max(...finestre.map((f) => f.durataMs));
  if (storico.size > MAX_CHIAVI) ripulisci(adesso, orizzonte);

  const tempi = (storico.get(chiave) ?? []).filter((t) => adesso - t < orizzonte);

  for (const finestra of finestre) {
    const dentro = tempi.filter((t) => adesso - t < finestra.durataMs);
    if (dentro.length >= finestra.massimo) {
      const piuVecchia = Math.min(...dentro);
      const attesa = Math.ceil((finestra.durataMs - (adesso - piuVecchia)) / 1000);
      storico.set(chiave, tempi);
      return { ammessa: false, finestra, riprovaFraSecondi: Math.max(1, attesa) };
    }
  }

  tempi.push(adesso);
  storico.set(chiave, tempi);
  return { ammessa: true };
}

/** Azzera lo storico. Serve ai test, non al codice di produzione. */
export function azzeraQuote() {
  storico.clear();
}

/**
 * Identifica il chiamante. Su Vercel l'IP reale arriva in `x-forwarded-for`;
 * in locale può mancare, e in quel caso si usa una chiave unica così il limite
 * resta verificabile in sviluppo.
 */
export function chiaveChiamante(req: Request): string {
  const inoltrato = req.headers.get("x-forwarded-for");
  if (inoltrato) return inoltrato.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "locale";
}
