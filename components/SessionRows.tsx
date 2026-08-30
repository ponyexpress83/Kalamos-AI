"use client";

import { useEffect, useState } from "react";
import BatchTable, { type BatchRow } from "./BatchTable";
import { loadSession, clearSession } from "@/lib/session";
import { pct } from "@/lib/format";

/**
 * Manoscritti analizzati in QUESTA sessione del browser (batch/paste/upload):
 * compaiono in Redazione sopra i demo. Dati solo in localStorage.
 */
export default function SessionRows() {
  const [rows, setRows] = useState<BatchRow[] | null>(null);

  useEffect(() => {
    const entries = loadSession();
    setRows(
      entries.map((e) => {
        const best = [...e.result.scheda.fit_collane].sort(
          (a, b) => b.score - a.score,
        )[0];
        return {
          id: e.key,
          href: `/scheda/s/${e.key}`,
          titolo: e.titolo,
          autore:
            e.result.meta.fonte === "simulata"
              ? "analizzato in sessione · anteprima simulata"
              : "analizzato in sessione · dal vivo",
          genere: e.result.scheda.genere,
          editore: best?.editore ?? "—",
          collana: best?.collana ?? "—",
          fitPct: best ? pct(best.score) : 0,
          raccomandazione: e.result.scheda.raccomandazione,
        } satisfies BatchRow;
      }),
    );
  }, []);

  if (!rows || rows.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-serif text-lg font-semibold text-inchiostro">
          Analizzati in questa sessione ({rows.length})
        </h2>
        <button
          onClick={() => {
            clearSession();
            setRows([]);
          }}
          className="font-sans text-xs text-stone-400 underline transition hover:text-accento"
        >
          svuota
        </button>
      </div>
      <BatchTable rows={rows} />
    </section>
  );
}
