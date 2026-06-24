import type { Scheda } from "@/lib/schema";
import { pct, fitColor } from "@/lib/format";

export default function FitBars({ fit }: { fit: Scheda["fit_collane"] }) {
  // Ordina dal fit più alto al più basso per dare subito il colpo d'occhio.
  const ordinate = [...fit].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-4">
      {ordinate.map((f) => {
        const p = pct(f.score);
        return (
          <div key={f.collana}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className="font-sans text-sm font-semibold text-inchiostro">
                {f.collana}
              </span>
              <span className="font-sans text-sm tabular-nums text-inchiostro">
                {p}
                <span className="text-stone-400">%</span>
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-carta-scura">
              <div
                className={`h-full rounded-full ${fitColor(f.score)}`}
                style={{ width: `${p}%` }}
              />
            </div>
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-stone-600">
              {f.motivazione}
            </p>
          </div>
        );
      })}
    </div>
  );
}
