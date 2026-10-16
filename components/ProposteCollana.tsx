import type { Scheda } from "@/lib/schema";
import { pct, fitColor } from "@/lib/format";
import { publishers } from "@/config/publishers";

const gruppoByNome: Record<string, string> = Object.fromEntries(
  publishers.map((p) => [p.nome, p.gruppo]),
);

/**
 * Mostra, per ciascuna casa editrice selezionata, la COLLANA suggerita
 * (score più alto) più le altre collane in ordine di fit. È il cuore della
 * demo: scelta la casa, Kalamos propone automaticamente la collana adatta.
 */
export default function ProposteCollana({
  fit,
}: {
  fit: Scheda["fit_collane"];
}) {
  // Raggruppa per editore, mantenendo l'ordine di prima comparsa.
  const perEditore = new Map<string, Scheda["fit_collane"]>();
  for (const f of fit) {
    const arr = perEditore.get(f.editore) ?? [];
    arr.push(f);
    perEditore.set(f.editore, arr);
  }

  return (
    <div className="space-y-6">
      {Array.from(perEditore.entries()).map(([editore, collane]) => {
        const ordinate = [...collane].sort((a, b) => b.score - a.score);
        const top = ordinate[0];
        const altre = ordinate.slice(1);
        return (
          <div key={editore}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="font-serif text-base font-semibold text-inchiostro">
                {editore}
                {gruppoByNome[editore] === "Gruppo Mondadori" && (
                  <span className="ml-2 align-middle rounded-full border border-accento/40 px-1.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-accento">
                    Gruppo Mondadori
                  </span>
                )}
              </span>
              {top && (
                <span className="font-sans text-xs text-stone-500">
                  collana suggerita
                </span>
              )}
            </div>

            {top && (
              <div className="rounded-lg border border-inchiostro/25 bg-white/70 p-3">
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="font-sans text-sm font-semibold text-inchiostro">
                    → {top.collana}
                  </span>
                  <span className="font-sans text-sm tabular-nums text-inchiostro">
                    {pct(top.score)}
                    <span className="text-stone-400">%</span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-carta-scura">
                  <div
                    className={`h-full rounded-full ${fitColor(top.score)}`}
                    style={{ width: `${pct(top.score)}%` }}
                  />
                </div>
                <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-stone-600">
                  {top.motivazione}
                </p>
              </div>
            )}

            {altre.length > 0 && (
              <div className="mt-2 space-y-1.5 pl-1">
                {altre.map((f) => (
                  <div
                    key={f.collana}
                    className="flex items-center gap-3 font-sans text-[13px] text-stone-500"
                  >
                    <span className="w-32 shrink-0 truncate">{f.collana}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-carta-scura">
                      <div
                        className={`h-full rounded-full ${fitColor(f.score)}`}
                        style={{ width: `${pct(f.score)}%` }}
                      />
                    </div>
                    <span className="w-9 shrink-0 text-right tabular-nums">
                      {pct(f.score)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
