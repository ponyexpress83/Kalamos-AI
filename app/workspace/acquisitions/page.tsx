import Link from "next/link";
import { demoOpportunities } from "@/lib/demo-workspace";
import { Panel, PrimaryLink, StatusPill, WorkspacePage } from "@/components/WorkspaceShell";

export const metadata = { title: "Acquisizioni — Kalamos AI" };

export default function AcquisitionsPage() {
  return (
    <WorkspacePage eyebrow="Acquisition intelligence" title="Ogni fonte, un solo contesto." description="Scout, agenzie, foreign rights, autori già conosciuti e unsolicited entrano nella stessa pipeline senza essere trattati come opportunità equivalenti." actions={<PrimaryLink href="/demo">+ Nuova analisi</PrimaryLink>}>
      <div className="mb-5 flex flex-wrap gap-2">{["Tutte", "Scout", "Agenzia", "Foreign rights", "Unsolicited"].map((x, i) => <span key={x} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${i === 0 ? "border-inchiostro bg-inchiostro text-white" : "border-[#14213d]/10 bg-white text-slate-500"}`}>{x}</span>)}</div>
      <Panel title="Opportunità editoriali" subtitle="Acquisition Readiness indica completezza del dossier, non qualità letteraria.">
        <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-[#f8f5ef] text-[10px] uppercase tracking-[0.12em] text-slate-400"><tr><th className="px-5 py-3">Opportunità</th><th className="px-4 py-3">Provenienza</th><th className="px-4 py-3">Fit</th><th className="px-4 py-3">Fase</th><th className="px-4 py-3">Owner</th><th className="px-4 py-3">Prossimo passo</th></tr></thead><tbody>{demoOpportunities.map((o) => <tr key={o.id} className="border-t border-[#14213d]/7 align-top transition hover:bg-[#faf8f4]"><td className="px-5 py-5"><Link href={`/workspace/acquisitions/${o.id}`} className="font-serif text-base font-semibold text-inchiostro hover:text-accento">{o.title} →</Link><div className="mt-1 text-xs text-slate-400">{o.author} · {o.language}</div><div className="mt-3 max-w-sm text-xs leading-5 text-slate-500">{o.rationale}</div></td><td className="px-4 py-5"><div className="font-medium text-slate-700">{o.source}</div><div className="mt-1 text-xs text-slate-400">{o.sourceOrg}</div></td><td className="px-4 py-5"><StatusPill tone={o.fit === "Alto" ? "success" : o.fit === "Medio" ? "warning" : "neutral"}>{o.fit}</StatusPill><div className="mt-2 text-xs text-slate-400">{o.imprint}</div></td><td className="px-4 py-5"><StatusPill tone="info">{o.stage}</StatusPill><div className="mt-3 text-xs text-slate-400">Dossier {o.readiness}%</div></td><td className="px-4 py-5 text-slate-600">{o.owner}</td><td className="px-4 py-5"><div className="max-w-xs text-sm text-slate-700">{o.nextAction}</div>{o.deadline && <div className="mt-2 text-xs font-semibold text-accento">entro {o.deadline}</div>}</td></tr>)}</tbody></table></div>
      </Panel>
    </WorkspacePage>
  );
}
