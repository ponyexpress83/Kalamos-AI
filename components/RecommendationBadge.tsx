import type { Raccomandazione } from "@/lib/schema";
import { raccomandazioneStyle } from "@/lib/format";

export default function RecommendationBadge({
  value,
  className = "",
}: {
  value: Raccomandazione;
  className?: string;
}) {
  const s = raccomandazioneStyle[value];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-sans text-xs font-medium tracking-wide ${s.badge} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
