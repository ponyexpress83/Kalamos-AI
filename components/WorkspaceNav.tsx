"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";

const links = [
  ["/workspace", "Scrivania", "⌂"],
  ["/workspace/acquisitions", "Acquisizioni", "◎"],
  ["/demo", "Analizza", "+"],
  ["/workspace/contracts", "Contratti", "§"],
  ["/workspace/projects", "Progetti editoriali", "▤"],
  ["/workspace/memory", "Memoria", "◇"],
  ["/workspace/ask", "Ask Kalamos", "✦"],
] as const;

export default function WorkspaceNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="flex h-full flex-col border-r border-white/8 bg-[#071426] text-white">
      <div className="border-b border-white/8 px-5 py-5">
        <Link href="/workspace" aria-label="Kalamos workspace">
          <Logo height={31} variant="paper" />
        </Link>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#68b9ff]/20 bg-[#68b9ff]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#91ceff]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Demo workspace
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {links.map(([href, label, icon]) => {
          const active = href === "/workspace" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-white/10 text-white shadow-inner shadow-white/[0.03]"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white/85"
              }`}
            >
              <span className={`grid h-7 w-7 place-items-center rounded-lg text-sm ${active ? "bg-[#ff664a]/15 text-[#ff755a]" : "bg-white/[0.04] text-white/40"}`}>
                {icon}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 p-4">
        <div className="truncate text-xs text-white/38">{email}</div>
        <button onClick={logout} className="mt-2 text-xs font-medium text-white/55 transition hover:text-white">
          Esci dal workspace →
        </button>
      </div>
    </aside>
  );
}
