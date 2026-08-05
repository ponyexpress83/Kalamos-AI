import type { AnalysisResult } from "@/lib/schema";
import { raccomandazioneStyle, prosaColor } from "@/lib/format";
import RecommendationBadge from "./RecommendationBadge";
import ProposteCollana from "./ProposteCollana";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-carta-scura py-5">
      <h3 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-accento">
        {title}
      </h3>
      <div className="font-serif text-[17px] leading-relaxed text-inchiostro">
        {children}
      </div>
    </section>
  );
}

export default function SchedaView({ result }: { result: AnalysisResult }) {
  const { scheda, meta } = result;
  const banner = raccomandazioneStyle[scheda.raccomandazione].banner;

  const dettagli = [
    meta.autore,
    scheda.genere,
    meta.parole > 0 ? `${meta.parole.toLocaleString("it-IT")} parole` : null,
    meta.valutato_su_estratto ? "valutato su estratto" : null,
    meta.tempo_secondi ? `${meta.tempo_secondi}s` : null,
  ].filter(Boolean);

  return (
    <article className="mx-auto max-w-scheda">
      {/* Intestazione */}
      <header className="mb-5">
        <h1 className="font-serif text-3xl font-bold leading-tight text-inchiostro">
          {scheda.titolo_presunto}
        </h1>
        {dettagli.length > 0 && (
          <p className="mt-1.5 font-sans text-sm text-stone-500">
            {dettagli.join(" · ")}
          </p>
        )}
        <p className="mt-3 font-serif text-lg italic leading-snug text-inchiostro/80">
          {scheda.logline}
        </p>
      </header>

      {meta.fonte === "simulata" && (
        <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <div className="font-sans text-xs font-semibold uppercase tracking-wide text-amber-800">
            Anteprima simulata · offline
          </div>
          <p className="mt-1 font-sans text-[14px] leading-relaxed text-amber-900">
            Valutazione euristica basata sui segnali del testo (lunghezza,
            dialogo, cliché, lessico), <strong>non</strong> inferenza AI. Serve a
            provare il flusso su qualsiasi manoscritto. Per la scheda reale,
            disattiva la modalità offline e usa l'analisi dal vivo.
          </p>
        </div>
      )}

      {/* Banner raccomandazione */}
      <div className={`mb-5 flex items-center justify-between gap-3 rounded-xl border p-4 ${banner}`}>
        <div>
          <div className="font-sans text-xs uppercase tracking-wide text-stone-500">
            Raccomandazione
          </div>
          <div className="mt-0.5 font-serif text-xl font-bold text-inchiostro">
            {raccomandazioneStyle[scheda.raccomandazione].label}
          </div>
        </div>
        <RecommendationBadge value={scheda.raccomandazione} />
      </div>

      {/* Collana suggerita per editore — il differenziale */}
      <div className="mb-2 rounded-xl border border-carta-scura bg-white/50 p-5">
        <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-accento">
          Collana suggerita per editore
        </h3>
        <ProposteCollana fit={scheda.fit_collane} />
        <p className="mt-4 font-sans text-[13px] leading-relaxed text-stone-500">
          Scelta la casa editrice, Kalamos propone la collana più adatta tra
          quelle reali di quel catalogo: il fit misura il rapporto testo–collana,
          non una qualità astratta.
        </p>
      </div>

      <Section title="Sintesi">{scheda.sintesi}</Section>

      <Section title="Qualità della prosa">
        <div className="flex items-baseline gap-3">
          <span className={`font-serif text-3xl font-bold ${prosaColor(scheda.qualita_prosa.voto_su_10)}`}>
            {scheda.qualita_prosa.voto_su_10}
            <span className="text-lg text-stone-400">/10</span>
          </span>
        </div>
        <p className="mt-2">{scheda.qualita_prosa.note}</p>
      </Section>

      {scheda.passaggio_a_sostegno && (
        <Section title="Passaggio a sostegno">
          <blockquote className="border-l-2 border-accento/50 pl-4 italic text-inchiostro/85">
            «{scheda.passaggio_a_sostegno.replace(/^[«"“]|[»"”]$/g, "")}»
          </blockquote>
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-stone-500">
            {meta.controlli?.citazione_verificata === true
              ? "Citazione ritrovata nel testo caricato (controllo automatico): il giudizio è verificabile alla fonte."
              : meta.controlli?.citazione_verificata === false
                ? "Attenzione: il controllo automatico non ha ritrovato questa citazione nel testo caricato. Verificala prima di usarla."
                : "Il giudizio è ancorato al testo: l'editor può risalire al punto esatto invece di fidarsi."}
          </p>
        </Section>
      )}

      {meta.controlli && meta.controlli.collane_scartate.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <div className="font-sans text-xs font-semibold uppercase tracking-wide text-amber-800">
            Controllo catalogo
          </div>
          <p className="mt-1 font-sans text-[14px] leading-relaxed text-amber-900">
            {meta.controlli.collane_scartate.length} propost
            {meta.controlli.collane_scartate.length === 1 ? "a" : "e"} scartat
            {meta.controlli.collane_scartate.length === 1 ? "a" : "e"} perché la
            collana non esiste nel catalogo dell'editore:{" "}
            {meta.controlli.collane_scartate.join("; ")}. Il controllo è
            deterministico e avviene prima che la scheda arrivi all'editor.
          </p>
        </div>
      )}

      <Section title="Genere e temi">
        <p className="mb-3">{scheda.genere}</p>
        <div className="flex flex-wrap gap-2">
          {scheda.temi.map((t, i) => (
            <span
              key={i}
              className="rounded-full bg-carta-scura px-3 py-1 font-sans text-[13px] text-stone-700"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Target di lettore">{scheda.target_lettore}</Section>

      <Section title="Comparable">
        <ul className="space-y-3">
          {scheda.comparable_titles.map((c, i) => (
            <li key={i}>
              <span className="font-semibold">{c.titolo}</span>
              {c.autore && c.autore !== "—" && (
                <span className="text-stone-500"> — {c.autore}</span>
              )}
              <span className="block font-sans text-[14px] text-stone-600">
                {c.perche}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Punti di forza e criticità">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-1 font-sans text-xs font-semibold text-emerald-700">
              Punti di forza
            </div>
            <ul className="list-disc space-y-1 pl-5">
              {scheda.punti_di_forza.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-1 font-sans text-xs font-semibold text-stone-500">
              Criticità
            </div>
            <ul className="list-disc space-y-1 pl-5">
              {scheda.criticita.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Razionale della raccomandazione">
        {scheda.razionale_raccomandazione}
      </Section>

      {/* Nota metodologica / footer */}
      <div className="mt-4 rounded-xl border-l-4 border-accento bg-carta-scura/40 p-4">
        <div className="mb-1 font-sans text-xs font-semibold uppercase tracking-wide text-accento">
          Nota metodologica
        </div>
        <p className="font-serif text-[15px] leading-relaxed text-inchiostro">
          {scheda.nota_metodologica}
        </p>
        <p className="mt-2 font-sans text-[13px] leading-relaxed text-stone-500">
          Supporto alla decisione: l'editor mantiene l'ultima parola. Il
          manoscritto è trattato come IP riservato — inviato cifrato al solo
          motore di analisi, mai usato per addestrare modelli, non archiviato
          dalla demo. Dettagli in{" "}
          <a href="/riservatezza" className="underline hover:text-accento">
            Riservatezza e dati
          </a>
          ; nel PoC il deployment avviene nel perimetro concordato.
        </p>
      </div>
    </article>
  );
}
