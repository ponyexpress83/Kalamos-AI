import Analyzer, { type DemoManuscript } from "@/components/Analyzer";
import { manuscripts, getManuscriptText } from "@/lib/manuscripts";
import { publishers } from "@/config/publishers";

export default function HomePage() {
  const demoManuscripts: DemoManuscript[] = manuscripts.map((m) => ({
    id: m.id,
    titolo: m.titolo,
    autore: m.autore,
    genere: m.genere,
    parole: m.parole,
    text: getManuscriptText(m.id) ?? "",
  }));

  const publisherOptions = publishers.map((p) => ({
    id: p.id,
    nome: p.nome,
    ambito: p.ambito,
    defaultOn: Boolean(p.defaultOn),
    collane: p.collane.map((c) => ({ nome: c.nome, profilo: c.profilo })),
  }));

  return (
    <div>
      <section className="mb-10 border-b border-carta-scura pb-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">
          Editorial Intelligence Engine
        </p>
        <h1 className="mt-2 max-w-2xl font-serif text-4xl font-bold leading-tight text-inchiostro">
          Scegli la casa editrice. Kalamos propone la collana giusta.
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-inchiostro/75">
          Kalamos legge un manoscritto e ne restituisce una scheda strutturata —
          sintesi, prosa, comparabili — e, in base al catalogo reale dell'editore
          scelto, suggerisce automaticamente la collana più adatta. Non scrive il
          libro: lo valuta. L'editor decide.
        </p>
      </section>

      <Analyzer manuscripts={demoManuscripts} publishers={publisherOptions} />
    </div>
  );
}
