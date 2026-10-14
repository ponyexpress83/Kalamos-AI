import ModuloPilota from "@/components/ModuloPilota";

export const metadata = {
  title: "Richiedi un pilota — Kalamos AI",
  description:
    "Kalamos sui manoscritti che arrivano davvero alla vostra redazione, sulle collane del vostro catalogo. Alla fine, il conto di quante volte il suo giudizio coincide con il vostro.",
};

const punti = [
  ["Le vostre collane, configurate da noi", "Nessun lavoro di impostazione per la redazione: ricostruiamo il catalogo dalle fonti pubbliche e lo rivediamo con voi."],
  ["Schede sui testi che scegliete voi", "Proposte non sollecitate, agenzie, scout, diritti esteri: ogni scheda porta la collana suggerita e una citazione verificata nel testo."],
  ["Il conto, alla fine", "Quante volte il giudizio di Kalamos coincide con quello della redazione, e dove no. Per iscritto."],
] as const;

export default function PilotaPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
      <section>
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">Per case editrici indipendenti e medie</p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-inchiostro">Un pilota sulla vostra redazione</h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-inchiostro/80">
          Kalamos legge i manoscritti che vi arrivano davvero e prepara la scheda sulle collane del vostro catalogo. L'ultima parola resta all'editor.
        </p>
        <ul className="mt-8 space-y-5">
          {punti.map(([t, d]) => (
            <li key={t} className="border-l-2 border-accento/50 pl-4">
              <div className="font-serif text-lg font-semibold text-inchiostro">{t}</div>
              <p className="mt-1 font-sans text-sm leading-relaxed text-stone-600">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-sans text-sm leading-relaxed text-stone-500">
          Durata e condizioni le concordiamo in una prima telefonata. Prima di ricevere un solo manoscritto firmiamo con voi le condizioni di trattamento dei dati. I testi non vengono usati per addestrare modelli: <a href="/riservatezza" className="underline hover:text-accento">ecco dove vanno, esattamente</a>.
        </p>
      </section>
      <section>
        <ModuloPilota />
      </section>
    </div>
  );
}
