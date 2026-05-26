import Link from "next/link";
import { manoscritti, statistiche } from "@/lib/data";
import VerdictBadge from "@/components/VerdictBadge";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-carta-scura bg-white/50 px-4 py-3">
      <div className="font-serif text-2xl font-bold text-inchiostro">{value}</div>
      <div className="font-sans text-xs uppercase tracking-wide text-stone-500">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const s = statistiche();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold">Coda manoscritti</h1>
        <p className="mt-1 font-sans text-sm text-stone-500">
          Valutazione assistita per la collana Sperling &amp; Kupfer
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="In coda" value={s.totali} />
        <Stat label="Valutati" value={s.valutati} />
        <Stat label="Da approfondire" value={s.selezionati} />
        <Stat label="In elaborazione" value={s.inCoda} />
      </div>

      <ul className="space-y-3">
        {manoscritti.map((m) => {
          const inLavorazione = m.stato === "In elaborazione";
          const topFit = m.fitScores[0]?.score;

          const content = (
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-serif text-base font-semibold text-inchiostro">
                    {inLavorazione ? "Manoscritto in arrivo" : m.titolo}
                  </span>
                  {m.esempio && (
                    <span className="rounded bg-carta-scura px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-500">
                      esempio
                    </span>
                  )}
                </div>
                <div className="mt-0.5 truncate font-sans text-xs text-stone-500">
                  #{m.id} · {m.autore}
                  {m.parole > 0 && ` · ${(m.parole / 1000).toFixed(0)}k parole`}
                  {!inLavorazione && ` · ${m.genere}`}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                {topFit != null && (
                  <span className="hidden font-sans text-sm tabular-nums text-stone-600 sm:inline">
                    fit <span className="font-semibold text-inchiostro">{topFit}</span>/100
                  </span>
                )}
                {inLavorazione ? (
                  <span className="inline-flex items-center gap-2 font-sans text-xs text-stone-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    in elaborazione
                  </span>
                ) : (
                  <VerdictBadge verdetto={m.verdettoTarget} />
                )}
              </div>
            </div>
          );

          if (inLavorazione) {
            return (
              <li
                key={m.id}
                className="rounded-xl border border-carta-scura bg-white/30 opacity-60"
              >
                {content}
              </li>
            );
          }

          return (
            <li key={m.id}>
              <Link
                href={`/dashboard/${m.id}`}
                className="block rounded-xl border border-carta-scura bg-white/40 transition hover:border-ruggine/40 hover:bg-carta-scura/40"
              >
                {content}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 font-sans text-xs text-stone-400">
        Prototipo dimostrativo con dati di esempio. Le schede contrassegnate "esempio" sono su opere di
        pubblico dominio. Nessuna inferenza AI in tempo reale.
      </p>
    </div>
  );
}
