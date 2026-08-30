"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AnalysisResult } from "@/lib/schema";
import type { Profilo } from "@/config/publishers";
import { analyzeHeuristic } from "@/lib/heuristic";
import { getRedazione } from "@/lib/redazione";
import SchedaView from "./SchedaView";
import PrintButton from "./PrintButton";
import EditorFeedback from "./EditorFeedback";

export interface SchedaDemoPublisher {
  id: string;
  nome: string;
  collane: { nome: string; profilo: Profilo }[];
}

/**
 * Scheda di un manoscritto in coda, resa nel contesto della redazione attiva:
 * il fit riguarda le collane della casa in cui si è entrati.
 */
export default function SchedaDemo({
  id,
  titolo,
  autore,
  provenienza,
  arrivato,
  text,
  cache,
  publishers,
}: {
  id: string;
  titolo: string;
  autore: string;
  provenienza: string;
  arrivato: string;
  text: string;
  cache?: { generata_il: string; modello: string; result: AnalysisResult };
  publishers: SchedaDemoPublisher[];
}) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [etichetta, setEtichetta] = useState("");

  useEffect(() => {
    const redId = getRedazione();
    const casa = publishers.find((p) => p.id === redId);

    // Scheda reale, se copre la redazione attiva (o se non c'è redazione).
    if (cache) {
      const fit = casa
        ? cache.result.scheda.fit_collane.filter((f) => f.editore === casa.nome)
        : cache.result.scheda.fit_collane;
      if (fit.length > 0) {
        setResult({
          ...cache.result,
          scheda: { ...cache.result.scheda, fit_collane: fit },
          meta: {
            ...cache.result.meta,
            cache: { generata_il: cache.generata_il, modello: cache.modello },
          },
        });
        setEtichetta(
          `scheda generata dal vivo il ${cache.generata_il} con ${cache.modello} · servita da cache`,
        );
        return;
      }
    }

    const target = casa
      ? [{ nome: casa.nome, collane: casa.collane }]
      : publishers.slice(0, 2).map((p) => ({ nome: p.nome, collane: p.collane }));
    setResult(analyzeHeuristic(text, { titolo, autore, publishers: target }));
    setEtichetta("stima offline etichettata · analisi reale disponibile dalla demo");
  }, [cache, text, titolo, autore, publishers]);

  if (!result) return null;

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
          <span className="font-sans text-xs text-stone-400">{etichetta}</span>
          <PrintButton />
        </div>
      </div>

      <p className="no-print mx-auto mb-3 max-w-scheda font-sans text-xs text-stone-500">
        Arrivato {arrivato} · {provenienza}
      </p>

      <SchedaView result={result} />
      <EditorFeedback schedaKey={`demo-${id}`} />
    </div>
  );
}
