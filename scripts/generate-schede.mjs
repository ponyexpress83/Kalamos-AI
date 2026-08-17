#!/usr/bin/env node
/**
 * Genera le schede REALI dei manoscritti demo chiamando /api/analyze
 * (inferenza vera su Claude) e le salva in data/schede/<id>.json.
 *
 * Uso:
 *   1. Avvia il server con la chiave:  ANTHROPIC_API_KEY=sk-... npm run dev
 *   2. In un altro terminale:          node scripts/generate-schede.mjs
 *
 * Variabili opzionali:
 *   BASE_URL  — default http://localhost:3000
 *
 * Le schede generate sono etichettate con data e modello e vengono servite
 * da /redazione e /scheda/[id] al posto della stima euristica.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "data", "schede");

const manifest = JSON.parse(
  readFileSync(path.join(ROOT, "data", "manifest.json"), "utf-8"),
);
const ids = manifest.manuscripts.map((m) => m.id);

mkdirSync(OUT_DIR, { recursive: true });

let ok = 0;
for (const id of ids) {
  process.stdout.write(`Analizzo ${id} … `);
  const t0 = Date.now();
  try {
    const res = await fetch(`${BASE_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        ...(process.env.KALAMOS_API_TOKEN ? { "x-kalamos-token": process.env.KALAMOS_API_TOKEN } : {}) },
      // publisherIds omesso → il server usa le case di default (Mondadori)
      body: JSON.stringify({ manuscriptId: id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    if (data?.meta?.fonte !== "live") {
      throw new Error(
        "la risposta è un'euristica (fonte non 'live'): il server non ha la ANTHROPIC_API_KEY?",
      );
    }
    const out = {
      generata_il: new Date().toISOString().slice(0, 10),
      modello: data.meta.modello || "n/d",
      result: data,
    };
    writeFileSync(
      path.join(OUT_DIR, `${id}.json`),
      JSON.stringify(out, null, 2),
    );
    ok++;
    console.log(`ok in ${Math.round((Date.now() - t0) / 1000)}s (${out.modello})`);
  } catch (err) {
    console.log(`ERRORE: ${err.message}`);
  }
}

console.log(`\n${ok}/${ids.length} schede salvate in data/schede/.`);
if (ok < ids.length) process.exitCode = 1;
