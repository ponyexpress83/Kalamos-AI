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
  /**
   * Citazione LETTERALE dal manoscritto a sostegno del giudizio.
   * Un giudizio che l'editor non può verificare sul testo non vale nulla:
   * questo campo è ciò che rende la scheda controllabile in redazione.
   */
  passaggio_a_sostegno: z.string(),
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
 * Esito dei controlli DETERMINISTICI eseguiti a valle del modello.
 * Non chiedono nulla a un secondo modello: sono verifiche di codice.
 */
export interface Controlli {
  /** Ogni collana proposta esiste davvero nel catalogo richiesto. */
  collane_valide: boolean;
  /** Collane inventate dal modello e scartate prima di arrivare all'editor. */
  collane_scartate: string[];
  /** La citazione è presente nel testo inviato. null = non verificabile (PDF). */
  citazione_verificata: boolean | null;
}

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
  /** Modello usato per l'inferenza (solo fonte "live"). */
  modello?: string;
  /** Consumo token misurato dall'API (solo fonte "live"). */
  usage?: { input_tokens: number; output_tokens: number };
  /** Presente se la scheda è servita dalla cache pre-generata. */
  cache?: { generata_il: string; modello: string };
  /** Esito dei controlli deterministici a valle (solo fonte "live"). */
  controlli?: Controlli;
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
