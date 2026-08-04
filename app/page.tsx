import Link from "next/link";
import Logo from "@/components/Logo";

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-carta-scura bg-white/50 p-5">
      <h3 className="mb-1.5 font-serif text-lg font-semibold text-inchiostro">{title}</h3>
      <p className="font-sans text-sm leading-relaxed text-stone-600">{children}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col items-center border-b border-carta-scura pb-14 pt-6 text-center">
        <Logo height={72} className="mb-8" />

        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accento">
          Editorial Intelligence Engine
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight text-inchiostro sm:text-5xl">
          Scegli la casa editrice.
          <br />
          Kalamos propone la collana giusta.
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-inchiostro/75">
          Kalamos legge un manoscritto e ne restituisce una scheda di lettura
          strutturata — sintesi, prosa, comparabili — e, in base al catalogo
          reale dell'editore, suggerisce automaticamente la collana più adatta.
          Non scrive il libro: lo valuta. L'editor decide.
        </p>
        <p className="mt-3 font-sans text-sm font-medium text-accento">
          Pensato per i flussi editoriali del Gruppo Mondadori — e per ogni editore.
        </p>
        <p className="mt-1.5 font-sans text-xs text-stone-500">
          Nato per l'editoria italiana, progettato per scalare sui mercati
          europei: i profili di collana sono configurabili in ogni lingua.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/demo"
            className="rounded-md bg-accento px-7 py-3 font-sans text-sm font-semibold text-white transition hover:bg-accento/90"
          >
            Prova la demo →
          </Link>
          <Link
            href="/redazione"
            className="rounded-md border border-carta-scura px-7 py-3 font-sans text-sm font-medium text-inchiostro transition hover:border-inchiostro/40"
          >
            Vista Redazione
          </Link>
        </div>
        <p className="mt-4 font-sans text-xs text-stone-400">
          Versione di test — nessuna registrazione, nessuna credenziale richiesta.
        </p>
      </section>

      {/* Cosa fa */}
      <section className="grid gap-4 py-12 sm:grid-cols-3">
        <Feature title="Scheda di lettura">
          Sintesi, voce e struttura, voto di prosa, target, comparabili, punti di
          forza e criticità — in pochi secondi, in parallelo all'editor.
        </Feature>
        <Feature title="Collana suggerita">
          Scelto l'editore, Kalamos indirizza il testo alla collana più adatta
          del suo catalogo reale: lo stesso testo va a collane diverse.
        </Feature>
        <Feature title="Triage 10×">
          La vista Redazione ordina i manoscritti per fit e raccomandazione:
          riduce il backlog di lettura senza sostituire il giudizio editoriale.
        </Feature>
      </section>

      <p className="border-t border-carta-scura pt-6 font-sans text-xs leading-relaxed text-stone-400">
        Supporto alla decisione, non sostituzione del giudizio editoriale. Il
        manoscritto è trattato come IP riservato: mai usato per addestrare
        modelli, non archiviato dalla demo —{" "}
        <Link href="/riservatezza" className="underline hover:text-accento">
          come trattiamo i dati
        </Link>
        .
      </p>
    </div>
  );
}
