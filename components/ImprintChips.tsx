"use client";

export interface ImprintChip {
  id: string;
  nome: string;
}

export default function ImprintChips({
  imprints,
  selected,
  onToggle,
}: {
  imprints: ImprintChip[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {imprints.map((imp) => {
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
  );
}
