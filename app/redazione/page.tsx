import Link from "next/link";
import BatchTable, { type BatchRow } from "@/components/BatchTable";
import { manuscripts } from "@/lib/manuscripts";
import { demoSchede } from "@/lib/cache";
import { pct } from "@/lib/format";

export const metadata = {
  title: "Redazione — Kalamos·AI",
};

function buildRows(): BatchRow[] {
  return manuscripts
    .map((m) => {
      const r = demoSchede[m.id];
      if (!r) return null;
      const best = [...r.scheda.fit_collane].sort((a, b) => b.score - a.score)[0];
      return {
        id: m.id,
        titolo: r.scheda.titolo_presunto,
        autore: m.autore,
        genere: r.scheda.genere,
        fitCollana: best?.collana ?? "—",
        fitPct: best ? pct(best.score) : 0,
        raccomandazione: r.scheda.raccomandazione,
        tempo: r.meta.tempo_secondi,
      } satisfies BatchRow;
    })
    .filter((x): x is BatchRow => x !== null);
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-carta-scura bg-white/50 px-5 py-4">
      <div className="font-serif text-3xl font-bold text-inchiostro">{value}</div>
      <div className="mt-0.5 font-sans text-xs uppercase tracking-wide text-stone-500">
        {label}
      </div>
      {hint && <div className="mt-1 font-sans text-xs text-stone-400">{hint}</div>}
    </div>
  );
}

export default function RedazionePage() {
  const rows = buildRows();

  const tempoMedio = rows.length
    ? Math.round(rows.reduce((s, r) => s + r.tempo, 0) / rows.length)
    : 0;

  // Capacità di triage dimostrativa: estrapolazione dal tempo medio misurato
  // su una settimana lavorativa piena (40h). È una stima, etichettata come tale.
  const capacita = tempoMedio
    ? Math.round((40 * 3600) / tempoMedio / 100) * 100
    : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-inchiostro">Redazione</h1>
        <p className="mt-1 font-sans text-sm text-stone-500">
          Tutti i manoscritti analizzati. Ordina per fit o raccomandazione;
          clicca una riga per aprire la scheda.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:max-w-md">
        <Kpi label="Tempo medio per scheda" value={`${tempoMedio}s`} />
        <Kpi
          label="Manoscritti valutabili / sett."
          value={`~${capacita.toLocaleString("it-IT")}`}
          hint="stima a pieno carico"
        />
      </div>

      <BatchTable rows={rows} />

      <p className="mt-6 font-sans text-xs text-stone-400">
        <Link href="/" className="underline hover:text-accento">
          ← Analizza un nuovo manoscritto
        </Link>
      </p>
    </div>
  );
}
