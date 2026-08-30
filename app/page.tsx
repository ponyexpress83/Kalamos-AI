import Link from "next/link";
import Logo from "@/components/Logo";

const modules = [
  ["01", "Intake", "Manoscritti e opportunità entrano da più fonti: agenzie, scout, foreign rights, team interno e unsolicited."],
  ["02", "Acquisition Intelligence", "Analisi, fit di catalogo, letture interne, completezza del dossier e prossimo passo restano nello stesso contesto."],
  ["03", "Editorial Memory", "Kalamos registra non soltanto cosa è stato deciso, ma la motivazione verificata dall'editor."],
  ["04", "Contract Intelligence", "Un working prototype confronta termini attesi e draft per evidenziare ciò che Legal/Rights deve verificare."],
  ["05", "Version Intelligence", "Dopo la firma, versioni e richieste editoriali conservano il razionale che ha portato all'acquisizione."],
] as const;

export default function LandingPage() {
  return (
    <div className="full-bleed -mt-10 overflow-hidden">
      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#071426] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_22%,rgba(53,154,243,.25),transparent_28%),radial-gradient(circle_at_75%_75%,rgba(229,83,61,.16),transparent_30%)]" />
        <div className="paper-orbit paper-orbit-a" aria-hidden="true" />
        <div className="paper-orbit paper-orbit-b" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-28">
          <div>
            <div className="lg:hidden"><Logo height={38} variant="paper" /></div>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff755a] lg:mt-0">Editorial intelligence infrastructure</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Dalla complessità editoriale alla <span className="text-[#ff755a]">chiarezza.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/64 sm:text-lg sm:leading-8">
              Kalamos collega manoscritti, catalogo, decisioni, contratti e versioni in un unico layer di intelligenza. L'AI organizza le evidenze. L'editor decide.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-full bg-[#f05f43] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(240,95,67,.27)] transition hover:-translate-y-0.5 hover:bg-[#ff7055]">Esplora il workspace →</Link>
              <Link href="/redazione" className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.1]">Apri la redazione classica</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/40">
              <span>Decision support</span><span>Human-in-the-loop</span><span>Source-grounded</span><span>Demo data dichiarati</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-12 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-[#0d203c]/82 p-5 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-7">
              <div className="mb-6 flex items-center justify-between"><Logo height={31} variant="paper" /><span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200">Workspace ready</span></div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[['Acquisition Desk','5 opportunità','2 deadline'],['Contract Review','1 alert','3 differenze'],['Editorial Project','V3','4 richieste']].map(([a,b,c]) => <div key={a} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-[10px] uppercase tracking-[0.12em] text-white/35">{a}</div><div className="mt-3 font-serif text-xl font-semibold">{b}</div><div className="mt-1 text-xs text-[#7fc6ff]">{c}</div></div>)}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#071426]/55 p-5">
                <div className="flex items-center justify-between"><div><div className="text-[10px] uppercase tracking-[0.14em] text-white/35">Requires attention</div><div className="mt-2 font-serif text-2xl font-semibold">Il giardino di vetro</div></div><div className="grid h-14 w-14 place-items-center rounded-full border-[5px] border-[#68b9ff]/65 font-serif text-lg font-semibold">82</div></div>
                <div className="mt-5 space-y-3 text-xs text-white/60"><div className="flex justify-between"><span>Fit editoriale</span><span className="text-white">Alto</span></div><div className="h-1.5 rounded-full bg-white/8"><div className="h-full w-[88%] rounded-full bg-[#68b9ff]" /></div><div className="flex justify-between"><span>Dossier acquisition</span><span className="text-white">82%</span></div><div className="h-1.5 rounded-full bg-white/8"><div className="h-full w-[82%] rounded-full bg-[#ff755a]" /></div></div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-xs text-white/40">Contract intelligence</div><div className="mt-2 text-sm font-semibold">Audiobook: review</div><div className="mt-1 text-xs text-red-200/75">Atteso escluso · draft incluso</div></div><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-xs text-white/40">Editorial memory</div><div className="mt-2 text-sm font-semibold">Perché seconda lettura?</div><div className="mt-1 text-xs text-white/50">“Voce più distintiva del primo scoring”</div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accento">One intelligence layer</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><h2 className="font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] text-inchiostro sm:text-5xl">Il libro cambia fase.<br />Il contesto non si perde.</h2><p className="max-w-2xl text-base leading-7 text-slate-600">Kalamos non vuole sostituire il gestionale dell'editore. Vuole stare sopra i workflow esistenti come sistema di intelligenza: collega fonti, decisioni e documenti, mantenendo sempre tracciabile ciò che viene dall'AI e ciò che viene dalle persone.</p></div>
          <div className="mt-12 grid overflow-hidden rounded-3xl border border-[#14213d]/10 bg-white/70 md:grid-cols-5">{modules.map(([n,title,text]) => <div key={n} className="border-b border-[#14213d]/8 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"><div className="text-[10px] font-semibold tracking-[0.18em] text-[#3186c9]">{n}</div><h3 className="mt-4 font-serif text-xl font-semibold text-inchiostro">{title}</h3><p className="mt-3 text-xs leading-5 text-slate-500">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-[#0a1930] px-6 py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff755a]">Editorial Memory</p><h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Non solo cosa avete deciso. <span className="text-[#ff755a]">Perché.</span></h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/55">Il valore non nasce da un modello che “impara” in modo opaco. Nasce da feedback verificato: prediction, decisione umana, motivazione, imprint, data e versione dell'analisi.</p></div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-3">{[['AI baseline','Seconda lettura','Fit alto, voce da verificare'],['Editor decision','Seconda lettura','Confermata'],['Why','Voce distintiva','Più forte del primo scoring']].map(([a,b,c]) => <div key={a} className="rounded-2xl border border-white/10 bg-[#071426]/55 p-5"><div className="text-[10px] uppercase tracking-[0.14em] text-white/35">{a}</div><div className="mt-3 font-serif text-xl font-semibold">{b}</div><div className="mt-2 text-xs leading-5 text-white/45">{c}</div></div>)}</div><div className="mt-5 rounded-2xl border border-[#68b9ff]/15 bg-[#68b9ff]/[0.06] px-5 py-4 text-sm leading-6 text-[#b9ddfa]">Kalamos può in futuro confrontare baseline e modello calibrato senza contaminare il benchmark. Nessun miglioramento viene dichiarato finché non è misurato.</div></div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:py-24"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">{[['Traceable AI','Citazioni, fonti e motivazioni restano visibili. Se un dato non c’è, Ask Kalamos deve dirlo.'],['Human control','L’AI suggerisce il prossimo passo. Non acquisisce libri, non chiude richieste editoriali e non approva contratti.'],['Safe demo path','Il workspace della presentazione ha dati pre-elaborati e fallback deterministici: non dipende da una singola chiamata live.']].map(([t,d]) => <div key={t} className="rounded-3xl border border-[#14213d]/10 bg-[#faf8f4] p-7"><div className="mb-8 h-10 w-10 rounded-2xl bg-inchiostro/5" /><h3 className="font-serif text-2xl font-semibold text-inchiostro">{t}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{d}</p></div>)}</div></section>

      <section className="bg-[#071426] px-6 py-16 text-white"><div className="mx-auto flex max-w-6xl flex-col gap-7 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_90%_20%,rgba(53,154,243,.16),transparent_35%)] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff755a]">Kalamos AI</p><h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Pronto per una demo editoriale end-to-end.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">Workspace dimostrativo, analisi reale già esistente, contract/version intelligence prototipali e guardrail espliciti.</p></div><Link href="/login" className="shrink-0 rounded-full bg-[#f05f43] px-6 py-3.5 text-sm font-semibold text-white">Entra nel workspace →</Link></div></section>
    </div>
  );
}
