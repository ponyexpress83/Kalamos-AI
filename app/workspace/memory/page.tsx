import { demoMemory } from "@/lib/demo-workspace";
import { Panel, StatusPill, WorkspacePage } from "@/components/WorkspaceShell";

export const metadata = { title: "Editorial Memory — Kalamos AI" };

export default function MemoryPage() {
  return (
    <WorkspacePage eyebrow="Institutional editorial memory" title="Non solo cosa avete deciso. Perché." description="La differenza rispetto a un modello generico nasce quando la redazione registra motivazioni verificabili: consenso, disaccordo e ragione della decisione restano interrogabili nel tempo.">
      <div className="mb-6 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#0b1b31] p-6 text-white"><div className="text-xs text-white/40">Decisioni demo</div><div className="mt-2 font-serif text-4xl font-semibold">4</div><div className="mt-2 text-xs text-white/50">Campione troppo piccolo per inferenze statistiche</div></div><div className="rounded-2xl border border-[#14213d]/10 bg-white/80 p-6"><div className="text-xs text-slate-400">Principio</div><div className="mt-2 font-serif text-2xl font-semibold text-inchiostro">Verified feedback</div><div className="mt-2 text-xs leading-5 text-slate-500">La memoria cresce da decisioni umane registrate, non da “apprendimento” invisibile.</div></div><div className="rounded-2xl border border-[#14213d]/10 bg-white/80 p-6"><div className="text-xs text-slate-400">Calibration</div><div className="mt-2 font-serif text-2xl font-semibold text-inchiostro">Baseline first</div><div className="mt-2 text-xs leading-5 text-slate-500">Un futuro modello calibrato va misurato separatamente dalla baseline.</div></div></div>
      <Panel title="Decision log" subtitle="Dati dimostrativi: formato progettato per produrre il dataset di validazione, non per simulare traction."><div className="divide-y divide-[#14213d]/7">{demoMemory.map((m) => <div key={`${m.date}-${m.source}`} className="grid gap-4 px-5 py-5 sm:px-6 md:grid-cols-[90px_1fr_1.7fr_auto] md:items-center"><div className="text-xs font-semibold text-slate-400">{m.date}</div><div><div className="font-serif font-semibold text-inchiostro">{m.source}</div><div className="mt-1 text-xs text-slate-400">{m.imprint}</div></div><div className="text-sm leading-6 text-slate-600">{m.reason}</div><StatusPill tone={m.decision === "Pass" ? "neutral" : m.decision === "Strong interest" ? "success" : "info"}>{m.decision}</StatusPill></div>)}</div></Panel>
    </WorkspacePage>
  );
}
