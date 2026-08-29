import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "kalamos_session";
const SESSION_HOURS = 12;

function secret(): string {
  // In produzione impostare sempre KALAMOS_SESSION_SECRET.
  // Il fallback mantiene utilizzabile il workspace dimostrativo senza introdurre
  // dipendenze esterne; non va usato per dati editoriali reali.
  return process.env.KALAMOS_SESSION_SECRET || "kalamos-demo-session-only-v1";
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSessionToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + SESSION_HOURS * 60 * 60 * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null): { email: string } | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
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

export function demoAccessEnabled(): boolean {
  return process.env.KALAMOS_DISABLE_PUBLIC_DEMO !== "true";
}

export function validateReservedCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.KALAMOS_DEMO_EMAIL;
  const expectedPassword = process.env.KALAMOS_DEMO_PASSWORD;
  if (!expectedEmail || !expectedPassword) return false;
  return email.trim().toLowerCase() === expectedEmail.trim().toLowerCase() && password === expectedPassword;
}
