import { existsSync, readFileSync } from "fs";
import path from "path";
import type { AnalysisResult } from "./schema";
import { heuristicForDemo } from "./demo";

/**
 * Schede dei manoscritti demo: prima scelta la scheda REALE pre-generata
 * (data/schede/<id>.json, prodotta da scripts/generate-schede.mjs con vera
 * inferenza su Claude), altrimenti la stima euristica etichettata.
 * Solo lato server (usa fs).
 */

export interface CachedScheda {
  generata_il: string;
  modello: string;
  result: AnalysisResult;
}

/** Legge la scheda reale pre-generata, se esiste. */
export function getCachedScheda(id: string): CachedScheda | undefined {
  // Percorso solo da id noti (validati a monte), niente traversal.
  const safe = id.replace(/[^a-z0-9_-]/gi, "");
  const file = path.join(process.cwd(), "data", "schede", `${safe}.json`);
  if (!existsSync(file)) return undefined;
  try {
    return JSON.parse(readFileSync(file, "utf-8")) as CachedScheda;
  } catch {
    return undefined; // file corrotto → euristica
  }
}

export function getSchedaForDemo(id: string): AnalysisResult | undefined {
  const cached = getCachedScheda(id);
  if (cached) {
    return {
      ...cached.result,
      meta: {
        ...cached.result.meta,
        cache: { generata_il: cached.generata_il, modello: cached.modello },
      },
    };
  }
  return heuristicForDemo(id);
}
