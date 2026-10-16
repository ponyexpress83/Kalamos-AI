import type { AnalysisResult } from "./schema";

/**
 * Coda di sessione lato client (localStorage): i manoscritti analizzati in
 * questa sessione del browser, mostrati nella vista Redazione sopra i demo.
 * Nessun dato lascia il browser: è lo "slush pile dopo Kalamos" del visitatore.
 */

const KEY = "kalamos_batch";
const MAX = 20;

export interface SessionEntry {
  key: string;
  titolo: string;
  ts: number;
  result: AnalysisResult;
}

export function loadSession(): SessionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as SessionEntry[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveSessionEntry(titolo: string, result: AnalysisResult): SessionEntry | null {
  if (typeof window === "undefined") return null;
  const entry: SessionEntry = {
    key: `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    titolo,
    ts: Date.now(),
    result,
  };
  try {
    const arr = [entry, ...loadSession()].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(arr));
    return entry;
  } catch {
    return null; // quota piena: la demo continua senza persistenza
  }
}

export function getSessionEntry(key: string): SessionEntry | undefined {
  return loadSession().find((e) => e.key === key);
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
