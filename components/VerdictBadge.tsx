import type { Verdetto } from "@/lib/data";

const styles: Record<Verdetto, string> = {
  "Acquisizione forte": "bg-emerald-100 text-emerald-800 border-emerald-300",
  Approfondisci: "bg-amber-100 text-amber-900 border-amber-300",
  Rigetta: "bg-stone-200 text-stone-600 border-stone-300",
};

export default function VerdictBadge({ verdetto, className = "" }: { verdetto: Verdetto; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${styles[verdetto]} ${className}`}
    >
      {verdetto}
    </span>
  );
}
