"use client";

/**
 * Attesa dell'analisi. Prima scorreva una lista di passaggi a tempo
 * («Ricerca dei comparabili di mercato…») che non corrispondeva a ciò che
 * accade: una sola chiamata al modello, senza ricerche. Ora si dice il vero.
 */
export default function LoadingSteps({ progress }: { progress?: string }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center" role="status" aria-live="polite">
      <div className="mb-6 flex justify-center">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-carta-scura border-t-accento" />
      </div>
      {progress && <p className="mb-3 font-sans text-sm font-medium text-inchiostro">{progress}</p>}
      <p className="font-sans text-sm text-stone-600">
        Kalamos sta leggendo il testo e componendo la scheda sulle collane scelte.
      </p>
      <p className="mt-8 font-serif text-sm italic text-stone-500">
        Kalamos legge in parallelo all'editor, mai al suo posto.
      </p>
    </div>
  );
}
