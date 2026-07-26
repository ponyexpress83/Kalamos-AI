import { getManuscriptText, getManuscriptMeta } from "./manuscripts";
import { defaultPublisherIds, getPublisher, publishers } from "../config/publishers";
import { analyzeHeuristic, type HeuristicPublisher } from "./heuristic";
import type { AnalysisResult } from "./schema";

/**
 * Costruisce la scheda dei manoscritti demo con l'euristica offline (fonte
 * "simulata"), contro le case editrici di default. Usata dalle pagine server
 * (Redazione, scheda demo) per avere una tabella e schede senza chiave API e
 * senza dati inventati: sono stime automatiche, chiaramente etichettate.
 */

function defaultHeuristicPublishers(): HeuristicPublisher[] {
  const ids = defaultPublisherIds.length
    ? defaultPublisherIds
    : publishers.slice(0, 2).map((p) => p.id);
  return ids
    .map((id) => getPublisher(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      nome: p.nome,
      collane: p.collane.map((c) => ({ nome: c.nome, profilo: c.profilo })),
    }));
}

export function heuristicForDemo(id: string): AnalysisResult | undefined {
  const meta = getManuscriptMeta(id);
  const text = getManuscriptText(id);
  if (!meta || !text) return undefined;
  return analyzeHeuristic(text, {
    titolo: meta.titolo,
    autore: meta.autore,
    publishers: defaultHeuristicPublishers(),
  });
}
