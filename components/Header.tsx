"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/workspace")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-carta-scura/80 bg-carta/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <Link href="/" aria-label="Kalamos AI — home">
          {/* Su telefono solo l'emblema: lascia spazio ai link della redazione. */}
          <span className="sm:hidden"><Logo height={28} wordmark={false} /></span>
          <span className="hidden sm:inline"><Logo height={31} /></span>
        </Link>
        {/* Prima su telefono restavano solo «Accedi» e «Workspace →», entrambi
            verso /login: redazione e analisi non erano raggiungibili dal menu. */}
        <nav className="flex items-center gap-4 font-sans text-sm sm:gap-5">
          <Link href="/redazione" className="text-stone-600 transition hover:text-accento">
            Redazione
          </Link>
          <Link href="/demo" className="text-stone-600 transition hover:text-accento">
            Analizza
          </Link>
          <Link href="/login" className="rounded-full bg-accento px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#dc6444]">
            Workspace →
          </Link>
        </nav>
      </div>
    </header>
  );
}
