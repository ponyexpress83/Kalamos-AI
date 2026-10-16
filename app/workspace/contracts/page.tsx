import ContractReviewClient from "@/components/ContractReviewClient";
import { demoContract } from "@/lib/demo-workspace";
import { Panel, StatusPill, WorkspacePage } from "@/components/WorkspaceShell";

export const metadata = { title: "Contract Intelligence — Kalamos AI" };
function tone(status: string) { return status === "match" ? "success" as const : status === "material" ? "danger" as const : "warning" as const; }
function label(status: string) { return status === "match" ? "Coerente" : status === "material" ? "Review prioritaria" : status === "missing" ? "Mancante" : "Differenza"; }

export default function ContractsPage() {
  const review = demoContract.terms.filter((t) => t.status !== "match").length;
  return <WorkspacePage eyebrow="Contract intelligence · working prototype" title="Il draft non vive in isolamento." description="Kalamos mette fianco a fianco i termini registrati durante l'acquisition e quelli estratti dal draft. Non approva contratti e non sostituisce il team legale: evidenzia cosa verificare." actions={<span className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700">{review} elementi da verificare</span>}>
    <div className="mb-5 rounded-2xl border border-[#14213d]/10 bg-white/70 px-5 py-4 text-xs leading-5 text-slate-500"><strong className="text-inchiostro">{demoContract.project}</strong> · {demoContract.counterparty} · {demoContract.version}. {demoContract.note}</div>
    <Panel title="Expected vs Contracted" subtitle="Ogni confronto conserva una fonte."><div className="divide-y divide-[#14213d]/7">{demoContract.terms.map((t) => <div key={t.id} className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center"><div><div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Termine</div><div className="mt-1 font-serif text-lg font-semibold text-inchiostro">{t.label}</div></div><div><div className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Atteso</div><div className="mt-1 text-sm font-medium text-slate-700">{t.expected}</div><div className="mt-1 text-[11px] text-slate-400">{t.sourceExpected}</div></div><div><div className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Nel draft</div><div className="mt-1 text-sm font-medium text-slate-700">{t.contracted}</div><div className="mt-1 text-[11px] text-slate-400">{t.sourceContract}</div></div><StatusPill tone={tone(t.status)}>{label(t.status)}</StatusPill></div>)}</div></Panel>
    <div className="mt-6"><ContractReviewClient terms={demoContract.terms} /></div>
    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50/70 p-5 text-xs leading-5 text-red-800"><strong>Guardrail:</strong> questa schermata è supporto documentale. Le differenze sono segnali da sottoporre a Legal/Rights, non pareri legali né approvazioni automatiche.</div>
  </WorkspacePage>;
}
