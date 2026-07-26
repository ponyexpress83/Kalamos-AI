"use client";

import type { Ambito, Profilo } from "@/config/publishers";

export interface PublisherOption {
  id: string;
  nome: string;
  ambito: Ambito;
  defaultOn?: boolean;
  collane: { nome: string; profilo: Profilo }[];
}

const ORDER: Ambito[] = [
  "Poesia",
  "Narrativa",
  "Bambini e ragazzi",
  "Fantasy e fantascienza",
];

export default function PublisherChips({
  publishers,
  selected,
  onToggle,
}: {
  publishers: PublisherOption[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const gruppi = ORDER.map((ambito) => ({
    ambito,
    voci: publishers.filter((p) => p.ambito === ambito),
  })).filter((g) => g.voci.length > 0);

  return (
    <div className="space-y-4">
      {gruppi.map((g) => (
        <div key={g.ambito}>
          <div className="mb-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            {g.ambito}
          </div>
          <div className="flex flex-wrap gap-2">
            {g.voci.map((p) => {
              const on = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onToggle(p.id)}
                  aria-pressed={on}
                  title={`${p.collane.length} collane`}
                  className={`rounded-full border px-3.5 py-1.5 font-sans text-sm transition ${
                    on
                      ? "border-inchiostro bg-inchiostro text-carta"
                      : "border-carta-scura bg-white/60 text-stone-600 hover:border-inchiostro/40"
                  }`}
                >
                  {p.nome}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
