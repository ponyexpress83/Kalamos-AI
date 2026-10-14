"use client";

import { useEffect, useState } from "react";
import { Panel, StatusPill } from "./WorkspaceShell";

export interface VoceMemoria {
  date: string;
  imprint: string;
  decision: string;
  reason: string;
  source: string;
  /** Chi ha registrato la decisione, se registrata in questo browser. */
  reviewer?: string;
  locale?: boolean;
}

export interface OpportunitaMemoria {
  id: string;
  title: string;
  imprint: string;
}

/** Stessa chiave scritta da OpportunityDecisionClient. */
const PREFISSO = "kalamos_opportunity_decision_";

type Salvata = { decision: string; rationale: string; reviewer: string; ts: number };

/**
 * Registro delle decisioni: quelle dimostrative più quelle salvate dall'editor
 * in questo browser. Prima le decisioni registrate dalla scheda opportunità
 * non comparivano qui, e il percorso "decido → la memoria ricorda perché" si
 * interrompeva proprio sulla pagina che dovrebbe dimostrarlo.
 */
export default function MemoriaClient({
  demo,
  opportunita,
}: {
  demo: VoceMemoria[];
  opportunita: OpportunitaMemoria[];
}) {
  const [locali, setLocali] = useState<VoceMemoria[]>([]);

  useEffect(() => {
    const voci: (VoceMemoria & { ts: number })[] = [];
    try {
      opportunita.forEach((o) => {
        const raw = window.localStorage.getItem(PREFISSO + o.id);
        if (!raw) return;
        const s = JSON.parse(raw) as Salvata;
        if (!s?.decision || !s?.rationale) return;
        voci.push({
          date: new Date(s.ts).toLocaleDateString("it-IT", { day: "numeric", month: "short" }),
          imprint: o.imprint,
          decision: s.decision,
          reason: s.rationale,
          source: o.title,
          reviewer: s.reviewer,
          locale: true,
          ts: s.ts,
        });
      });
    } catch {
      /* localStorage non disponibile: resta il registro dimostrativo */
    }
    setLocali(voci.sort((a, b) => b.ts - a.ts));
  }, [opportunita]);

  const tutte = [...locali, ...demo];

  return (
    <>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-[#0b1b31] p-6 text-white">
          <div className="text-xs text-white/40">Decisioni registrate</div>
          <div className="mt-2 font-serif text-4xl font-semibold">{tutte.length}</div>
          <div className="mt-2 text-xs text-white/50">
            {locali.length > 0
              ? `${demo.length} dimostrative + ${locali.length} registrate da te in questo browser. Campione troppo piccolo per inferenze statistiche.`
              : "Campione troppo piccolo per inferenze statistiche"}
          </div>
        </div>
        <div className="rounded-2xl border border-[#14213d]/10 bg-white/80 p-6">
          <div className="text-xs text-slate-400">Principio</div>
          <div className="mt-2 font-serif text-2xl font-semibold text-inchiostro">Verified feedback</div>
          <div className="mt-2 text-xs leading-5 text-slate-500">La memoria cresce da decisioni umane registrate, non da “apprendimento” invisibile.</div>
        </div>
        <div className="rounded-2xl border border-[#14213d]/10 bg-white/80 p-6">
          <div className="text-xs text-slate-400">Calibration</div>
          <div className="mt-2 font-serif text-2xl font-semibold text-inchiostro">Baseline first</div>
          <div className="mt-2 text-xs leading-5 text-slate-500">Un futuro modello calibrato va misurato separatamente dalla baseline.</div>
        </div>
      </div>
      <Panel title="Decision log" subtitle="Dati dimostrativi più le decisioni che registri dalle schede opportunità. Il formato è quello del dataset di validazione, non una simulazione di traction.">
        <div className="divide-y divide-[#14213d]/7">
          {tutte.map((m, i) => (
            <div key={`${m.date}-${m.source}-${i}`} className={`grid gap-4 px-5 py-5 sm:px-6 md:grid-cols-[90px_1fr_1.7fr_auto] md:items-center ${m.locale ? "bg-emerald-50/40" : ""}`}>
              <div className="text-xs font-semibold text-slate-400">{m.date}</div>
              <div>
                <div className="font-serif font-semibold text-inchiostro">{m.source}</div>
                <div className="mt-1 text-xs text-slate-400">
                  {m.imprint}
                  {m.locale && ` · ${m.reviewer || "editor"} · registrata in questo browser`}
                </div>
              </div>
              <div className="text-sm leading-6 text-slate-600">{m.reason}</div>
              <StatusPill tone={m.decision === "Pass" ? "neutral" : m.decision === "Strong interest" ? "success" : "info"}>{m.decision}</StatusPill>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
