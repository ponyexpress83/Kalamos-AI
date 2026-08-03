import Link from "next/link";
import BatchTable, { type BatchRow } from "@/components/BatchTable";
import SessionRows from "@/components/SessionRows";
import FeedbackCounter from "@/components/FeedbackCounter";
import { manuscripts } from "@/lib/manuscripts";
import { getSchedaForDemo } from "@/lib/schede";
import { publishers, defaultPublisherIds } from "@/config/publishers";
import { pct } from "@/lib/format";
import { costoSchedaUSD } from "@/lib/pricing";
import type { AnalysisMeta } from "@/lib/schema";

export const metadata = { title: "Redazione — Kalamos·AI" };

function buildRows(): { rows: BatchRow[]; reali: number; metas: AnalysisMeta[] } {
  let reali = 0;
  const metas: AnalysisMeta[] = [];
  const rows = manuscripts
    .map((m) => {
      const r = getSchedaForDemo(m.id);
      if (!r) return null;
      if (r.meta.cache) {
        reali++;
        metas.push(r.meta);
      }
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
  return { rows, reali, metas };
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
  const { rows, reali, metas } = buildRows();
  const caseDefault = defaultPublisherIds.length || 2;

  // KPI MISURATI dalle schede reali in cache (tempo e token effettivi).
  const tempoMedio =
    metas.length > 0
      ? Math.round(metas.reduce((s, m) => s + m.tempo_secondi, 0) / metas.length)
      : null;
  const costi = metas
    .map((m) => costoSchedaUSD(m.modello, m.usage))
    .filter((c): c is number => c !== null);
  const costoMedio =
    costi.length > 0 ? costi.reduce((s, c) => s + c, 0) / costi.length : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-inchiostro">Redazione</h1>
        <p className="mt-1 font-sans text-sm text-stone-500">
          Coda di manoscritti con la collana suggerita. Ordina per fit o
          raccomandazione; clicca una riga per aprire la scheda.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          label="Tempo per scheda"
          value={tempoMedio !== null ? `${tempoMedio}s` : "—"}
          hint={
            tempoMedio !== null
              ? "misurato sulle schede reali"
              : "genera le schede reali (script)"
          }
        />
        <Kpi
          label="Costo API per scheda"
          value={costoMedio !== null ? `~$${costoMedio.toFixed(2)}` : "—"}
          hint={
            costoMedio !== null
              ? "misurato: token effettivi × listino modello"
              : "genera le schede reali (script)"
          }
        />
        <Kpi label="Manoscritti in coda" value={`${rows.length}`} />
        <Kpi
          label="Case / collane"
          value={`${publishers.length} / ${publishers.reduce((n, p) => n + p.collane.length, 0)}`}
          hint="catalogo reale coperto"
        />
      </div>

      <p className="mb-8 rounded-lg border border-carta-scura bg-white/40 p-3 font-sans text-xs leading-relaxed text-stone-600">
        Baseline di settore per una scheda di lettura professionale:{" "}
        <strong>€150–500 e 5–15 giorni</strong> — stima di settore{" "}
        <span className="text-stone-400">[DA VERIFICARE]</span>. Il confronto con
        i valori misurati qui sopra è il cuore del caso economico: Kalamos non
        sostituisce il giudizio, elimina l'attesa.
      </p>

      <FeedbackCounter />

      <SessionRows />

      <h2 className="mb-3 font-serif text-lg font-semibold text-inchiostro">
        Manoscritti demo
      </h2>
      <BatchTable rows={rows} />

      <p className="mt-4 font-sans text-xs text-stone-400">
        {reali === rows.length && rows.length > 0
          ? `Schede generate dal vivo su Claude contro ${caseDefault} case editrici di default, servite da cache.`
          : reali > 0
            ? `${reali} schede generate dal vivo (da cache), ${rows.length - reali} stime offline (euristica). Completa con scripts/generate-schede.mjs.`
            : `Stime offline (euristica) contro ${caseDefault} case editrici di default. Per le schede reali: scripts/generate-schede.mjs (vedi README).`}{" "}
        La scheda su un testo nuovo si genera dal vivo dalla{" "}
        <Link href="/demo" className="underline hover:text-accento">demo</Link>.
      </p>
    </div>
  );
}
