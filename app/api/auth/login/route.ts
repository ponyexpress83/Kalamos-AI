import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  demoAccessEnabled,
  validateReservedCredentials,
} from "@/lib/auth";
import { chiaveChiamante, consumaQuota } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LoginBody {
  email?: string;
  password?: string;
  demo?: boolean;
}

/** Contro i tentativi a raffica sulle credenziali riservate. */
const FINESTRE_LOGIN = [
  { durataMs: 60_000, massimo: 10 },
  { durataMs: 60 * 60_000, massimo: 60 },
];

export async function POST(req: Request) {
  const quota = consumaQuota(`login:${chiaveChiamante(req)}`, FINESTRE_LOGIN);
  if (!quota.ammessa) {
    return NextResponse.json(
      { error: `Troppi tentativi di accesso. Riprova fra ${quota.riprovaFraSecondi} secondi.` },
      { status: 429, headers: { "retry-after": String(quota.riprovaFraSecondi ?? 60) } },
    );
  }

  let body: LoginBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const email = body.email?.trim() || "editor.demo@kalamos.ai";

  if (body.demo) {
    if (!demoAccessEnabled()) {
      return NextResponse.json(
        { error: "L'accesso demo pubblico è disabilitato." },
        { status: 403 },
      );
    }
  } else if (!body.email || !body.password || !validateReservedCredentials(body.email, body.password)) {
    return NextResponse.json({ error: "Credenziali non valide." }, { status: 401 });
  }

  const token = createSessionToken(email);
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Configurazione incompleta: con l'accesso demo chiuso serve KALAMOS_SESSION_SECRET sul deployment.",
      },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true, email, mode: body.demo ? "demo" : "reserved" });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
