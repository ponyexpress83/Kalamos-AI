import Link from "next/link";
import Logo from "@/components/Logo";

/**
 * Landing per chi la apre davvero: una redazione di una casa editrice
 * indipendente o media (CLAUDE.md §8). Nessun numero di efficacia: la
 * piattaforma non ne ha ancora misurati (§6). Quello che si può mostrare è il
 * meccanismo, e la redazione demo dove provarlo.
 */

const passi = [
  ["01", "Arriva una proposta", "Dalla casella proposte, da un'agenzia, da uno scout, dai diritti esteri. Oggi si incolla il testo o si carica un .txt o un PDF; il collegamento diretto alla casella è in sviluppo."],
  ["02", "Kalamos prepara la scheda", "Sintesi, voce, qualità della prosa, comparabili, punti di forza e criticità, e la collana più adatta tra quelle del vostro catalogo. Ogni giudizio porta una citazione dal testo."],
  ["03", "L'editor decide, Kalamos ricorda perché", "La decisione resta umana. Il motivo viene registrato: è ciò che, nel tempo, rende Kalamos la memoria della vostra redazione."],
] as const;

const controlli = [
  ["La collana esiste", "Ogni collana proposta viene confrontata con il catalogo reale della casa. Se il modello ne inventa una, la proposta viene scartata prima di arrivare all'editor."],
  ["La citazione è nel testo", "Il passaggio citato a sostegno del giudizio viene cercato nel manoscritto caricato. Se non c'è, la scheda lo dice."],
  ["La scheda ha sempre la stessa forma", "L'uscita del modello è vincolata a uno schema: niente campi mancanti, niente risposte libere al posto della scheda."],
] as const;

export default function LandingPage() {
  return (
    <div className="full-bleed -mt-10 -mb-10 overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#071426] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_22%,rgba(53,154,243,.25),transparent_28%),radial-gradient(circle_at_75%_75%,rgba(229,83,61,.16),transparent_30%)]" />
        <div className="paper-orbit paper-orbit-a" aria-hidden="true" />
        <div className="paper-orbit paper-orbit-b" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-28">
          <div>
            <div className="lg:hidden"><Logo height={38} variant="paper" /></div>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff755a] lg:mt-0">Per le redazioni delle case editrici</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Ogni proposta letta. <span className="text-[#ff755a]">Ogni decisione ricordata.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Kalamos legge i manoscritti che arrivano in redazione e prepara la scheda di lettura sulle collane del vostro catalogo, con una citazione dal testo a sostegno di ogni giudizio. L'editor decide; Kalamos ricorda perché.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/pilota" className="rounded-full bg-[#f05f43] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(240,95,67,.27)] transition hover:-translate-y-0.5 hover:bg-[#ff7055]">Richiedi un pilota →</Link>
              <Link href="/redazione" className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.1]">Prova la redazione demo</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/50">
              <span>Collane del vostro catalogo reale</span><span>Citazione verificata nel testo</span><span>Nessun addestramento sui vostri testi</span><span>L'ultima parola è dell'editor</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-12 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-[#0d203c]/82 p-5 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-3">
                <Logo height={31} variant="paper" />
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">Esempio di scheda</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#071426]/55 p-5">
                <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">Proposta arrivata via email · narrativa letteraria</div>
                <div className="mt-2 font-serif text-2xl font-semibold">Il giardino di vetro</div>
                <div className="mt-1 text-xs text-white/50">Marta Bevilacqua · testo dimostrativo originale</div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-white/40">Redazione Einaudi</div>
                  <div className="mt-2 text-sm font-semibold">Collana suggerita: Einaudi Stile Libero</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-white/40">Redazione Sperling & Kupfer</div>
                  <div className="mt-2 text-sm font-semibold text-white/75">Stesso testo, fit più basso</div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-[#68b9ff]/20 bg-[#68b9ff]/[0.06] p-5">
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#9fd2ff]">Passaggio a sostegno · ritrovato nel testo</div>
                <p className="mt-2 font-serif text-base italic leading-7 text-white/85">«Diceva che un barattolo è una promessa fatta al freddo, e che chi non sa conservare niente non sa nemmeno ricordare.»</p>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white/55">Decisione dell'editor: da registrare, con il suo perché.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accento">Come funziona</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] text-inchiostro sm:text-5xl">Dalla proposta alla decisione, senza perdere il perché.</h2>
          <div className="mt-12 grid overflow-hidden rounded-3xl border border-[#14213d]/10 bg-white/70 md:grid-cols-3">
            {passi.map(([n, t, d]) => (
              <div key={n} className="border-b border-[#14213d]/8 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="text-[10px] font-semibold tracking-[0.18em] text-[#3186c9]">{n}</div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-inchiostro">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1930] px-6 py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff755a]">Il vostro catalogo, non un genere</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Lo stesso testo. <span className="text-[#ff755a]">Case diverse.</span></h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Un buon romanzo può essere prioritario per una casa e fuori linea per un'altra. Kalamos non giudica un testo in astratto: lo misura sulle collane nominate del vostro catalogo, e se il testo è buono ma la casa è sbagliata, lo dice.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm leading-7 text-white/70">
              Nella redazione demo trovate i cataloghi di nove case editrici e trentacinque collane, ricostruiti dalle fonti pubbliche. Entrate in una redazione, aprite la coda, poi cambiate casa: la stessa coda si riordina.
            </p>
            <p className="mt-3 text-xs leading-6 text-white/45">Nessuna di queste case è cliente di Kalamos né ha collaborato alla demo.</p>
            <Link href="/redazione" className="mt-6 inline-block rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.1]">Entra in una redazione →</Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accento">Tre controlli, scritti in codice</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] text-inchiostro sm:text-5xl">Non chiediamo di fidarvi del modello.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {controlli.map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-[#14213d]/10 bg-[#faf8f4] p-7">
                <h3 className="font-serif text-2xl font-semibold text-inchiostro">{t}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-500">
            I comparabili, invece, li propone il modello e nessun controllo automatico li verifica: la scheda lo dichiara. E i manoscritti restano vostri: non addestrano modelli e la demo non li archivia. <Link href="/riservatezza" className="underline hover:text-accento">Ecco dove vanno, esattamente.</Link>
          </p>
        </div>
      </section>

      <section className="bg-[#f7f3ec] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accento">In esplorazione</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-inchiostro">Dopo la scheda.</h2>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Nel workspace dimostrativo mostriamo dove può andare la memoria editoriale: le decisioni con la loro motivazione, il confronto fra ciò che si è negoziato e la bozza di contratto, le versioni del testo dopo la firma. Sono schermate con dati di esempio, non funzioni pronte per il vostro lavoro. <Link href="/login" className="underline hover:text-accento">Esplora il workspace dimostrativo.</Link>
          </p>
        </div>
      </section>

      <section className="bg-[#071426] px-6 py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_90%_20%,rgba(53,154,243,.16),transparent_35%)] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff755a]">Pilota</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Provatelo sui manoscritti che vi arrivano davvero.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Configuriamo noi le vostre collane. Alla fine misuriamo insieme quante volte il giudizio di Kalamos coincide con quello della redazione, e dove no.</p>
          </div>
          <Link href="/pilota" className="shrink-0 rounded-full bg-[#f05f43] px-6 py-3.5 text-sm font-semibold text-white">Richiedi un pilota →</Link>
        </div>
      </section>
    </div>
  );
}
