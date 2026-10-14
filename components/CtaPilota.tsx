import Link from "next/link";

/**
 * Il passo successivo dopo il momento di valore: chi ha appena letto una
 * scheda deve poter chiedere di averla sui propri manoscritti. Prima, dopo la
 * scheda, la piattaforma non offriva nulla.
 */
export default function CtaPilota({ contesto = "scheda" }: { contesto?: "scheda" | "redazione" }) {
  const testo =
    contesto === "scheda"
      ? "Volete questa scheda sui manoscritti che arrivano alla vostra redazione, con le vostre collane?"
      : "Questa è una redazione dimostrativa. Volete vedere Kalamos sulla vostra coda?";
  return (
    <div className="no-print mt-6 flex flex-col gap-4 rounded-xl border border-inchiostro/15 bg-inchiostro p-5 text-carta sm:flex-row sm:items-center sm:justify-between">
      <p className="font-serif text-lg leading-snug">{testo}</p>
      <Link
        href="/pilota"
        className="shrink-0 rounded-md bg-accento px-5 py-2.5 text-center font-sans text-sm font-semibold text-white transition hover:bg-[#dc6444]"
      >
        Richiedi un pilota →
      </Link>
    </div>
  );
}
