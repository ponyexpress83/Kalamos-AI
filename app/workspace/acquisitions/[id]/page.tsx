import Link from "next/link";
import { notFound } from "next/navigation";
import OpportunityDecisionClient from "@/components/OpportunityDecisionClient";
import { demoOpportunities } from "@/lib/demo-workspace";
import { Panel, StatusPill, WorkspacePage } from "@/components/WorkspaceShell";

export function generateStaticParams() { return demoOpportunities.map((o) => ({ id: o.id })); }

export default function OpportunityPage({ params }: { params: { id: string } }) {
  const o = demoOpportunities.find((x) => x.id === params.id);
  if (!o) notFound();

  return <WorkspacePage eyebrow="Acquisition case" title={o.title} description={`${o.author} · ${o.source} · ${o.sourceOrg}`} actions={<Link href="/workspace/acquisitions" className="rounded-xl border border-[#14213d]/10 bg-white px-4 py-2.5 text-sm font-medium text-inchiostro">← Acquisition Desk</Link>}>
    <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
      <div className="space-y-6">
        <Panel title="Acquisition case" subtitle="Una singola scheda riunisce fonte, fit, motivazioni e prossima azione.">
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div><div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Fonte</div><div className="mt-1 font-medium text-slate-700">{o.source} · {o.sourceOrg}</div></div>
            <div><div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Imprint</div><div className="mt-1 font-medium text-slate-700">{o.imprint}</div></div>
            <div><div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Fase</div><div className="mt-1"><StatusPill tone="info">{o.stage}</StatusPill></div></div>
            <div><div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Fit editoriale</div><div className="mt-1"><StatusPill tone={o.fit === "Alto" ? "success" : o.fit === "Medio" ? "warning" : "neutral"}>{o.fit}</StatusPill></div></div>
            <div className="sm:col-span-2"><div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Razionale corrente</div><p className="mt-2 text-sm leading-6 text-slate-600">{o.rationale}</p></div>
            <div className="sm:col-span-2"><div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Prossimo passo suggerito</div><p className="mt-2 font-serif text-lg text-inchiostro">{o.nextAction}</p>{o.deadline && <div className="mt-2 text-xs font-semibold text-accento">Deadline {o.deadline}</div>}</div>
          </div>
        </Panel>
        <OpportunityDecisionClient opportunityId={o.id} />
      </div>
      <div className="space-y-6">
        <Panel title="Acquisition Readiness" subtitle="Completezza del dossier, non punteggio di qualità."><div className="p-6"><div className="flex items-end justify-between"><div className="font-serif text-5xl font-semibold text-inchiostro">{o.readiness}<span className="text-2xl text-slate-400">%</span></div><span className="text-xs text-slate-400">owner {o.owner}</span></div><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-accento" style={{ width: `${o.readiness}%` }} /></div><p className="mt-4 text-xs leading-5 text-slate-500">Il valore cresce quando materiali, letture, diritti e motivazioni sono sufficientemente strutturati per una decisione umana.</p></div></Panel>
        <Panel title="Audit trail demo" subtitle="Esempio del tipo di provenienza che Kalamos conserva."><div className="divide-y divide-[#14213d]/7 text-sm"><div className="px-5 py-4"><strong className="text-inchiostro">Signal received</strong><div className="mt-1 text-xs text-slate-400">Fonte: {o.sourceOrg}</div></div><div className="px-5 py-4"><strong className="text-inchiostro">AI analysis</strong><div className="mt-1 text-xs text-slate-400">Fit e razionale generati come supporto</div></div><div className="px-5 py-4"><strong className="text-inchiostro">Human decision</strong><div className="mt-1 text-xs text-slate-400">Richiede motivazione e reviewer</div></div></div></Panel>
      </div>
    </div>
  </WorkspacePage>;
}
