import type { Raccomandazione } from "./schema";

/** Colori semaforo per la raccomandazione (verde/giallo/rosso). */
export const raccomandazioneStyle: Record<
  Raccomandazione,
  { badge: string; banner: string; dot: string; label: string }
> = {
  prioritario: {
    badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
    banner: "border-emerald-300 bg-emerald-50",
    dot: "bg-emerald-600",
    label: "Prioritario",
  },
  seconda_lettura: {
    badge: "bg-amber-100 text-amber-900 border-amber-300",
    banner: "border-amber-300 bg-amber-50",
    dot: "bg-amber-500",
    label: "Seconda lettura",
  },
  scarta: {
    badge: "bg-stone-200 text-stone-700 border-stone-300",
    banner: "border-stone-300 bg-stone-100",
    dot: "bg-stone-400",
    label: "Scarta",
  },
};

/** Score 0-1 → percentuale intera. */
export function pct(score: number): number {
  return Math.round(Math.max(0, Math.min(1, score)) * 100);
}

/** Colore della barra di fit in funzione del punteggio. */
export function fitColor(score: number): string {
  const p = pct(score);
  if (p >= 65) return "bg-emerald-600";
  if (p >= 45) return "bg-amber-500";
  return "bg-stone-400";
}

/** Voto prosa /10 → colore testo. */
export function prosaColor(voto: number): string {
  if (voto >= 7) return "text-emerald-700";
  if (voto >= 5) return "text-amber-700";
  return "text-stone-500";
}
