import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  demoAccessEnabled,
  validateReservedCredentials,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LoginBody {
  email?: string;
  password?: string;
  demo?: boolean;
}

export async function POST(req: Request) {
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

  const response = NextResponse.json({ ok: true, email, mode: body.demo ? "demo" : "reserved" });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: createSessionToken(email),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
