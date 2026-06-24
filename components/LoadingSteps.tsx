"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Lettura del manoscritto…",
  "Analisi della prosa e della voce…",
  "Calcolo del fit di collana…",
  "Ricerca dei comparabili di mercato…",
  "Composizione della scheda…",
];

export default function LoadingSteps() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mb-6 flex justify-center">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-carta-scura border-t-accento" />
      </div>
      <ul className="space-y-2 text-left">
        {STEPS.map((s, idx) => {
          const done = idx < i;
          const active = idx === i;
          return (
            <li
              key={s}
              className={`flex items-center gap-3 font-sans text-sm transition ${
                done
                  ? "text-stone-400"
                  : active
                    ? "text-inchiostro"
                    : "text-stone-300"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-accento text-white"
                      : "bg-carta-scura text-stone-400"
                }`}
              >
                {done ? "✓" : active ? "·" : ""}
              </span>
              {s}
            </li>
          );
        })}
      </ul>
      <p className="mt-8 font-serif text-sm italic text-stone-500">
        Kalamos legge in parallelo all'editor, mai al suo posto.
      </p>
    </div>
  );
}
