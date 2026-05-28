import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authed = req.cookies.get("kalamos_auth")?.value === "1";
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !authed) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/" && authed) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
