"use client";

import { useEffect, useState } from "react";
import { loadSession } from "@/lib/session";
import { costoSchedaUSD } from "@/lib/pricing";
import type { AnalysisMeta } from "@/lib/schema";

/**
 * KPI della Redazione: tempo e costo per scheda MISURATI.
 *
 * Aggrega due sorgenti: le schede reali pre-generate (passate dal server) e le
 * analisi dal vivo fatte in questa sessione (localStorage). Così i numeri si
 * popolano appena si analizza un manoscritto — anche in una demo dal vivo.
 * Le stime euristiche offline sono escluse: qui contano solo misure reali.
 */

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

export default function KpiRedazione({
  metasCache,
  demoCount,
  caseTotali,
  collaneTotali,
}: {
  metasCache: AnalysisMeta[];
  demoCount: number;
  caseTotali: number;
  collaneTotali: number;
}) {
  const [metas, setMetas] = useState<AnalysisMeta[]>(metasCache);
  const [inCoda, setInCoda] = useState<number>(demoCount);

  useEffect(() => {
    const sessione = loadSession();
    // Solo le analisi reali entrano nelle misure (le stime offline no).
    const liveMetas = sessione
      .map((e) => e.result.meta)
      .filter((m) => m.fonte === "live");
    setMetas([...metasCache, ...liveMetas]);
    setInCoda(demoCount + sessione.length);
  }, [metasCache, demoCount]);

  const tempi = metas.map((m) => m.tempo_secondi).filter((t) => t > 0);
  const tempoMedio =
    tempi.length > 0
      ? Math.round(tempi.reduce((s, t) => s + t, 0) / tempi.length)
      : null;

  const costi = metas
    .map((m) => costoSchedaUSD(m.modello, m.usage))
    .filter((c): c is number => c !== null);
  const costoMedio =
    costi.length > 0 ? costi.reduce((s, c) => s + c, 0) / costi.length : null;

  const misurateSu =
    metas.length > 0
      ? `misurato su ${metas.length} ${metas.length === 1 ? "scheda" : "schede"}`
      : "in attesa della prima analisi";

  return (
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Kpi
        label="Tempo per scheda"
        value={tempoMedio !== null ? `${tempoMedio}s` : "—"}
        hint={misurateSu}
      />
      <Kpi
        label="Costo API per scheda"
        value={
          costoMedio !== null
            ? costoMedio < 0.01
              ? "< $0,01"
              : `~$${costoMedio.toFixed(2)}`
            : "—"
        }
        hint={costoMedio !== null ? "token effettivi × listino" : misurateSu}
      />
      <Kpi label="Manoscritti in coda" value={`${inCoda}`} />
      <Kpi
        label="Case / collane"
        value={`${caseTotali} / ${collaneTotali}`}
        hint="catalogo reale coperto"
      />
    </div>
  );
}
