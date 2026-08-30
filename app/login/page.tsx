import Link from "next/link";
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Accesso — Kalamos AI" };

export default function LoginPage() {
  return (
    <div className="full-bleed -mt-10 min-h-[calc(100vh-57px)] bg-[#071426] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(44,139,222,.22),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(229,83,61,.13),transparent_30%)]" />
        <div className="paper-orbit paper-orbit-a" aria-hidden="true" />
        <div className="paper-orbit paper-orbit-b" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-57px)] max-w-6xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_.75fr] lg:px-10">
          <section>
            <Link href="/" className="inline-block">
              <Logo height={46} variant="paper" />
            </Link>
            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff755a]">
              Editorial Intelligence Workspace
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
              La memoria della redazione, <span className="text-[#ff755a]">in contesto.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
              Dalla provenienza di un'opportunità alla decisione editoriale, dal controllo contrattuale alle nuove bozze: Kalamos collega le evidenze senza sostituire chi decide.
            </p>
            <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["01", "Decision memory"],
                ["02", "Contract review"],
                ["03", "Version intelligence"],
              ].map(([n, t]) => (
                <div key={n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                  <div className="text-[10px] font-semibold tracking-[0.2em] text-[#68b9ff]">{n}</div>
                  <div className="mt-2 text-sm text-white/80">{t}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-[#0d1d35]/85 p-6 shadow-[0_30px_100px_rgba(0,0,0,.34)] backdrop-blur-xl sm:p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68b9ff]">Accesso</div>
              <h2 className="mt-2 font-serif text-3xl font-semibold">Entra in Kalamos</h2>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Per la presentazione puoi utilizzare il workspace dimostrativo protetto, senza dipendere da configurazioni esterne.
              </p>
            </div>
            <LoginForm />
          </section>
        </div>
      </div>
    </div>
  );
}
