"use client";

import { useEffect, useState } from "react";
import { countFeedback } from "@/lib/feedback";

/** Contatore delle schede validate dall'editor (localStorage). */
export default function FeedbackCounter() {
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    setN(countFeedback());
  }, []);

  if (n === null || n === 0) return null;

  return (
    <p className="mb-4 font-sans text-xs text-stone-500">
      Schede validate dall'editor in questo browser:{" "}
      <span className="font-semibold text-inchiostro">{n}</span> — ogni giudizio
      è un dato di calibrazione.
    </p>
  );
}
