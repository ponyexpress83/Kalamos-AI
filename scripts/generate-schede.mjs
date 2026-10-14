#!/usr/bin/env node
/**
 * Genera le schede REALI dei manoscritti demo, una per ogni casa editrice,
 * chiamando /api/analyze (inferenza vera su Claude), e le salva in
 * data/schede/<manoscritto>__<casa>.json.
 *
 * Il modo più semplice: contro il sito in produzione, che ha già la chiave.
 *
 *   BASE_URL=https://kalamos-ai.vercel.app npm run schede
 *
 * In locale serve il server avviato con la chiave:
 *
 *   ANTHROPIC_API_KEY=sk-... npm run dev      (primo terminale)
 *   npm run schede                            (secondo terminale)
 *
 * Variabili opzionali:
 *   BASE_URL          default http://localhost:3000
 *   KALAMOS_API_TOKEN se il deployment richiede il token condiviso
 *   SOLO_CASE         es. "einaudi,sellerio" per generarne solo alcune
 *   RIGENERA=1        rifà anche le schede già presenti (default: le salta)
 *
 * La route ammette 5 analisi al minuto e 40 all'ora per IP: lo script
 * distanzia le richieste e, se riceve 429, aspetta quanto indicato dal server.
 * 4 manoscritti × 9 case = 36 analisi, sotto il limite orario.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
// fileURLToPath invece di import.meta.dirname: funziona anche con Node 18.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "data", "schede");
const RIGENERA = process.env.RIGENERA === "1";
/** Distanza minima fra due richieste: 5 al minuto → una ogni 12 s, più margine. */
const DISTANZA_MS = 13_000;

/** Listino per il costo misurato (stessi valori di lib/pricing.ts, USD per milione di token). */
const PREZZI = {
  "claude-opus-4-8": { input: 5, output: 25 },
  "claude-opus-4-7": { input: 5, output: 25 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5": { input: 1, output: 5 },
};

const manifest = JSON.parse(readFileSync(path.join(ROOT, "data", "manifest.json"), "utf-8"));
const manoscritti = manifest.manuscripts.map((m) => m.id);

// Gli id delle case si leggono dal catalogo, senza duplicarli qui.
const catalogo = readFileSync(path.join(ROOT, "config", "publishers.ts"), "utf-8");
let case_ = [...catalogo.matchAll(/^ {4}id: "([^"]+)"/gm)].map((m) => m[1]);
if (process.env.SOLO_CASE) {
  const solo = process.env.SOLO_CASE.split(",").map((s) => s.trim());
  case_ = case_.filter((c) => solo.includes(c));
}

mkdirSync(OUT_DIR, { recursive: true });
const attendi = (ms) => new Promise((r) => setTimeout(r, ms));

const intestazioni = {
  "Content-Type": "application/json",
  // Se il deployment filtra per origine (KALAMOS_ALLOWED_ORIGIN), serve questa.
  Origin: BASE_URL,
  ...(process.env.KALAMOS_API_TOKEN ? { "x-kalamos-token": process.env.KALAMOS_API_TOKEN } : {}),
};

let ultima = 0;
let salvate = 0;
let saltate = 0;
const errori = [];
let costo = 0;

console.log(`Genero ${manoscritti.length} × ${case_.length} schede contro ${BASE_URL}\n`);

for (const id of manoscritti) {
  for (const casa of case_) {
    const file = path.join(OUT_DIR, `${id}__${casa}.json`);
    if (!RIGENERA && existsSync(file)) {
      saltate++;
      continue;
    }

    let tentativi = 0;
    while (tentativi < 4) {
      tentativi++;
      const attesa = DISTANZA_MS - (Date.now() - ultima);
      if (attesa > 0) await attendi(attesa);
      ultima = Date.now();

      process.stdout.write(`${id} · ${casa} … `);
      try {
        const res = await fetch(`${BASE_URL}/api/analyze`, {
          method: "POST",
          headers: intestazioni,
          body: JSON.stringify({ manuscriptId: id, publisherIds: [casa] }),
        });
        if (res.status === 429) {
          const secondi = Number(res.headers.get("retry-after") || "60");
          console.log(`limite di frequenza, riprovo fra ${secondi}s`);
          await attendi(secondi * 1000);
          continue;
        }
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
        if (data?.meta?.fonte !== "live") {
          // Errore di configurazione, non del singolo testo: inutile insistere.
          console.log("ERRORE: risposta euristica, non AI. Il server non ha la ANTHROPIC_API_KEY.");
          process.exit(1);
        }
        const out = {
          generata_il: new Date().toISOString().slice(0, 10),
          modello: data.meta.modello || "n/d",
          casa,
          result: data,
        };
        writeFileSync(file, JSON.stringify(out, null, 2));
        salvate++;
        const p = PREZZI[out.modello];
        const u = data.meta.usage;
        const c = p && u ? (u.input_tokens / 1e6) * p.input + (u.output_tokens / 1e6) * p.output : null;
        if (c !== null) costo += c;
        console.log(
          `ok in ${data.meta.tempo_secondi}s · ${data.scheda.raccomandazione}${c !== null ? ` · $${c.toFixed(3)}` : ""}`,
        );
        break;
      } catch (err) {
        console.log(`ERRORE: ${err.message}`);
        if (tentativi >= 2) {
          errori.push(`${id} · ${casa}: ${err.message}`);
          break;
        }
      }
    }
  }
}

console.log(`\n${salvate} schede salvate, ${saltate} già presenti, ${errori.length} errori.`);
if (salvate > 0) console.log(`Costo misurato dai token restituiti dall'API: $${costo.toFixed(2)}`);
if (errori.length) {
  console.log("\nDa rifare (rilancia lo stesso comando: salta quelle già fatte):");
  errori.forEach((e) => console.log(`  ${e}`));
  process.exitCode = 1;
} else {
  console.log("\nOra: git add data/schede && git commit -m \"dati: schede reali in cache\" && git push");
}
