"use client";

import type { Profilo, Reparto } from "@/config/imprints";

export interface ImprintChip {
  id: string;
  nome: string;
  reparto: Reparto;
  profilo: Profilo;
  defaultOn?: boolean;
}

const ORDER: Reparto[] = ["Narrativa", "Poesia", "Bambini e ragazzi", "Generi"];

export default function ImprintChips({
  imprints,
  selected,
  onToggle,
}: {
  imprints: ImprintChip[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const gruppi = ORDER.map((reparto) => ({
    reparto,
    voci: imprints.filter((i) => i.reparto === reparto),
  })).filter((g) => g.voci.length > 0);

  return (
    <div className="space-y-4">
      {gruppi.map((g) => (
        <div key={g.reparto}>
          <div className="mb-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            {g.reparto}
          </div>
          <div className="flex flex-wrap gap-2">
            {g.voci.map((imp) => {
              const on = selected.includes(imp.id);
              return (
                <button
                  key={imp.id}
                  type="button"
                  onClick={() => onToggle(imp.id)}
                  aria-pressed={on}
                  className={`rounded-full border px-3.5 py-1.5 font-sans text-sm transition ${
                    on
                      ? "border-inchiostro bg-inchiostro text-carta"
                      : "border-carta-scura bg-white/60 text-stone-600 hover:border-inchiostro/40"
                  }`}
                >
                  {imp.nome}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
