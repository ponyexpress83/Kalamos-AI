import Link from "next/link";

export function WorkspacePage({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accento">{eyebrow}</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.035em] text-inchiostro sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

export function StatCard({ label, value, detail, accent = false }: { label: string; value: string; detail?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-[#cb5a3c]/20 bg-[#cb5a3c]/[0.06]" : "border-[#14213d]/10 bg-white/80"}`}>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-2 font-serif text-3xl font-semibold tracking-[-0.03em] text-inchiostro">{value}</div>
      {detail && <div className="mt-1 text-xs leading-5 text-slate-500">{detail}</div>}
    </div>
  );
}

export function Panel({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`overflow-hidden rounded-2xl border border-[#14213d]/10 bg-white/85 shadow-[0_15px_50px_rgba(20,33,61,.05)] ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-[#14213d]/8 px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-serif text-xl font-semibold text-inchiostro">{title}</h2>
          {subtitle && <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="rounded-xl bg-inchiostro px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20345e]">{children}</Link>;
}

export function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="rounded-xl border border-[#14213d]/12 bg-white/70 px-4 py-2.5 text-sm font-medium text-inchiostro transition hover:bg-white">{children}</Link>;
}

export function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "info" }) {
  const tones = {
    neutral: "border-slate-200 bg-slate-50 text-slate-600",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    danger: "border-red-200 bg-red-50 text-red-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}
