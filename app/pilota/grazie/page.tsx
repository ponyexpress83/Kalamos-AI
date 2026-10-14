import Link from "next/link";

export const metadata = { title: "Richiesta ricevuta — Kalamos AI", robots: { index: false } };

export default function GraziePage() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">Richiesta ricevuta</p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-inchiostro">Grazie. Vi scriviamo noi.</h1>
      <p className="mt-4 font-sans text-sm leading-relaxed text-stone-600">
        Leggiamo ogni richiesta di persona. Nel frattempo potete provare Kalamos sulla redazione demo, con i cataloghi reali di nove case editrici.
      </p>
      <Link href="/redazione" className="mt-8 inline-block rounded-md bg-accento px-5 py-2.5 font-sans text-sm font-medium text-white transition hover:bg-accento/90">
        Apri la redazione demo
      </Link>
    </div>
  );
}
