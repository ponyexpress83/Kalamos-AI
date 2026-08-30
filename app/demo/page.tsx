import Analyzer, { type DemoManuscript } from "@/components/Analyzer";
import { manuscripts, getManuscriptText } from "@/lib/manuscripts";
import { publishers } from "@/config/publishers";

export const metadata = { title: "Aggiungi manoscritto — Kalamos·AI" };

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
    gruppo: p.gruppo,
    defaultOn: Boolean(p.defaultOn),
    collane: p.collane.map((c) => ({ nome: c.nome, profilo: c.profilo })),
  }));

  return (
    <div>
      <section className="mb-8 border-b border-carta-scura pb-6">
        <a
          href="/redazione"
          className="font-sans text-sm text-stone-500 transition hover:text-accento"
        >
          ← Redazione
        </a>
        <h1 className="mt-3 max-w-2xl font-serif text-3xl font-bold leading-tight text-inchiostro">
          Aggiungi un manoscritto alla coda
        </h1>
        <p className="mt-2 max-w-2xl font-serif text-base leading-relaxed text-inchiostro/75">
          Un testo arrivato per email, dal portale proposte o da un'agenzia:
          Kalamos lo legge e restituisce la scheda con la collana suggerita.
          Puoi caricarne fino a 5 insieme.
        </p>
      </section>

      <Analyzer manuscripts={demoManuscripts} publishers={publisherOptions} />
    </div>
  );
}
