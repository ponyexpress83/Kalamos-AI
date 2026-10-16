"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print rounded-md border border-carta-scura px-3 py-1.5 font-sans text-sm text-inchiostro transition hover:bg-carta-scura"
    >
      Esporta PDF
    </button>
  );
}
