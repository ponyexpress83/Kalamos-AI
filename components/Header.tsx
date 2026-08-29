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
          <Logo height={31} />
        </Link>
        <nav className="flex items-center gap-2 font-sans text-sm sm:gap-5">
          <Link href="/redazione" className="hidden text-stone-600 transition hover:text-accento sm:inline">
            Redazione
          </Link>
          <Link href="/demo" className="hidden text-stone-600 transition hover:text-accento sm:inline">
            Analizza
          </Link>
          <Link href="/login" className="rounded-full border border-inchiostro/15 bg-white/70 px-4 py-2 text-xs font-semibold text-inchiostro transition hover:border-inchiostro/30 hover:bg-white">
            Accedi
          </Link>
          <Link href="/login" className="rounded-full bg-accento px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#dc6444]">
            Workspace →
          </Link>
        </nav>
      </div>
    </header>
  );
}
