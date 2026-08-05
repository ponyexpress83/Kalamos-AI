"use client";

import { useState } from "react";
import type { Ambito, Gruppo } from "@/config/publishers";
import { setRedazione } from "@/lib/redazione";
import Logo from "./Logo";

export interface RedazioneOption {
  id: string;
  nome: string;
  ambito: Ambito;
  gruppo: Gruppo;
  collane: number;
}

const ORDER: Ambito[] = [
  "Narrativa",
  "Bambini e ragazzi",
  "Poesia",
  "Fantasy e fantascienza",
];

/**
 * Schermata d'ingresso: si sceglie la redazione in cui entrare.
 * Non è un login (nessuna credenziale, nessun account): è la scelta esplicita
 * del contesto editoriale della demo.
 */
export default function SelettoreRedazione({
  publishers,
  onScelta,
}: {
  publishers: RedazioneOption[];
  onScelta: (id: string) => void;
}) {
  const [scelto, setScelto] = useState<string | null>(null);

  function entra(id: string) {
    setScelto(id);
    setRedazione(id);
    onScelta(id);
  }

  const gruppi = ORDER.map((ambito) => ({
    ambito,
    voci: publishers.filter((p) => p.ambito === ambito),
  })).filter((g) => g.voci.length > 0);

  return (
    <div className="mx-auto max-w-2xl py-6">
      <div className="mb-8 text-center">
        <Logo height={56} className="mb-6" />
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">
          Versione test · senza registrazione
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-inchiostro">
          In quale redazione entri?
        </h1>
        <p className="mt-3 font-sans text-sm leading-relaxed text-stone-600">
          Kalamos lavora dentro la redazione di una casa editrice: la coda dei
          manoscritti e le collane suggerite sono quelle del suo catalogo reale.
          Scegli la redazione per iniziare — nessuna credenziale richiesta.
        </p>
      </div>

      <div className="space-y-5">
        {gruppi.map((g) => (
          <div key={g.ambito}>
            <div className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              {g.ambito}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {g.voci.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => entra(p.id)}
                  disabled={scelto !== null}
                  className={`rounded-xl border p-4 text-left transition disabled:opacity-60 ${
                    scelto === p.id
                      ? "border-inchiostro bg-inchiostro text-carta"
                      : "border-carta-scura bg-white/60 hover:border-inchiostro/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-serif text-base font-semibold ${
                        scelto === p.id ? "text-carta" : "text-inchiostro"
                      }`}
                    >
                      {p.nome}
                    </span>
                    {p.gruppo === "Gruppo Mondadori" && (
                      <span
                        className={`rounded-full border px-1.5 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-wide ${
                          scelto === p.id
                            ? "border-carta/40 text-carta/90"
                            : "border-accento/40 text-accento"
                        }`}
                      >
                        Mondadori
                      </span>
                    )}
                  </div>
                  <div
                    className={`mt-0.5 font-sans text-xs ${
                      scelto === p.id ? "text-carta/70" : "text-stone-500"
                    }`}
                  >
                    {p.collane} collane reali
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 font-sans text-xs leading-relaxed text-stone-400">
        Demo: la scelta resta in questo browser e definisce il contesto della
        sessione. Nel prodotto reale ogni redazione ha il proprio ambiente,
        i propri utenti e il proprio perimetro dati.
      </p>
    </div>
  );
}
