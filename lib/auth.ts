import { createHmac, timingSafeEqual } from "crypto";
import { SESSION_COOKIE, demoAccessEnabled, sessionSecret } from "./session-token";

export { SESSION_COOKIE, demoAccessEnabled, sessionSecret };

const SESSION_HOURS = 12;

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

/**
 * Crea il token di sessione. Restituisce null se manca il segreto mentre
 * l'accesso demo è chiuso: vedi `sessionSecret()` in `lib/session-token.ts`.
 */
export function createSessionToken(email: string): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + SESSION_HOURS * 60 * 60 * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token?: string | null): { email: string } | null {
  const secret = sessionSecret();
  if (!token || !secret) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload, secret);
  try {
    const a = Buffer.from(signature, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: string;
      exp?: number;
    };
    if (!data.email || !data.exp || data.exp < Date.now()) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

/** Confronto a tempo costante: la durata non deve rivelare quanti caratteri coincidono. */
function stessaStringa(a: string, b: string): boolean {
  const ha = createHmac("sha256", "confronto").update(a).digest();
  const hb = createHmac("sha256", "confronto").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function validateReservedCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.KALAMOS_DEMO_EMAIL;
  const expectedPassword = process.env.KALAMOS_DEMO_PASSWORD;
  if (!expectedEmail || !expectedPassword) return false;
  const emailOk = stessaStringa(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase());
  const passwordOk = stessaStringa(password, expectedPassword);
  return emailOk && passwordOk;
}
