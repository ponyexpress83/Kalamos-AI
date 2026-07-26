"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AnalysisResult } from "@/lib/schema";
import { analyzeHeuristic } from "@/lib/heuristic";
import SchedaView from "./SchedaView";
import LoadingSteps from "./LoadingSteps";
import PublisherChips, { type PublisherOption } from "./PublisherChips";
import PrintButton from "./PrintButton";

export interface DemoManuscript {
  id: string;
  titolo: string;
  autore: string;
  genere: string;
  parole: number;
  text: string;
}

type View = "input" | "loading" | "result";

interface UploadedFile {
  name: string;
  kind: "txt" | "pdf";
  text?: string;
  pdfBase64?: string;
}

const MIN_LOADING_MS = 3200;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function abToBase64(buf: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

export default function Analyzer({
  manuscripts,
  publishers,
}: {
  manuscripts: DemoManuscript[];
  publishers: PublisherOption[];
}) {
  const [view, setView] = useState<View>("input");
  const [demoId, setDemoId] = useState<string | null>(null);
  const [pasted, setPasted] = useState("");
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [selected, setSelected] = useState<string[]>(() => {
    const on = publishers.filter((p) => p.defaultOn).map((p) => p.id);
    return on.length > 0 ? on : publishers.slice(0, 2).map((p) => p.id);
  });
  const [demoOffline, setDemoOffline] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resultNote, setResultNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const pubById = useMemo(() => {
    const m: Record<string, PublisherOption> = {};
    publishers.forEach((p) => (m[p.id] = p));
    return m;
  }, [publishers]);

  const manuscriptById = useMemo(() => {
    const m: Record<string, DemoManuscript> = {};
    manuscripts.forEach((x) => (m[x.id] = x));
    return m;
  }, [manuscripts]);

  const hasSource = demoId !== null || pasted.trim().length > 0 || file !== null;
  const canAnalyze = hasSource && selected.length > 0;

  function togglePublisher(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
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

  async function analyze() {
    if (!canAnalyze) return;
    setError(null);
    setView("loading");

    const demo = demoId ? manuscriptById[demoId] : undefined;
    const localText =
      demo?.text ??
      (file?.kind === "txt" ? file.text : !file && !demoId ? pasted : undefined);
    const localTitolo = demo
      ? demo.titolo
      : file?.kind === "txt"
        ? file.name.replace(/\.[^.]+$/, "")
        : "Testo incollato";
    const localAutore = demo?.autore;

    const selectedPublishers = selected.map((id) => ({
      nome: pubById[id].nome,
      collane: pubById[id].collane,
    }));

    function heuristic(): AnalysisResult {
      return analyzeHeuristic(localText as string, {
        titolo: localTitolo,
        autore: localAutore,
        publishers: selectedPublishers,
      });
    }

    // Motivo dell'eventuale ripiego offline (per dirlo all'utente).
    let fallbackNote: string | null = null;
    const troppiEditori = selected.length >= 3;

    const work = (async (): Promise<AnalysisResult> => {
      // Modalità offline scelta dall'utente: nessuna API.
      if (demoOffline) {
        if (localText && localText.trim()) return heuristic();
        throw new Error(
          "L'anteprima offline non è disponibile per i PDF. Usa testo/.txt/un demo, oppure disattiva la modalità offline.",
        );
      }

      const body: Record<string, unknown> = { publisherIds: selected };
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

      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 90_000);
      let res: Response;
      try {
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: ctrl.signal,
        });
      } catch {
        if (localText && localText.trim()) {
          fallbackNote = `Analisi dal vivo non riuscita (timeout).${
            troppiEditori ? " Hai selezionato più case editrici: riprova con 1-2 per volta." : ""
          } Sotto trovi un'anteprima offline.`;
          return heuristic();
        }
        throw new Error("L'analisi dal vivo non ha risposto in tempo. Riprova con meno case editrici o un manoscritto demo.");
      } finally {
        clearTimeout(timer);
      }

      let data: (AnalysisResult & { error?: string }) | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (!res.ok || !data) {
        if (localText && localText.trim()) {
          const cap =
            res.status === 503
              ? "Chiave API non configurata sul server."
              : res.status === 401
                ? "Chiave API non valida."
                : `Analisi dal vivo non riuscita (tempo limite del server${troppiEditori ? "; troppe case editrici selezionate" : ""}).`;
          fallbackNote = `${cap} Sotto trovi un'anteprima offline; per la scheda reale ${
            res.status === 503 || res.status === 401
              ? "configura la chiave su Vercel"
              : "riprova con 1-2 case editrici (o piano Vercel Pro)"
          }.`;
          return heuristic();
        }
        throw new Error(
          data?.error ||
            "L'analisi dal vivo ha superato il tempo limite del server. Riprova con meno case editrici o un manoscritto demo.",
        );
      }
      return data as AnalysisResult;
    })();

    try {
      const [r] = await Promise.all([work, delay(MIN_LOADING_MS)]);
      setResult(r);
      setResultNote(
        demoOffline
          ? "Modalità dimostrativa offline attiva: nessuna chiamata all'API."
          : fallbackNote,
      );
      setView("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'analisi.");
      setView("input");
    }
  }

  function reset() {
    setResult(null);
    setResultNote(null);
    setView("input");
  }

  if (view === "loading") return <LoadingSteps />;

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
              {result.meta.fonte === "simulata"
                ? resultNote && !demoOffline
                  ? "anteprima offline · dal vivo non riuscita"
                  : "anteprima simulata · offline"
                : "analisi generata dal vivo"}
            </span>
            <PrintButton />
          </div>
        </div>
        {resultNote && (
          <div className="no-print mb-5 rounded-xl border border-amber-300 bg-amber-50 p-3 font-sans text-sm text-amber-900">
            {resultNote}
          </div>
        )}
        <SchedaView result={result} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 1. Manoscritti demo */}
      <section>
        <h2 className="mb-1 font-serif text-xl font-bold text-inchiostro">
          Scegli un manoscritto
        </h2>
        <p className="mb-4 font-sans text-sm text-stone-500">
          Quattro testi originali precaricati, oppure incolla/carica il tuo.
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
            placeholder="Incolla qui l'incipit, una poesia o l'intero manoscritto…"
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
          {fileError && <p className="mt-2 font-sans text-xs text-accento">{fileError}</p>}
        </div>
      </section>

      {/* 3. Case editrici */}
      <section>
        <h2 className="mb-1 font-serif text-xl font-bold text-inchiostro">
          Scegli la casa editrice
        </h2>
        <p className="mb-3 font-sans text-sm text-stone-500">
          Il cliente è l'editore: Kalamos suggerisce in automatico la collana
          più adatta tra quelle reali del suo catalogo. Per l'analisi dal vivo
          bastano 1-2 case editrici — sceglierne molte la rende più lenta.
        </p>
        <PublisherChips
          publishers={publishers}
          selected={selected}
          onToggle={togglePublisher}
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
          {!canAnalyze && (
            <span className="font-sans text-xs text-stone-400">
              Scegli un testo e almeno una casa editrice.
            </span>
          )}
        </div>

        <label className="mt-4 flex items-start gap-2 font-sans text-xs text-stone-500">
          <input
            type="checkbox"
            checked={demoOffline}
            onChange={(e) => setDemoOffline(e.target.checked)}
            className="mt-0.5 accent-accento"
          />
          <span>
            <span className="font-medium text-inchiostro">
              Modalità dimostrativa offline
            </span>{" "}
            — anteprima istantanea senza API (euristica sui segnali del testo, non
            inferenza AI). Funziona su qualsiasi testo o .txt, anche senza chiave o
            connessione. Il risultato è etichettato come simulato.
          </span>
        </label>

        <p className="mt-4 font-sans text-xs text-stone-400">
          <Link href="/redazione" className="underline hover:text-accento">
            Vista Redazione →
          </Link>{" "}
          tabella dei manoscritti con la collana suggerita, ordinabile.
        </p>
      </section>
    </div>
  );
}
