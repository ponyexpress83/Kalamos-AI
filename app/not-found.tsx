import Link from "next/link";

export const metadata = { title: "Pagina non trovata — Kalamos AI" };

/** La 404 predefinita di Next.js era in inglese («This page could not be found»). */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">Errore 404</p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-inchiostro">Questa pagina non esiste.</h1>
      <p className="mt-3 font-sans text-sm leading-relaxed text-stone-600">
        Il collegamento potrebbe essere vecchio, oppure la scheda era salvata solo in un altro browser.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 font-sans text-sm">
        <Link href="/redazione" className="rounded-md bg-accento px-5 py-2.5 font-medium text-white transition hover:bg-accento/90">
          Vai alla redazione
        </Link>
        <Link href="/" className="rounded-md border border-carta-scura bg-white/60 px-5 py-2.5 text-inchiostro transition hover:border-inchiostro/40">
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
