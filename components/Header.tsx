"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  function logout() {
    document.cookie = "kalamos_auth=; path=/; max-age=0";
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-carta-scura bg-carta/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="font-serif text-xl font-bold text-inchiostro">
          Kalamos<span className="text-ruggine"> AI</span>
        </Link>
        <div className="flex items-center gap-4 font-sans text-sm">
          <span className="hidden text-stone-500 sm:inline">Sperling &amp; Kupfer · redazione</span>
          <button
            onClick={logout}
            className="rounded-md border border-carta-scura px-3 py-1.5 text-inchiostro transition hover:bg-carta-scura"
          >
            Esci
          </button>
        </div>
      </div>
    </header>
  );
}
