"use client";

import { useState } from "react";
import Link from "next/link";
import type { DemoOpportunity } from "@/lib/demo-workspace";
import { Panel, StatusPill } from "./WorkspaceShell";

/**
 * Tabella delle opportunità con filtro per provenienza. I filtri prima erano
 * etichette disegnate come pulsanti ma inerti: in una demo un controllo che
 * non risponde costa più di un controllo che non c'è. Le voci derivano dai
 * dati, così compare anche "Interna", che prima mancava.
 */
export default function AcquisitionsTable({ opportunities }: { opportunities: DemoOpportunity[] }) {
  const fonti = Array.from(new Set(opportunities.map((o) => o.source)));
  const [filtro, setFiltro] = useState<string | null>(null);
  const visibili = filtro ? opportunities.filter((o) => o.source === filtro) : opportunities;

  const chip = (attivo: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-medium transition ${attivo ? "border-inchiostro bg-inchiostro text-white" : "border-[#14213d]/10 bg-white text-slate-500 hover:border-[#14213d]/25"}`;

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtra per provenienza">
        <button type="button" onClick={() => setFiltro(null)} aria-pressed={filtro === null} className={chip(filtro === null)}>
          Tutte · {opportunities.length}
        </button>
        {fonti.map((f) => (
          <button key={f} type="button" onClick={() => setFiltro(f)} aria-pressed={filtro === f} className={chip(filtro === f)}>
            {f} · {opportunities.filter((o) => o.source === f).length}
          </button>
        ))}
      </div>
      <Panel title="Opportunità editoriali" subtitle="Acquisition Readiness indica completezza del dossier, non qualità letteraria.">
        <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-[#f8f5ef] text-[10px] uppercase tracking-[0.12em] text-slate-400"><tr><th className="px-5 py-3">Opportunità</th><th className="px-4 py-3">Provenienza</th><th className="px-4 py-3">Fit</th><th className="px-4 py-3">Fase</th><th className="px-4 py-3">Owner</th><th className="px-4 py-3">Prossimo passo</th></tr></thead><tbody>{visibili.map((o) => <tr key={o.id} className="border-t border-[#14213d]/7 align-top transition hover:bg-[#faf8f4]"><td className="px-5 py-5"><Link href={`/workspace/acquisitions/${o.id}`} className="font-serif text-base font-semibold text-inchiostro hover:text-accento">{o.title} →</Link><div className="mt-1 text-xs text-slate-400">{o.author} · {o.language}</div><div className="mt-3 max-w-sm text-xs leading-5 text-slate-500">{o.rationale}</div></td><td className="px-4 py-5"><div className="font-medium text-slate-700">{o.source}</div><div className="mt-1 text-xs text-slate-400">{o.sourceOrg}</div></td><td className="px-4 py-5"><StatusPill tone={o.fit === "Alto" ? "success" : o.fit === "Medio" ? "warning" : "neutral"}>{o.fit}</StatusPill><div className="mt-2 text-xs text-slate-400">{o.imprint}</div></td><td className="px-4 py-5"><StatusPill tone="info">{o.stage}</StatusPill><div className="mt-3 text-xs text-slate-400">Dossier {o.readiness}%</div></td><td className="px-4 py-5 text-slate-600">{o.owner}</td><td className="px-4 py-5"><div className="max-w-xs text-sm text-slate-700">{o.nextAction}</div>{o.deadline && <div className="mt-2 text-xs font-semibold text-accento">entro il {o.deadline}</div>}</td></tr>)}</tbody></table></div>
      </Panel>
    </>
  );
}
