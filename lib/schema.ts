import { z } from "zod";

/**
 * Schema della SCHEDA DI LETTURA prodotta dall'LLM.
 * È lo stesso schema iniettato nel prompt e validato lato server con zod.
 * Le motivazioni e i punteggi sono in italiano.
 */

export const comparableTitleSchema = z.object({
  titolo: z.string(),
  autore: z.string(),
  perche: z.string(),
});

export const fitCollanaSchema = z.object({
  editore: z.string(),
  collana: z.string(),
  score: z.number().min(0).max(1), // 0-1
  motivazione: z.string(),
});

export const raccomandazioneSchema = z.enum([
  "scarta",
  "seconda_lettura",
  "prioritario",
]);

export type Raccomandazione = z.infer<typeof raccomandazioneSchema>;

export const schedaSchema = z.object({
  titolo_presunto: z.string(),
  logline: z.string(), // 1 frase
  sintesi: z.string(), // 4-6 frasi: trama, struttura, voce
  genere: z.string(),
  temi: z.array(z.string()),
  qualita_prosa: z.object({
    voto_su_10: z.number().min(0).max(10),
    note: z.string(),
  }),
  target_lettore: z.string(),
  comparable_titles: z.array(comparableTitleSchema),
  punti_di_forza: z.array(z.string()),
  criticita: z.array(z.string()),
  fit_collane: z.array(fitCollanaSchema),
  raccomandazione: raccomandazioneSchema,
  razionale_raccomandazione: z.string(),
  nota_metodologica: z.string(),
});

export type Scheda = z.infer<typeof schedaSchema>;

/**
 * Metadati di contesto (NON prodotti dall'LLM): provengono dalla richiesta.
 */
export interface AnalysisMeta {
  titolo_input?: string;
  autore?: string;
  parole: number;
  valutato_su_estratto: boolean;
  parole_inviate: number;
  editori_richiesti: string[];
  tempo_secondi: number;
  fonte: "live" | "simulata"; // inferenza reale · euristica offline
}

export interface AnalysisResult {
  scheda: Scheda;
  meta: AnalysisMeta;
}

/** Etichette leggibili per la raccomandazione. */
export const raccomandazioneLabel: Record<Raccomandazione, string> = {
  prioritario: "Prioritario",
  seconda_lettura: "Seconda lettura",
  scarta: "Scarta",
};
