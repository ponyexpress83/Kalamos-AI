import Analyzer from "@/components/Analyzer";
import { manuscripts } from "@/lib/manuscripts";
import { demoSchede } from "@/lib/cache";
import { imprints } from "@/config/imprints";

export default function HomePage() {
  const imprintChips = imprints.map((i) => ({
    id: i.id,
    nome: i.nome,
    reparto: i.reparto,
    profilo: i.profilo,
    defaultOn: Boolean(i.defaultOn),
  }));

  return (
    <div>
      <section className="mb-10 border-b border-carta-scura pb-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">
          Editorial Intelligence Engine
        </p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl font-bold leading-tight text-inchiostro">
          Una scheda di lettura in pochi secondi, in parallelo all'editor.
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-inchiostro/75">
          Kalamos legge un manoscritto e ne restituisce una valutazione
          strutturata — sintesi, prosa, comparabili — con un fit-score diverso
          per ogni collana. Non scrive il libro: lo valuta. L'editor decide.
        </p>
      </section>

      <Analyzer
        manuscripts={manuscripts}
        demoSchede={demoSchede}
        imprints={imprintChips}
      />
    </div>
  );
}
