"use client";

import { FormEvent, useState } from "react";

const suggestions = [
  "Perché Il giardino di vetro è in seconda lettura?",
  "Cosa è cambiato tra V2 e V3?",
  "Abbiamo i diritti audiobook?",
  "Cosa devo sapere prima della call con l'autrice?",
];

type Msg = { role: "user" | "assistant"; text: string; sources?: string[]; mode?: string };

export default function AskKalamosClient() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Sono Ask Kalamos. In questa demo conosco il contesto preparato di acquisition, contratto, memoria e versioni. Le risposte fattuali restano legate alle fonti del workspace." },
  ]);
  const [loading, setLoading] = useState(false);

  async function ask(q: string) {
    const clean = q.trim(); if (!clean || loading) return;
    setQuestion(""); setMessages((m) => [...m, { role: "user", text: clean }]); setLoading(true);
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: clean }) });
      const data = (await res.json()) as { answer?: string; error?: string; sources?: string[]; mode?: string };
      if (!res.ok) throw new Error(data.error || "Risposta non disponibile.");
      setMessages((m) => [...m, { role: "assistant", text: data.answer || "Nessuna risposta.", sources: data.sources, mode: data.mode }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", text: e instanceof Error ? e.message : "Risposta non disponibile." }]);
    } finally { setLoading(false); }
  }

  function submit(e: FormEvent) { e.preventDefault(); void ask(question); }

  return <div className="grid min-h-[620px] overflow-hidden rounded-2xl border border-[#14213d]/10 bg-white/85 shadow-[0_18px_60px_rgba(20,33,61,.06)] lg:grid-cols-[280px_1fr]">
    <aside className="border-b border-[#14213d]/8 bg-[#f8f5ef] p-5 lg:border-b-0 lg:border-r"><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accento">Prompt suggeriti</div><div className="mt-4 space-y-2">{suggestions.map((s) => <button key={s} onClick={() => void ask(s)} className="w-full rounded-xl border border-[#14213d]/8 bg-white px-3 py-3 text-left text-xs leading-5 text-slate-600 transition hover:border-[#14213d]/20 hover:text-inchiostro">{s}</button>)}</div><div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-3 text-[11px] leading-5 text-blue-700">Il fallback deterministico mantiene il percorso demo utilizzabile anche se il provider AI non risponde.</div></aside>
    <div className="flex min-h-0 flex-col"><div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">{messages.map((m, i) => <div key={i} className={`max-w-3xl ${m.role === "user" ? "ml-auto" : ""}`}><div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${m.role === "user" ? "bg-inchiostro text-white" : "border border-[#14213d]/8 bg-[#faf8f4] text-slate-700"}`}>{m.text}</div>{m.sources && <div className="mt-2 flex flex-wrap gap-2">{m.sources.map((s) => <span key={s} className="rounded-full border border-[#14213d]/8 bg-white px-2.5 py-1 text-[10px] font-medium text-slate-400">{s}</span>)}{m.mode && <span className="px-1 py-1 text-[10px] text-slate-300">{m.mode}</span>}</div>}</div>)}{loading && <div className="text-xs text-slate-400">Kalamos sta leggendo il contesto…</div>}</div>
      <form onSubmit={submit} className="border-t border-[#14213d]/8 p-4 sm:p-5"><div className="flex gap-3 rounded-2xl border border-[#14213d]/10 bg-white p-2 shadow-sm"><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Chiedi qualcosa sul workspace editoriale…" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-inchiostro outline-none placeholder:text-slate-300" /><button disabled={!question.trim() || loading} className="rounded-xl bg-accento px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">Invia →</button></div></form>
    </div>
  </div>;
}
