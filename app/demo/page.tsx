import Analyzer, { type DemoManuscript } from "@/components/Analyzer";
import { manuscripts, getManuscriptText } from "@/lib/manuscripts";
import { publishers } from "@/config/publishers";

export const metadata = { title: "Demo — Kalamos·AI" };

export default function DemoPage() {
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
      <section className="mb-8 border-b border-carta-scura pb-6">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">
          Versione test · senza registrazione
        </p>
        <h1 className="mt-2 max-w-2xl font-serif text-3xl font-bold leading-tight text-inchiostro">
          Analizza un manoscritto
        </h1>
        <p className="mt-2 max-w-2xl font-serif text-base leading-relaxed text-inchiostro/75">
          Scegli un testo e la casa editrice: Kalamos restituisce la scheda di
          lettura e suggerisce la collana più adatta del suo catalogo reale.
        </p>
      </section>

      <Analyzer manuscripts={demoManuscripts} publishers={publisherOptions} />
    </div>
  );
}
