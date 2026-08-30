"use client";

import { useEffect, useMemo, useState } from "react";

type Decision = "Seconda lettura" | "Strong interest" | "Pass" | "Hold";

type Stored = { decision: Decision; rationale: string; reviewer: string; ts: number };

export default function OpportunityDecisionClient({ opportunityId }: { opportunityId: string }) {
  const key = `kalamos_opportunity_decision_${opportunityId}`;
  const [decision, setDecision] = useState<Decision>("Seconda lettura");
  const [rationale, setRationale] = useState("");
  const [reviewer, setReviewer] = useState("Editor demo");
  const [saved, setSaved] = useState<Stored | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Stored;
        setSaved(parsed);
        setDecision(parsed.decision);
        setRationale(parsed.rationale);
        setReviewer(parsed.reviewer);
      }
    } catch {}
  }, [key]);

  const canSave = useMemo(() => rationale.trim().length >= 12 && reviewer.trim().length >= 2, [rationale, reviewer]);

  function save() {
    if (!canSave) return;
    const value: Stored = { decision, rationale: rationale.trim(), reviewer: reviewer.trim(), ts: Date.now() };
    localStorage.setItem(key, JSON.stringify(value));
    setSaved(value);
  }

  return (
    <div className="rounded-2xl border border-[#14213d]/10 bg-white/85 p-5 shadow-[0_15px_50px_rgba(20,33,61,.05)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accento">Human decision</div>
          <h3 className="mt-1 font-serif text-xl font-semibold text-inchiostro">Registra la decisione editoriale</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">Kalamos non chiude l'opportunità da solo: salva decisione, motivazione e autore del giudizio.</p>
        </div>
        {saved && <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">Decisione salvata</span>}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Decisione
          <select value={decision} onChange={(e) => setDecision(e.target.value as Decision)} className="rounded-xl border border-[#14213d]/10 bg-white px-3 py-2.5 text-sm text-inchiostro outline-none focus:border-[#3186c9]/50">
            <option>Seconda lettura</option><option>Strong interest</option><option>Hold</option><option>Pass</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Reviewer
          <input value={reviewer} onChange={(e) => setReviewer(e.target.value)} className="rounded-xl border border-[#14213d]/10 bg-white px-3 py-2.5 text-sm text-inchiostro outline-none focus:border-[#3186c9]/50" />
        </label>
      </div>
      <label className="mt-4 grid gap-1.5 text-xs font-medium text-slate-600">Motivazione verificata
        <textarea value={rationale} onChange={(e) => setRationale(e.target.value)} rows={4} placeholder="Perché la redazione prende questa decisione?" className="rounded-xl border border-[#14213d]/10 bg-white px-3 py-3 text-sm leading-6 text-inchiostro outline-none focus:border-[#3186c9]/50" />
      </label>
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-[11px] text-slate-400">Minimo 12 caratteri: la memoria non accetta decisioni senza razionale.</span>
        <button onClick={save} disabled={!canSave} className="rounded-xl bg-inchiostro px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20345e] disabled:cursor-not-allowed disabled:opacity-35">Salva nella memoria</button>
      </div>
      {saved && <div className="mt-4 rounded-xl border border-[#14213d]/8 bg-[#f8f5ef] px-4 py-3 text-xs leading-5 text-slate-600"><strong className="text-inchiostro">Ultima decisione:</strong> {saved.decision} — “{saved.rationale}” · {saved.reviewer}</div>}
    </div>
  );
}
