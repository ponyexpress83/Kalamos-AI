import Link from "next/link";

export const metadata = { title: "Riservatezza — Kalamos·AI" };

/**
 * Flusso dati REALE della demo, senza promesse indifendibili.
 * Riferimenti: Commercial Terms e privacy Anthropic (verificati ad agosto 2026)
 * — https://www.anthropic.com/legal/commercial-terms · https://privacy.anthropic.com
 */

function Punto({ titolo, children }: { titolo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-carta-scura py-5">
      <h2 className="mb-1.5 font-serif text-lg font-semibold text-inchiostro">{titolo}</h2>
      <p className="font-sans text-sm leading-relaxed text-stone-600">{children}</p>
    </section>
  );
}

export default function RiservatezzaPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">
        Riservatezza e dati
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-inchiostro">
        Dove va il manoscritto, esattamente.
      </h1>
      <p className="mt-3 mb-6 font-serif text-base leading-relaxed text-inchiostro/75">
        Per un editore il manoscritto è proprietà intellettuale riservata. Ecco
        il flusso dei dati di questa demo, senza giri di parole.
      </p>

      <Punto titolo="1. Cosa succede quando premi «Analizza»">
        Il testo viene inviato in forma cifrata (TLS) alla route server della
        demo e da lì all'API Anthropic (Claude), al solo scopo di produrre la
        scheda di lettura. Nessun altro destinatario.
      </Punto>

      <Punto titolo="2. Nessun addestramento sui vostri testi">
        Per i clienti commerciali dell'API, Anthropic non usa input e output
        per addestrare i propri modelli (Commercial Terms). Il manoscritto non
        entra in nessun dataset di training.
      </Punto>

      <Punto titolo="3. Conservazione limitata">
        L'API Anthropic conserva i dati per un periodo limitato secondo la
        retention policy commerciale, con possibilità di accordi
        zero-data-retention per i clienti enterprise. Kalamos, in questa demo,
        non salva il manoscritto lato server: nessun database, nessun log del
        testo.
      </Punto>

      <Punto titolo="4. Cosa resta nel tuo browser">
        La coda dei manoscritti analizzati in sessione e i giudizi dell'editor
        restano in localStorage, sul tuo dispositivo. Il pulsante «svuota»
        nella Redazione li elimina.
      </Punto>

      <Punto titolo="5. Nel PoC: deployment nel perimetro concordato">
        Per un progetto pilota con una casa editrice, l'architettura si adatta
        ai requisiti del cliente: ambiente dedicato, accordi di retention zero,
        log e audit condivisi. La riservatezza del manoscritto è un requisito
        di progetto, non una nota a margine.
      </Punto>

      <p className="mt-6 border-t border-carta-scura pt-5 font-sans text-xs leading-relaxed text-stone-400">
        Riferimenti: Commercial Terms of Service e Privacy Center di Anthropic
        (anthropic.com/legal · privacy.anthropic.com), verificati ad agosto
        2026. Questa pagina descrive la demo pubblica; i termini di un PoC si
        definiscono contrattualmente.
      </p>

      <p className="mt-6">
        <Link href="/demo" className="font-sans text-sm text-accento underline">
          ← Torna alla demo
        </Link>
      </p>
    </div>
  );
}
