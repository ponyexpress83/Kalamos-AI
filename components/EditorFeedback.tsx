"use client";

import { useEffect, useState } from "react";
import {
  getFeedback,
  saveFeedback,
  type VerdettoEditor,
} from "@/lib/feedback";

/**
 * Loop di feedback dell'editor: Concordo / Non concordo + nota facoltativa.
 * Nella demo il giudizio resta nel browser; nel prodotto reale è il dato che
 * calibra il fit sul gusto della casa editrice.
 */
export default function EditorFeedback({ schedaKey }: { schedaKey: string }) {
  const [verdetto, setVerdetto] = useState<VerdettoEditor | null>(null);
  const [nota, setNota] = useState("");
  const [salvato, setSalvato] = useState(false);

  useEffect(() => {
    const fb = getFeedback(schedaKey);
    if (fb) {
      setVerdetto(fb.verdetto);
      setNota(fb.nota ?? "");
      setSalvato(true);
    }
  }, [schedaKey]);

  function invia(v: VerdettoEditor) {
    setVerdetto(v);
    saveFeedback(schedaKey, { verdetto: v, nota: nota.trim() || undefined, ts: Date.now() });
    setSalvato(true);
  }

  function salvaNota() {
    if (!verdetto) return;
    saveFeedback(schedaKey, { verdetto, nota: nota.trim() || undefined, ts: Date.now() });
    setSalvato(true);
  }

  return (
    <div className="no-print mt-6 rounded-xl border border-carta-scura bg-white/50 p-5">
      <div className="mb-1 font-sans text-xs font-semibold uppercase tracking-wider text-accento">
        Il giudizio dell'editor
      </div>
      <p className="mb-3 font-sans text-sm text-stone-600">
        Il giudizio dell'editor calibra Kalamos sul gusto della casa: più schede
        validate, più il fit è vostro.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => invia("concordo")}
          className={`rounded-md border px-4 py-2 font-sans text-sm transition ${
            verdetto === "concordo"
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-carta-scura bg-white/60 text-inchiostro hover:border-emerald-600/50"
          }`}
        >
          ✓ Concordo
        </button>
        <button
          type="button"
          onClick={() => invia("non_concordo")}
          className={`rounded-md border px-4 py-2 font-sans text-sm transition ${
            verdetto === "non_concordo"
              ? "border-accento bg-accento text-white"
              : "border-carta-scura bg-white/60 text-inchiostro hover:border-accento/50"
          }`}
        >
          ✗ Non concordo
        </button>
        {salvato && (
          <span className="font-sans text-xs text-emerald-700">
            Giudizio registrato — grazie.
          </span>
        )}
      </div>
      {verdetto && (
        <div className="mt-3 flex items-start gap-2">
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            onBlur={salvaNota}
            rows={2}
            placeholder="Nota per la calibrazione (facoltativa): cosa correggeresti?"
            className="w-full resize-y rounded-md border border-carta-scura bg-white/70 p-2 font-sans text-sm text-inchiostro outline-none focus:border-accento"
          />
        </div>
      )}
    </div>
  );
}
