"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn(payload: { demo?: boolean; email?: string; password?: string }) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Accesso non riuscito.");
      router.push("/workspace");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Accesso non riuscito.");
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    await signIn({ email, password });
  }

  return (
    <div className="grid gap-5">
      <button
        type="button"
        onClick={() => signIn({ demo: true })}
        disabled={loading}
        className="group flex w-full items-center justify-between rounded-2xl bg-accento px-5 py-4 text-left font-sans text-sm font-semibold text-white shadow-[0_16px_45px_rgba(203,90,60,.28)] transition hover:-translate-y-0.5 hover:bg-[#dc6444] disabled:cursor-wait disabled:opacity-60"
      >
        <span>
          Entra nel workspace dimostrativo
          <span className="mt-1 block text-xs font-normal text-white/75">
            Percorso stabile, dati demo già preparati per la presentazione.
          </span>
        </span>
        <span className="text-xl transition group-hover:translate-x-1">→</span>
      </button>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
        <span className="h-px flex-1 bg-white/10" />
        Accesso riservato
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={submit} className="grid gap-4">
        <label className="grid gap-1.5 text-sm text-white/75">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="nome@editore.it"
            className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-[#68b9ff]/60 focus:bg-white/[0.08]"
          />
        </label>
        <label className="grid gap-1.5 text-sm text-white/75">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-[#68b9ff]/60 focus:bg-white/[0.08]"
          />
        </label>
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Accesso…" : "Accedi"}
        </button>
      </form>

      {error && (
        <div role="alert" className="rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <p className="text-xs leading-relaxed text-white/40">
        Il workspace pubblico usa esclusivamente dati dimostrativi. Le credenziali riservate possono essere configurate sul deployment senza esporle nel client.
      </p>
    </div>
  );
}
