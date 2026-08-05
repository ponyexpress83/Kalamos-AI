"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { AnalysisResult, AnalysisMeta } from "@/lib/schema";
import type { Ambito, Gruppo, Profilo } from "@/config/publishers";
import { analyzeHeuristic } from "@/lib/heuristic";
import { getRedazione, setRedazione, clearRedazione } from "@/lib/redazione";
import { loadSession } from "@/lib/session";
import { pct } from "@/lib/format";
import SelettoreRedazione, { type RedazioneOption } from "./SelettoreRedazione";
import BatchTable, { type BatchRow } from "./BatchTable";
import KpiRedazione from "./KpiRedazione";
import FeedbackCounter from "./FeedbackCounter";
import SessionRows from "./SessionRows";

export interface ScrivaniaPublisher {
  id: string;
  nome: string;
  ambito: Ambito;
  gruppo: Gruppo;
  collane: { nome: string; profilo: Profilo }[];
}

export interface ScrivaniaManoscritto {
  id: string;
  titolo: string;
  autore: string;
  genere: string;
  parole: number;
  provenienza: string;
  arrivato: string;
  text: string;
  /** Scheda reale pre-generata, se disponibile. */
  cache?: { generata_il: string; modello: string; result: AnalysisResult };
}

/**
 * La scrivania dell'editor: è la schermata principale dell'app.
 * Si entra scegliendo la redazione, poi si vede la coda dei manoscritti in
 * arrivo con la collana suggerita del catalogo di quella casa.
 */
export default function Scrivania({
  manoscritti,
  publishers,
}: {
  manoscritti: ScrivaniaManoscritto[];
  publishers: ScrivaniaPublisher[];
}) {
  const [redazioneId, setRedazioneId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    // ?casa=<id> apre direttamente una redazione (link condivisibile per demo).
    const param = new URLSearchParams(window.location.search).get("casa");
    if (param) {
      setRedazione(param);
      setRedazioneId(param);
      return;
    }
    setRedazioneId(getRedazione());
  }, []);

  const pubById = useMemo(() => {
    const m: Record<string, ScrivaniaPublisher> = {};
    publishers.forEach((p) => (m[p.id] = p));
    return m;
  }, [publishers]);

  const casa = redazioneId ? pubById[redazioneId] : undefined;

  // Schede dei manoscritti in coda, calcolate nel contesto della redazione.
  const { rows, metas } = useMemo(() => {
    if (!casa) return { rows: [] as BatchRow[], metas: [] as AnalysisMeta[] };
    const target = [
      { nome: casa.nome, collane: casa.collane },
    ];
    const metasReali: AnalysisMeta[] = [];

    const rows = manoscritti.map((m) => {
      // Se esiste la scheda reale e copre questa casa, si usa quella.
      const cachedFit = m.cache?.result.scheda.fit_collane.filter(
        (f) => f.editore === casa.nome,
      );
      let result: AnalysisResult;
      if (m.cache && cachedFit && cachedFit.length > 0) {
        result = {
          ...m.cache.result,
          scheda: { ...m.cache.result.scheda, fit_collane: cachedFit },
        };
        metasReali.push(m.cache.result.meta);
      } else {
        result = analyzeHeuristic(m.text, {
          titolo: m.titolo,
          autore: m.autore,
          publishers: target,
        });
      }
      const best = [...result.scheda.fit_collane].sort((a, b) => b.score - a.score)[0];
      return {
        id: m.id,
        titolo: m.titolo,
        autore: `${m.autore} · ${m.provenienza} · ${m.arrivato}`,
        genere: m.genere,
        editore: best?.editore ?? casa.nome,
        collana: best?.collana ?? "—",
        fitPct: best ? pct(best.score) : 0,
        raccomandazione: result.scheda.raccomandazione,
      } satisfies BatchRow;
    });

    return { rows, metas: metasReali };
  }, [casa, manoscritti]);

  const [sessionCount, setSessionCount] = useState(0);
  useEffect(() => {
    setSessionCount(loadSession().length);
  }, [redazioneId]);

  // Primo render lato client: evita il lampeggio del selettore.
  if (redazioneId === undefined) return null;

  // Nessuna redazione scelta → schermata d'ingresso.
  if (!casa) {
    return (
      <SelettoreRedazione
        publishers={publishers.map((p) => ({
          id: p.id,
          nome: p.nome,
          ambito: p.ambito,
          gruppo: p.gruppo,
          collane: p.collane.length,
        })) as RedazioneOption[]}
        onScelta={(id) => setRedazioneId(id)}
      />
    );
  }

  const schedeReali = metas.length;

  return (
    <div>
      {/* Intestazione della redazione */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-carta-scura pb-5">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">
            Redazione · versione test
          </p>
          <h1 className="mt-1 flex flex-wrap items-center gap-2 font-serif text-3xl font-bold text-inchiostro">
            {casa.nome}
            {casa.gruppo === "Gruppo Mondadori" && (
              <span className="rounded-full border border-accento/40 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-accento">
                Gruppo Mondadori
              </span>
            )}
          </h1>
          <p className="mt-1.5 font-sans text-sm text-stone-600">
            {rows.length} manoscritti in arrivo · {casa.collane.length} collane
            del catalogo. Kalamos li ha già letti e propone la collana adatta.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="rounded-md bg-accento px-4 py-2 font-sans text-sm font-medium text-white transition hover:bg-accento/90"
          >
            + Aggiungi manoscritto
          </Link>
          <button
            onClick={() => {
              clearRedazione();
              setRedazioneId(null);
            }}
            className="font-sans text-xs text-stone-400 underline transition hover:text-accento"
          >
            cambia redazione
          </button>
        </div>
      </div>

      <KpiRedazione
        metasCache={metas}
        demoCount={rows.length}
        caseTotali={casa.collane.length}
        collaneTotali={casa.collane.length}
        labelCase="Collane del catalogo"
      />

      <p className="mb-8 rounded-lg border border-carta-scura bg-white/40 p-3 font-sans text-[13px] leading-relaxed text-stone-600">
        Riferimento di settore per una scheda di lettura professionale:{" "}
        <strong>€150–500 e 5–15 giorni</strong> — stima da validare sui dati
        reali dell'editore nella prima fase del PoC. Il confronto con i valori
        misurati qui sopra è il cuore del caso economico: Kalamos non sostituisce
        il giudizio, elimina l'attesa.
      </p>

      <FeedbackCounter />

      {sessionCount > 0 && <SessionRows />}

      <h2 className="mb-1 font-serif text-lg font-semibold text-inchiostro">
        Manoscritti in arrivo
      </h2>
      <p className="mb-3 font-sans text-xs text-stone-500">
        Coda dimostrativa: testi originali con provenienza simulata (email,
        portale proposte, agenzia). Ordina per fit o raccomandazione; clicca una
        riga per aprire la scheda.
      </p>
      <BatchTable rows={rows} />

      <p className="mt-4 font-sans text-xs text-stone-400">
        {schedeReali === rows.length && rows.length > 0
          ? "Schede generate dal vivo su Claude, servite da cache."
          : "I manoscritti in coda mostrano stime offline etichettate; l'analisi reale si genera aggiungendo un manoscritto."}
      </p>
    </div>
  );
}
