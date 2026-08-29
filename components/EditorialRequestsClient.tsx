"use client";

import { useEffect, useState } from "react";

export interface EditorialRequestItem { id: string; title: string; status: string; priority: string }

const statuses = ["Aperta", "Parziale", "Risolta"] as const;

export default function EditorialRequestsClient({ requests }: { requests: EditorialRequestItem[] }) {
  const key = "kalamos_editorial_requests_v1";
  const [state, setState] = useState<Record<string, string>>({});

  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw) setState(JSON.parse(raw)); } catch {}
  }, []);

  function update(id: string, value: string) {
    const next = { ...state, [id]: value };
    setState(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  return <div className="divide-y divide-[#14213d]/7">{requests.map((r) => {
    const current = state[r.id] || r.status;
    return <div key={r.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6"><div><div className="text-sm font-semibold text-inchiostro">{r.title}</div><div className="mt-1 text-xs text-slate-400">Priorità {r.priority} · conferma sempre umana</div></div><select value={current} onChange={(e) => update(r.id, e.target.value)} className="rounded-xl border border-[#14213d]/10 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none">{statuses.map((s) => <option key={s}>{s}</option>)}</select></div>;
  })}</div>;
}
