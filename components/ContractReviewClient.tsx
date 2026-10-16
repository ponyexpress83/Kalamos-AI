"use client";

import { useEffect, useState } from "react";
import type { DemoContractTerm } from "@/lib/demo-workspace";

export default function ContractReviewClient({ terms }: { terms: DemoContractTerm[] }) {
  const key = "kalamos_contract_review_v1";
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw) setReviewed(JSON.parse(raw)); } catch {}
  }, []);

  function toggle(id: string) {
    const next = { ...reviewed, [id]: !reviewed[id] };
    setReviewed(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  const open = terms.filter((t) => t.status !== "match" && !reviewed[t.id]).length;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#14213d]/10 bg-white/85 px-5 py-4 text-xs text-slate-600">
        <strong className="text-inchiostro">Review state:</strong> {open === 0 ? "tutte le differenze demo sono state prese in carico" : `${open} differenze ancora da prendere in carico`}.
      </div>
      {terms.filter((t) => t.status !== "match").map((t) => (
        <div key={t.id} className={`rounded-2xl border p-5 ${reviewed[t.id] ? "border-emerald-200 bg-emerald-50/50" : "border-amber-200 bg-amber-50/50"}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-serif text-lg font-semibold text-inchiostro">{t.label}</div>
              <div className="mt-1 text-xs leading-5 text-slate-600">Atteso: <strong>{t.expected}</strong> · Draft: <strong>{t.contracted}</strong></div>
              <div className="mt-1 text-[11px] text-slate-400">{t.sourceExpected} ↔ {t.sourceContract}</div>
            </div>
            <button onClick={() => toggle(t.id)} className={`rounded-xl px-4 py-2.5 text-xs font-semibold ${reviewed[t.id] ? "border border-emerald-200 bg-white text-emerald-700" : "bg-inchiostro text-white"}`}>
              {reviewed[t.id] ? "Presa in carico ✓" : "Segna presa in carico"}
            </button>
          </div>
        </div>
      ))}
      <p className="text-[11px] leading-5 text-slate-400">Lo stato di presa in carico è persistito nel browser per la demo. Non equivale ad approvazione legale.</p>
    </div>
  );
}
