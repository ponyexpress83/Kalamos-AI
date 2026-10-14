#!/usr/bin/env node
/**
 * Controlla, prima del lancio, quello che il codice non può completare da
 * solo: i dati dell'impresa, le schede reali in cache. Le variabili d'ambiente
 * di Vercel non sono leggibili da qui: lo script le elenca da verificare.
 *
 *   npm run verifica-lancio
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let problemi = 0;
const ok = (m) => console.log(`  ✓ ${m}`);
const ko = (m) => { problemi++; console.log(`  ✗ ${m}`); };

console.log("\nDati dell'impresa (config/azienda.ts)");
const azienda = readFileSync(path.join(ROOT, "config", "azienda.ts"), "utf-8");
const corpo = azienda.slice(azienda.indexOf("} = {"));
for (const [campo, perche] of [
  ["ragioneSociale", "footer e titolare nell'informativa"],
  ["partitaIva", "obbligatoria sul sito dell'impresa"],
  ["sede", "footer e informativa"],
  ["emailContatto", "recapito pubblico e destinatario delle richieste"],
]) {
  const m = corpo.match(new RegExp(`${campo}:\\s*(null|"[^"]*")`));
  if (m && m[1] !== "null" && m[1] !== '""') ok(`${campo} = ${m[1]}`);
  else ko(`${campo} mancante — ${perche}`);
}

console.log("\nSchede reali in cache (data/schede)");
const manifest = JSON.parse(readFileSync(path.join(ROOT, "data", "manifest.json"), "utf-8"));
const catalogo = readFileSync(path.join(ROOT, "config", "publishers.ts"), "utf-8");
const case_ = [...catalogo.matchAll(/^ {4}id: "([^"]+)"/gm)].map((m) => m[1]);
const presenti = new Set(readdirSync(path.join(ROOT, "data", "schede")));
const attese = manifest.manuscripts.flatMap((m) => case_.map((c) => `${m.id}__${c}.json`));
const mancanti = attese.filter((f) => !presenti.has(f));
if (mancanti.length === 0) ok(`${attese.length} su ${attese.length}`);
else ko(`${attese.length - mancanti.length} su ${attese.length}: lancia «BASE_URL=https://kalamos-ai.vercel.app npm run schede»`);

console.log("\nDa verificare a mano su Vercel (Settings → Environment Variables)");
for (const v of [
  "ANTHROPIC_API_KEY — senza, l'analisi dal vivo ripiega sull'euristica",
  "RESEND_API_KEY e KALAMOS_LEADS_TO — senza, il modulo pilota propone solo la mail compilata",
  "NEXT_PUBLIC_SITE_URL — se il lancio usa un dominio diverso da kalamos-ai.vercel.app",
  "Web Analytics attivato nella scheda Analytics del progetto",
]) console.log(`  · ${v}`);

console.log(problemi ? `\n${problemi} punti da completare.\n` : "\nTutto pronto.\n");
process.exitCode = problemi ? 1 : 0;
