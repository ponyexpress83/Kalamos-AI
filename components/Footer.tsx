"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { azienda } from "@/config/azienda";

/**
 * Piè di pagina delle pagine pubbliche: chi pubblica il sito e come
 * contattarlo. Prima non c'era: nessuna ragione sociale, nessuna partita IVA,
 * nessun recapito in tutta la piattaforma. I dati vengono da config/azienda.ts;
 * quelli mancanti si omettono.
 */
export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/workspace")) return null;

  const identita = [
    azienda.ragioneSociale,
    azienda.sede,
    azienda.partitaIva && `P.IVA ${azienda.partitaIva}`,
    azienda.registroImprese,
  ].filter(Boolean);

  return (
    <footer className="border-t border-carta-scura bg-carta">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 font-sans text-sm sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-md">
          <div className="font-serif text-base font-semibold tracking-[0.12em] text-inchiostro">
            KALAMOS <span className="text-accento">AI</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-stone-500">
            Schede di lettura sulle collane del vostro catalogo, e la memoria delle decisioni della redazione.
          </p>
          {identita.length > 0 && <p className="mt-3 text-xs leading-relaxed text-stone-500">{identita.join(" · ")}</p>}
          {azienda.emailContatto && (
            <a href={`mailto:${azienda.emailContatto}`} className="mt-1 inline-block text-xs text-stone-600 underline hover:text-accento">
              {azienda.emailContatto}
            </a>
          )}
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs text-stone-600">
          <Link href="/redazione" className="hover:text-accento">Redazione demo</Link>
          <Link href="/pilota" className="hover:text-accento">Richiedi un pilota</Link>
          <Link href="/demo" className="hover:text-accento">Analizza un testo</Link>
          <Link href="/riservatezza" className="hover:text-accento">Riservatezza e dati</Link>
          <Link href="/login" className="hover:text-accento">Workspace dimostrativo</Link>
          <Link href="/privacy" className="hover:text-accento">Informativa privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
