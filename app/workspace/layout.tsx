import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WorkspaceNav from "@/components/WorkspaceNav";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const mobileLinks = [
  ["/workspace", "Desk"],
  ["/workspace/acquisitions", "Acquisizioni"],
  ["/workspace/contracts", "Contratti"],
  ["/workspace/projects", "Progetti"],
  ["/workspace/memory", "Memoria"],
  ["/workspace/ask", "Ask"],
] as const;

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const session = verifySessionToken(cookies().get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");

  return (
    <div className="full-bleed -mt-10 min-h-screen bg-[#f3efe8]">
      <div className="grid min-h-screen lg:grid-cols-[250px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen"><WorkspaceNav email={session.email} /></div>
        </div>
        <div className="min-w-0">
          <div className="sticky top-0 z-40 border-b border-[#14213d]/10 bg-white/90 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between px-4 py-3"><span className="font-serif text-lg font-semibold tracking-[0.08em] text-[#14213d]">KALAMOS <span className="text-[#cb5a3c]">AI</span></span><Link href="/workspace/ask" className="rounded-full bg-[#14213d] px-4 py-2 text-xs font-semibold text-white">Ask Kalamos</Link></div>
            <div className="flex gap-1 overflow-x-auto px-3 pb-3">{mobileLinks.map(([href,label]) => <Link key={href} href={href} className="shrink-0 rounded-full border border-[#14213d]/10 bg-[#f7f3ec] px-3 py-1.5 text-[11px] font-medium text-slate-600">{label}</Link>)}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
