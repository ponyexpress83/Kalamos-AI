"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    document.cookie = "kalamos_auth=1; path=/; max-age=86400; samesite=lax";
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold">
            Kalamos<span className="text-ruggine"> AI</span>
          </h1>
          <p className="mt-2 font-sans text-sm text-stone-500">
            Editorial Intelligence Engine
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-xl border border-carta-scura bg-white/60 p-7 shadow-sm"
        >
          <label className="block font-sans text-sm font-medium text-inchiostro">
            Email redazione
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@sperling.it"
              className="mt-1 w-full rounded-md border border-carta-scura bg-carta px-3 py-2 font-sans text-sm outline-none focus:border-ruggine"
            />
          </label>

          <label className="mt-4 block font-sans text-sm font-medium text-inchiostro">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border border-carta-scura bg-carta px-3 py-2 font-sans text-sm outline-none focus:border-ruggine"
            />
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-inchiostro px-4 py-2.5 font-sans text-sm font-medium text-carta transition hover:bg-ruggine"
          >
            Accedi
          </button>

          <p className="mt-4 text-center font-sans text-xs text-stone-400">
            Demo — qualsiasi email e password accedono all'ambiente di prova.
          </p>
        </form>
      </div>
    </main>
  );
}
