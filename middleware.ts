import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verificaTokenSessione } from "@/lib/session-token";

/**
 * Cancello del workspace.
 *
 * Il controllo nel layout non basta: in App Router layout e pagina si
 * renderizzano in parallelo, e una richiesta senza sessione riceveva sì un
 * redirect 307, ma con dentro il contenuto della pagina (e la richiesta RSC
 * rispondeva 200 con i dati). Il middleware gira prima di qualunque rendering,
 * pagine statiche comprese, quindi qui il redirect non porta nulla con sé.
 */
export async function middleware(req: NextRequest) {
  const sessione = await verificaTokenSessione(req.cookies.get(SESSION_COOKIE)?.value);
  if (sessione) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/workspace", "/workspace/:path*"],
};
