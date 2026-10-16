import { existsSync, readFileSync } from "fs";
import path from "path";
import type { AnalysisMeta, AnalysisResult, Raccomandazione } from "./schema";
import { publishers } from "@/config/publishers";
import { heuristicForDemo } from "./demo";

/**
 * Schede REALI dei manoscritti demo, pre-generate da scripts/generate-schede.mjs
 * con vera inferenza su Claude. Solo lato server (usa fs).
 *
 * Una scheda per coppia manoscritto-casa: `data/schede/<id>__<casa>.json`.
 * La raccomandazione dipende dalla casa (lo stesso testo può essere
 * prioritario da Einaudi e da scartare da Sperling), quindi non si possono
 * mescolare i fit di analisi diverse. Il vecchio formato `<id>.json`, una
 * scheda per più case, resta leggibile.
 */

export interface CachedScheda {
  generata_il: string;
  modello: string;
  result: AnalysisResult;
}

/** Quanto serve alla coda della redazione: niente sintesi né testo. */
export interface SchedaInCoda {
  generata_il: string;
  modello: string;
  raccomandazione: Raccomandazione;
  fit_collane: AnalysisResult["scheda"]["fit_collane"];
  meta: AnalysisMeta;
}

const DIR = path.join(process.cwd(), "data", "schede");

function leggi(file: string): CachedScheda | undefined {
  if (!existsSync(file)) return undefined;
  try {
    return JSON.parse(readFileSync(file, "utf-8")) as CachedScheda;
  } catch {
    return undefined; // file corrotto → euristica
  }
}

/** Percorsi solo da id noti, niente traversal. */
const sicuro = (s: string) => s.replace(/[^a-z0-9_-]/gi, "");

/**
 * Tutte le schede reali di un manoscritto, per id della casa editrice.
 * Restituisce solo le case per cui la scheda contiene davvero un fit su
 * quella casa.
 */
export function getCachedSchede(id: string): Record<string, CachedScheda> {
  const out: Record<string, CachedScheda> = {};
  const legacy = leggi(path.join(DIR, `${sicuro(id)}.json`));

  publishers.forEach((p) => {
    const perCasa = leggi(path.join(DIR, `${sicuro(id)}__${sicuro(p.id)}.json`));
    const fonte = perCasa ?? legacy;
    if (!fonte) return;
    const fit = fonte.result.scheda.fit_collane.filter((f) => f.editore === p.nome);
    if (fit.length === 0) return;
    out[p.id] = {
      ...fonte,
      result: { ...fonte.result, scheda: { ...fonte.result.scheda, fit_collane: fit } },
    };
  });
  return out;
}

/** Versione leggera per la coda: evita di mandare al browser nove schede intere. */
export function getSchedeInCoda(id: string): Record<string, SchedaInCoda> {
  const out: Record<string, SchedaInCoda> = {};
  Object.entries(getCachedSchede(id)).forEach(([casa, c]) => {
    out[casa] = {
      generata_il: c.generata_il,
      modello: c.modello,
      raccomandazione: c.result.scheda.raccomandazione,
      fit_collane: c.result.scheda.fit_collane,
      meta: c.result.meta,
    };
  });
  return out;
}

/** Scheda per una casa, con ripiego sull'euristica etichettata. */
export function getSchedaForDemo(id: string, publisherId?: string): AnalysisResult | undefined {
  const tutte = getCachedSchede(id);
  const cached = publisherId ? tutte[publisherId] : Object.values(tutte)[0];
  if (cached) {
    return {
      ...cached.result,
      meta: {
        ...cached.result.meta,
        cache: { generata_il: cached.generata_il, modello: cached.modello },
      },
    };
  }
  return heuristicForDemo(id, publisherId);
}
