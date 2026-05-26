import Link from "next/link";
import { notFound } from "next/navigation";
import { getScheda } from "@/lib/data";
import VerdictBadge from "@/components/VerdictBadge";
import FitScoreBar from "@/components/FitScoreBar";
import PrintButton from "@/components/PrintButton";

const bannerStyle: Record<string, string> = {
  "Acquisizione forte": "border-emerald-300 bg-emerald-50",
  Approfondisci: "border-amber-300 bg-amber-50",
  Rigetta: "border-stone-300 bg-stone-100",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-carta-scura py-5">
      <h3 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-ruggine">{title}</h3>
      <div className="font-serif text-[15px] leading-relaxed text-inchiostro">{children}</div>
    </section>
  );
}

export default function SchedaPage({ params }: { params: { id: string } }) {
  const m = getScheda(params.id);
  if (!m) notFound();

  if (m.stato === "In elaborazione") {
    return (
      <div>
        <Link href="/dashboard" className="font-sans text-sm text-stone-500 hover:text-ruggine">
          ← Coda manoscritti
        </Link>
        <p className="mt-8 font-serif text-lg text-stone-500">
          Questo manoscritto è ancora in elaborazione. La scheda sarà disponibile a breve.
        </p>
      </div>
    );
  }

  return (
    <article>
      <div className="no-print mb-6 flex items-center justify-between">
        <Link href="/dashboard" className="font-sans text-sm text-stone-500 hover:text-ruggine">
          ← Coda manoscritti
        </Link>
        <PrintButton />
      </div>

      <header className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-3xl font-bold leading-tight">{m.titolo}</h1>
          {m.esempio && (
            <span className="rounded bg-carta-scura px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-500">
              esempio · pubblico dominio
            </span>
          )}
        </div>
        <p className="mt-1 font-sans text-sm text-stone-500">
          {m.autore}
          {m.anno && ` (${m.anno})`} · {m.genere} · {(m.parole / 1000).toFixed(0)}k parole · valutato il{" "}
          {m.dataValutazione}
        </p>
      </header>

      <div className={`mb-6 rounded-xl border p-5 ${bannerStyle[m.verdettoTarget]}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-sans text-xs uppercase tracking-wide text-stone-500">
              Verdetto per {m.collanaTarget}
            </div>
            <div className="mt-1 font-serif text-2xl font-bold">{m.verdettoTarget}</div>
          </div>
          <div className="text-right font-sans text-xs text-stone-500">
            confidenza
            <div className="font-sans text-sm font-semibold text-inchiostro">{m.confidenza}</div>
          </div>
        </div>
      </div>

      <div className="mb-2 rounded-xl border border-carta-scura bg-white/40 p-5">
        <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wide text-ruggine">
          Fit-score per collana
        </h3>
        <div className="space-y-4">
          {m.fitScores.map((f) => (
            <div key={f.collana}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="font-sans text-sm font-medium text-inchiostro">
                  {f.collana}
                  {f.collana === m.collanaTarget && (
                    <span className="ml-2 text-[10px] uppercase tracking-wide text-ruggine">target</span>
                  )}
                </span>
                <VerdictBadge verdetto={f.verdetto} />
              </div>
              <FitScoreBar score={f.score} />
              <p className="mt-1 font-sans text-xs text-stone-500">{f.nota}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-sans text-xs text-stone-400">
          Lo stesso testo riceve score diversi a seconda della collana: il fit misura il rapporto
          testo–collana, non una qualità astratta.
        </p>
      </div>

      <Section title="Sintesi">{m.sintesi}</Section>
      <Section title="Voce e prosa">{m.voce}</Section>
      <Section title="Struttura e ritmo">{m.struttura}</Section>
      <Section title="Personaggi">{m.personaggi}</Section>
      <Section title="Temi e ambientazione">{m.temi}</Section>
      <Section title="Posizionamento di mercato">{m.mercato}</Section>

      <Section title="Comparabili">
        <ul className="list-disc space-y-1 pl-5">
          {m.comparabili.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section title="Punti di forza e debolezza">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-1 font-sans text-xs font-semibold text-emerald-700">Forza</div>
            <ul className="list-disc space-y-1 pl-5">
              {m.forza.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-1 font-sans text-xs font-semibold text-stone-500">Debolezza</div>
            <ul className="list-disc space-y-1 pl-5">
              {m.debolezza.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Raccomandazione operativa">{m.raccomandazione}</Section>

      <div className="mt-2 rounded-xl border-l-4 border-ruggine bg-carta-scura/40 p-4">
        <div className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-ruggine">
          Nota per l'editor
        </div>
        <p className="font-serif text-[15px] leading-relaxed">{m.note}</p>
      </div>
    </article>
  );
}
