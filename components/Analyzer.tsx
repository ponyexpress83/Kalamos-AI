"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AnalysisResult } from "@/lib/schema";
import type { ManuscriptMeta } from "@/lib/manuscripts";
import SchedaView from "./SchedaView";
import LoadingSteps from "./LoadingSteps";
import ImprintChips, { type ImprintChip } from "./ImprintChips";
import PrintButton from "./PrintButton";

type View = "input" | "loading" | "result";

interface UploadedFile {
  name: string;
  kind: "txt" | "pdf";
  text?: string;
  pdfBase64?: string;
}

const MIN_LOADING_MS = 3200;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function abToBase64(buf: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunk)),
    );
  }
  return btoa(binary);
}

export default function Analyzer({
  manuscripts,
  demoSchede,
  imprints,
}: {
  manuscripts: ManuscriptMeta[];
  demoSchede: Record<string, AnalysisResult>;
  imprints: ImprintChip[];
}) {
  const [view, setView] = useState<View>("input");
  const [demoId, setDemoId] = useState<string | null>(null);
  const [pasted, setPasted] = useState("");
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [selected, setSelected] = useState<string[]>(imprints.map((i) => i.id));
  const [live, setLive] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const nameById = useMemo(() => {
    const m: Record<string, string> = {};
    imprints.forEach((i) => (m[i.id] = i.nome));
    return m;
  }, [imprints]);

  const hasSource =
    demoId !== null || pasted.trim().length > 0 || file !== null;
  const canAnalyze = hasSource && selected.length > 0;

  function toggleImprint(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function selectDemo(id: string) {
    setDemoId((prev) => (prev === id ? null : id));
    setPasted("");
    setFile(null);
    setError(null);
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null);
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > MAX_FILE_BYTES) {
      setFileError("File troppo grande (max 10 MB).");
      return;
    }
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    const isTxt = f.type.startsWith("text/") || f.name.toLowerCase().endsWith(".txt");
    try {
      if (isPdf) {
        const buf = await f.arrayBuffer();
        setFile({ name: f.name, kind: "pdf", pdfBase64: abToBase64(buf) });
      } else if (isTxt) {
        const text = await f.text();
        if (!text.trim()) {
          setFileError("Il file è vuoto.");
          return;
        }
        setFile({ name: f.name, kind: "txt", text });
      } else {
        setFileError("Formato non supportato: carica un .txt o un .pdf.");
        return;
      }
      setDemoId(null);
      setPasted("");
      setError(null);
    } catch {
      setFileError("Impossibile leggere il file.");
    }
  }

  function cachedFor(id: string): AnalysisResult | null {
    const base = demoSchede[id];
    if (!base) return null;
    const wantNames = selected.map((sid) => nameById[sid]);
    const fit = base.scheda.fit_collane.filter((f) =>
      wantNames.includes(f.collana),
    );
    return {
      scheda: { ...base.scheda, fit_collane: fit.length ? fit : base.scheda.fit_collane },
      meta: { ...base.meta, collane_richieste: wantNames },
    };
  }

  async function analyze() {
    if (!canAnalyze) return;
    setError(null);
    setView("loading");

    const work = (async (): Promise<AnalysisResult> => {
      // Demo + collane in cache + nessun "dal vivo" forzato → risposta istantanea
      if (demoId && !live) {
        const cached = cachedFor(demoId);
        if (cached) return cached;
      }

      const body: Record<string, unknown> = { imprintIds: selected };
      if (demoId) {
        body.manuscriptId = demoId;
      } else if (file?.kind === "pdf") {
        body.pdfBase64 = file.pdfBase64;
        body.fileName = file.name;
        body.titolo = file.name.replace(/\.[^.]+$/, "");
      } else if (file?.kind === "txt") {
        body.text = file.text;
        body.titolo = file.name.replace(/\.[^.]+$/, "");
      } else {
        body.text = pasted;
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Errore durante l'analisi.");
      }
      return data as AnalysisResult;
    })();

    try {
      const [r] = await Promise.all([work, delay(MIN_LOADING_MS)]);
      setResult(r);
      setView("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'analisi.");
      setView("input");
    }
  }

  function reset() {
    setResult(null);
    setView("input");
  }

  if (view === "loading") {
    return <LoadingSteps />;
  }

  if (view === "result" && result) {
    return (
      <div>
        <div className="no-print mb-6 flex items-center justify-between gap-3">
          <button
            onClick={reset}
            className="font-sans text-sm text-stone-500 transition hover:text-accento"
          >
            ← Nuova analisi
          </button>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-stone-400">
              {result.meta.fonte === "demo"
                ? "scheda dimostrativa in cache"
                : "analisi generata dal vivo"}
            </span>
            <PrintButton />
          </div>
        </div>
        <SchedaView result={result} />
      </div>
    );
  }

  // ── Vista input
  return (
    <div className="space-y-10">
      {/* 1. Manoscritti demo */}
      <section>
        <h2 className="mb-1 font-serif text-xl font-bold text-inchiostro">
          Scegli un manoscritto
        </h2>
        <p className="mb-4 font-sans text-sm text-stone-500">
          Quattro testi originali, precaricati per mostrare l'intera gamma di
          esiti.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {manuscripts.map((m) => {
            const on = demoId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => selectDemo(m.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  on
                    ? "border-inchiostro bg-white shadow-sm ring-1 ring-inchiostro"
                    : "border-carta-scura bg-white/50 hover:border-inchiostro/40"
                }`}
              >
                <div className="font-serif text-base font-semibold text-inchiostro">
                  {m.titolo}
                </div>
                <div className="mt-0.5 font-sans text-xs text-stone-500">
                  {m.autore} · {m.genere} · {m.parole} parole
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Incolla / carica */}
      <section className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-2 font-serif text-xl font-bold text-inchiostro">
            Oppure incolla un testo
          </h2>
          <textarea
            value={pasted}
            onChange={(e) => {
              setPasted(e.target.value);
              if (e.target.value) {
                setDemoId(null);
                setFile(null);
              }
            }}
            rows={6}
            placeholder="Incolla qui l'incipit o l'intero manoscritto…"
            className="w-full resize-y rounded-xl border border-carta-scura bg-white/60 p-3 font-serif text-sm leading-relaxed text-inchiostro outline-none focus:border-accento"
          />
        </div>
        <div>
          <h2 className="mb-2 font-serif text-xl font-bold text-inchiostro">
            Oppure carica un file
          </h2>
          <label className="flex h-[152px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-carta-scura bg-white/40 p-4 text-center transition hover:border-accento">
            <input
              type="file"
              accept=".txt,.pdf,text/plain,application/pdf"
              onChange={onFile}
              className="hidden"
            />
            {file ? (
              <span className="font-sans text-sm text-inchiostro">
                <span className="font-semibold">{file.name}</span>
                <span className="mt-1 block text-xs text-stone-500">
                  pronto · clicca per cambiare
                </span>
              </span>
            ) : (
              <span className="font-sans text-sm text-stone-500">
                Trascina o seleziona un file
                <span className="mt-1 block text-xs text-stone-400">
                  .txt o .pdf · max 10 MB
                </span>
              </span>
            )}
          </label>
          {fileError && (
            <p className="mt-2 font-sans text-xs text-accento">{fileError}</p>
          )}
        </div>
      </section>

      {/* 3. Collane */}
      <section>
        <h2 className="mb-1 font-serif text-xl font-bold text-inchiostro">
          Collane target
        </h2>
        <p className="mb-3 font-sans text-sm text-stone-500">
          Lo stesso testo riceve un fit-score diverso per ciascuna collana.
        </p>
        <ImprintChips
          imprints={imprints}
          selected={selected}
          onToggle={toggleImprint}
        />
      </section>

      {/* 4. Azione */}
      <section className="border-t border-carta-scura pt-6">
        {error && (
          <div className="mb-4 rounded-lg border border-accento/30 bg-accento/5 p-3 font-sans text-sm text-accento">
            {error}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={analyze}
            disabled={!canAnalyze}
            className="rounded-md bg-accento px-6 py-2.5 font-sans text-sm font-medium text-white transition hover:bg-accento/90 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Analizza
          </button>
          {demoId && (
            <label className="flex items-center gap-2 font-sans text-xs text-stone-500">
              <input
                type="checkbox"
                checked={live}
                onChange={(e) => setLive(e.target.checked)}
                className="accent-accento"
              />
              Ri-analizza dal vivo con l'API (anziché la scheda in cache)
            </label>
          )}
          {!canAnalyze && (
            <span className="font-sans text-xs text-stone-400">
              Scegli un testo e almeno una collana.
            </span>
          )}
        </div>
        <p className="mt-4 font-sans text-xs text-stone-400">
          <Link href="/redazione" className="underline hover:text-accento">
            Vista Redazione →
          </Link>{" "}
          tabella di tutti i manoscritti analizzati, ordinabile per fit e
          raccomandazione.
        </p>
      </section>
    </div>
  );
}
