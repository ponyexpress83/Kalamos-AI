/**
 * Contesto di redazione: la casa editrice "in cui si entra".
 *
 * Nel prodotto reale il cliente è l'editore e ogni utente lavora dentro la
 * propria redazione. Nella demo lo rappresentiamo con una scelta esplicita
 * (dichiarata come demo, non un login finto): la casa scelta resta il contesto
 * di tutta la sessione — coda, analisi, collane suggerite.
 *
 * Persistenza in localStorage: nessun account, nessun dato sul server.
 */

const KEY = "kalamos_redazione";

export function getRedazione(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setRedazione(publisherId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, publisherId);
  } catch {
    /* noop */
  }
}

export function clearRedazione(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
