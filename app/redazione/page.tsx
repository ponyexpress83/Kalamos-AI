import Link from "next/link";
import BatchTable, { type BatchRow } from "@/components/BatchTable";
import SessionRows from "@/components/SessionRows";
import FeedbackCounter from "@/components/FeedbackCounter";
import KpiRedazione from "@/components/KpiRedazione";
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

export default function RedazionePage() {
  const { rows, reali, metas } = buildRows();
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

      <KpiRedazione
        metasCache={metas}
        demoCount={rows.length}
        caseTotali={publishers.length}
        collaneTotali={publishers.reduce((n, p) => n + p.collane.length, 0)}
      />

      <p className="mb-8 rounded-lg border border-carta-scura bg-white/40 p-3 font-sans text-[13px] leading-relaxed text-stone-600">
        Riferimento di settore per una scheda di lettura professionale:{" "}
        <strong>€150–500 e 5–15 giorni</strong> — stima da validare sui dati
        reali dell'editore nella prima fase del PoC. Il confronto con i valori
        misurati qui sopra è il cuore del caso economico: Kalamos non sostituisce
        il giudizio, elimina l'attesa.
      </p>

      <FeedbackCounter />

      <SessionRows />

      <h2 className="mb-3 font-serif text-lg font-semibold text-inchiostro">
        Manoscritti demo
      </h2>
      <BatchTable rows={rows} />

      <p className="mt-4 font-sans text-xs text-stone-400">
        {reali === rows.length && rows.length > 0
          ? `Schede generate dal vivo su Claude contro ${caseDefault} case editrici del Gruppo, servite da cache.`
          : reali > 0
            ? `${reali} schede generate dal vivo, le altre sono stime offline etichettate.`
            : `I manoscritti demo mostrano stime offline etichettate; l'analisi reale si genera dalla demo.`}{" "}
        Per analizzare un testo nuovo apri la{" "}
        <Link href="/demo" className="underline hover:text-accento">demo</Link>.
      </p>
    </div>
  );
}
