import Link from "next/link";
import BatchTable, { type BatchRow } from "@/components/BatchTable";
import { manuscripts } from "@/lib/manuscripts";
import { heuristicForDemo } from "@/lib/demo";
import { publishers, defaultPublisherIds } from "@/config/publishers";
import { pct } from "@/lib/format";

export const metadata = { title: "Redazione — Kalamos·AI" };

function buildRows(): BatchRow[] {
  return manuscripts
    .map((m) => {
      const r = heuristicForDemo(m.id);
      if (!r) return null;
      const best = [...r.scheda.fit_collane].sort((a, b) => b.score - a.score)[0];
      return {
        id: m.id,
        titolo: r.scheda.titolo_presunto,
        autore: m.autore,
        genere: m.genere,
        editore: best?.editore ?? "—",
        collana: best?.collana ?? "—",
        fitPct: best ? pct(best.score) : 0,
        raccomandazione: r.scheda.raccomandazione,
      } satisfies BatchRow;
    })
    .filter((x): x is BatchRow => x !== null);
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-carta-scura bg-white/50 px-5 py-4">
      <div className="font-serif text-3xl font-bold text-inchiostro">{value}</div>
      <div className="mt-0.5 font-sans text-xs uppercase tracking-wide text-stone-500">{label}</div>
      {hint && <div className="mt-1 font-sans text-xs text-stone-400">{hint}</div>}
    </div>
  );
}

export default function RedazionePage() {
  const rows = buildRows();
  const caseDefault = defaultPublisherIds.length || 2;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-inchiostro">Redazione</h1>
        <p className="mt-1 font-sans text-sm text-stone-500">
          Coda di manoscritti con la collana suggerita. Ordina per fit o
          raccomandazione; clicca una riga per aprire la scheda.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:max-w-md">
        <Kpi label="Manoscritti in coda" value={`${rows.length}`} />
        <Kpi
          label="Case editrici / collane"
          value={`${publishers.length} / ${publishers.reduce((n, p) => n + p.collane.length, 0)}`}
          hint="catalogo reale coperto"
        />
      </div>

      <BatchTable rows={rows} />

      <p className="mt-4 font-sans text-xs text-stone-400">
        Stime offline (euristica) contro {caseDefault} case editrici di default,
        per la vista d'insieme. La scheda reale si genera dal vivo dall'
        <Link href="/" className="underline hover:text-accento">analizzatore</Link>.
      </p>
    </div>
  );
}
