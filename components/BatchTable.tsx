"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Raccomandazione } from "@/lib/schema";
import RecommendationBadge from "./RecommendationBadge";

export interface BatchRow {
  id: string;
  titolo: string;
  autore: string;
  genere: string;
  editore: string;
  collana: string;
  fitPct: number;
  raccomandazione: Raccomandazione;
  /** Destinazione al click; default /scheda/<id>. */
  href?: string;
}

type SortKey = "titolo" | "genere" | "fit" | "racc";

const raccOrder: Record<Raccomandazione, number> = {
  prioritario: 2,
  seconda_lettura: 1,
  scarta: 0,
};

export default function BatchTable({ rows }: { rows: BatchRow[] }) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>("fit");
  const [asc, setAsc] = useState(false);

  function sortBy(key: SortKey) {
    if (key === sortKey) setAsc((a) => !a);
    else {
      setSortKey(key);
      setAsc(key === "titolo" || key === "genere");
    }
  }

  const sorted = [...rows].sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case "titolo": cmp = a.titolo.localeCompare(b.titolo, "it"); break;
      case "genere": cmp = a.genere.localeCompare(b.genere, "it"); break;
      case "fit": cmp = a.fitPct - b.fitPct; break;
      case "racc": cmp = raccOrder[a.raccomandazione] - raccOrder[b.raccomandazione]; break;
    }
    return asc ? cmp : -cmp;
  });

  const arrow = (key: SortKey) => (sortKey === key ? (asc ? " ↑" : " ↓") : "");

  const Th = ({
    k,
    label,
    right,
    soloDesktop,
  }: {
    k: SortKey;
    label: string;
    right?: boolean;
    soloDesktop?: boolean;
  }) => (
    <th
      onClick={() => sortBy(k)}
      className={`cursor-pointer select-none px-3 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-stone-500 transition hover:text-accento sm:px-4 ${
        right ? "text-right" : "text-left"
      } ${soloDesktop ? "hidden sm:table-cell" : ""}`}
    >
      {label}
      {arrow(k)}
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-carta-scura bg-white/50">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-carta-scura">
            <Th k="titolo" label="Titolo" />
            <Th k="genere" label="Genere" soloDesktop />
            <Th k="fit" label="Collana suggerita" right />
            <Th k="racc" label="Raccomandazione" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr
              key={r.id}
              onClick={() => router.push(r.href ?? `/scheda/${r.id}`)}
              className="cursor-pointer border-b border-carta-scura/60 transition last:border-0 hover:bg-carta-scura/40"
            >
              <td className="px-3 py-3 sm:px-4">
                <div className="font-serif text-[15px] font-semibold text-inchiostro">
                  {r.titolo}
                </div>
                <div className="font-sans text-xs text-stone-500">{r.autore}</div>
                {/* Su telefono il genere sta qui: la colonna dedicata sparisce
                    per lasciare spazio a fit e raccomandazione. */}
                <div className="font-sans text-xs text-stone-600 sm:hidden">{r.genere}</div>
              </td>
              <td className="hidden px-4 py-3 font-sans text-sm text-stone-600 sm:table-cell">
                {r.genere}
              </td>
              <td className="px-3 py-3 text-right sm:px-4">
                <span className="font-sans text-sm tabular-nums font-semibold text-inchiostro">
                  {r.fitPct}%
                </span>
                <span className="block font-sans text-xs text-stone-500">
                  {r.editore} · {r.collana}
                </span>
              </td>
              <td className="px-3 py-3 sm:px-4">
                <RecommendationBadge value={r.raccomandazione} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
