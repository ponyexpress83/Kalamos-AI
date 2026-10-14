/**
 * Segreto e verifica del token di sessione, in una forma che gira anche nel
 * middleware (runtime Edge: niente modulo `crypto` di Node, solo Web Crypto).
 *
 * Il token è `payload.firma`: il payload è JSON in base64url con email e
 * scadenza, la firma è HMAC-SHA256 in esadecimale. `lib/auth.ts` lo crea lato
 * Node; questo file lo verifica in entrambi i runtime con lo stesso segreto.
 */

export const SESSION_COOKIE = "kalamos_session";

/** Segreto di ripiego, accettato SOLO finché l'accesso demo pubblico è aperto. */
const SEGRETO_DEMO = "kalamos-demo-session-only-v1";

export function demoAccessEnabled(): boolean {
  return process.env.KALAMOS_DISABLE_PUBLIC_DEMO !== "true";
}

/**
 * Segreto di firma. Con l'accesso demo aperto il ripiego è innocuo: chiunque
 * può già entrare con un clic. Con l'accesso chiuso, invece, un segreto noto
 * permetterebbe di fabbricare una sessione valida: in quel caso niente
 * ripiego, e nessuna sessione è accettata finché il segreto non è impostato.
 */
export function sessionSecret(): string | null {
  const configurato = process.env.KALAMOS_SESSION_SECRET;
  if (configurato) return configurato;
  return demoAccessEnabled() ? SEGRETO_DEMO : null;
}

function base64urlInTesto(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=");
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function inEsadecimale(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Confronto a tempo costante fra due stringhe della stessa lunghezza. */
function uguali(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verifica il token con Web Crypto. Usata dal middleware. */
export async function verificaTokenSessione(
  token?: string | null,
): Promise<{ email: string } | null> {
  const segreto = sessionSecret();
  if (!token || !segreto) return null;
  const [payload, firma] = token.split(".");
  if (!payload || !firma) return null;

  try {
    const chiave = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(segreto),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const attesa = inEsadecimale(
      await crypto.subtle.sign("HMAC", chiave, new TextEncoder().encode(payload)),
    );
    if (!uguali(firma, attesa)) return null;

    const dati = JSON.parse(base64urlInTesto(payload)) as { email?: string; exp?: number };
    if (!dati.email || !dati.exp || dati.exp < Date.now()) return null;
    return { email: dati.email };
  } catch {
    return null;
  }
}
