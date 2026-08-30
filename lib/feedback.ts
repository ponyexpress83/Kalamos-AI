/**
 * Feedback dell'editor sulle schede (localStorage): è il loop di calibrazione
 * mostrato nella demo — il giudizio umano che, nel prodotto reale, tara il fit
 * sul gusto della casa. Nessun dato lascia il browser.
 */

const KEY = "kalamos_feedback";

export type VerdettoEditor = "concordo" | "non_concordo";

export interface Feedback {
  verdetto: VerdettoEditor;
  nota?: string;
  ts: number;
}

type FeedbackMap = Record<string, Feedback>;

function loadAll(): FeedbackMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FeedbackMap) : {};
  } catch {
    return {};
  }
}

export function getFeedback(schedaKey: string): Feedback | undefined {
  return loadAll()[schedaKey];
}

export function saveFeedback(schedaKey: string, fb: Feedback): void {
  if (typeof window === "undefined") return;
  try {
    const all = loadAll();
    all[schedaKey] = fb;
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* quota piena: ignora */
  }
}

export function countFeedback(): number {
  return Object.keys(loadAll()).length;
}
