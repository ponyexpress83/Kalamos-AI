"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SchedaView from "@/components/SchedaView";
import PrintButton from "@/components/PrintButton";
import { getSessionEntry, type SessionEntry } from "@/lib/session";
import EditorFeedback from "@/components/EditorFeedback";

/**
 * Scheda di un manoscritto analizzato in questa sessione del browser
 * (coda batch in localStorage). Client-only per definizione.
 */
export default function SchedaSessionePage({ params }: { params: { key: string } }) {
  const [entry, setEntry] = useState<SessionEntry | null | undefined>(undefined);

  useEffect(() => {
    setEntry(getSessionEntry(params.key) ?? null);
  }, [params.key]);

  if (entry === undefined) return null; // primo render lato client

  if (entry === null) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-lg text-stone-500">
          Scheda non trovata in questa sessione del browser.
        </p>
        <Link
          href="/redazione"
          className="mt-4 inline-block font-sans text-sm text-accento underline"
        >
          ← Torna alla Redazione
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="no-print mb-6 flex items-center justify-between gap-3">
        <Link
          href="/redazione"
          className="font-sans text-sm text-stone-500 transition hover:text-accento"
        >
          ← Redazione
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs text-stone-400">
            {entry.result.meta.fonte === "simulata"
              ? "anteprima simulata · analizzata in questa sessione"
              : "analisi dal vivo · questa sessione"}
          </span>
          <PrintButton />
        </div>
      </div>
      <SchedaView result={entry.result} />
      <EditorFeedback schedaKey={entry.key} />
    </div>
  );
}
