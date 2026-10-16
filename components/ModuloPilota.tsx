"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CANALI, VOLUMI } from "@/lib/pilota-opzioni";

const campo =
  "w-full rounded-lg border border-carta-scura bg-white/70 px-3 py-2.5 font-sans text-sm text-inchiostro outline-none transition focus:border-accento";

export default function ModuloPilota() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [casa, setCasa] = useState("");
  const [ruolo, setRuolo] = useState("");
  const [volume, setVolume] = useState<(typeof VOLUMI)[number]>("non lo so");
  const [canali, setCanali] = useState<string[]>([]);
  const [messaggio, setMessaggio] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [sito, setSito] = useState("");
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const [mailto, setMailto] = useState<string | null>(null);

  function toggleCanale(c: string) {
    setCanali((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  async function invia(e: FormEvent) {
    e.preventDefault();
    setErrore(null);
    setMailto(null);
    setInvio(true);
    try {
      const res = await fetch("/api/pilota", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ nome, email, casa, ruolo, volume, canali, messaggio, privacy, sito }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; mailto?: string | null };
      if (res.ok && data.ok) {
        // Pagina di conferma dedicata: è anche il passo finale misurabile del percorso.
        router.push("/pilota/grazie");
        return;
      }
      setErrore(data.error ?? "Invio non riuscito. Riprova fra qualche minuto.");
      setMailto(data.mailto ?? null);
    } catch {
      setErrore("Connessione non riuscita. Riprova fra qualche minuto.");
    } finally {
      setInvio(false);
    }
  }

  return (
    <form onSubmit={invia} className="space-y-5 rounded-2xl border border-carta-scura bg-white/50 p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 font-sans text-sm text-stone-700">
          Nome e cognome *
          <input required value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" className={campo} />
        </label>
        <label className="grid gap-1.5 font-sans text-sm text-stone-700">
          Email di lavoro *
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="nome@casaeditrice.it" className={campo} />
        </label>
        <label className="grid gap-1.5 font-sans text-sm text-stone-700">
          Casa editrice *
          <input required value={casa} onChange={(e) => setCasa(e.target.value)} autoComplete="organization" className={campo} />
        </label>
        <label className="grid gap-1.5 font-sans text-sm text-stone-700">
          Ruolo
          <input value={ruolo} onChange={(e) => setRuolo(e.target.value)} autoComplete="organization-title" placeholder="es. direttore editoriale, editor" className={campo} />
        </label>
      </div>

      <label className="grid gap-1.5 font-sans text-sm text-stone-700">
        Proposte che ricevete in un mese
        <select value={volume} onChange={(e) => setVolume(e.target.value as (typeof VOLUMI)[number])} className={campo}>
          {VOLUMI.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="mb-2 font-sans text-sm text-stone-700">Da dove arrivano</legend>
        <div className="flex flex-wrap gap-2">
          {CANALI.map((c) => (
            <label key={c} className={`cursor-pointer rounded-full border px-3 py-1.5 font-sans text-xs transition ${canali.includes(c) ? "border-inchiostro bg-inchiostro text-carta" : "border-carta-scura bg-white/60 text-stone-600 hover:border-inchiostro/40"}`}>
              <input type="checkbox" className="sr-only" checked={canali.includes(c)} onChange={() => toggleCanale(c)} />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-1.5 font-sans text-sm text-stone-700">
        Qualcosa che dovremmo sapere
        <textarea value={messaggio} onChange={(e) => setMessaggio(e.target.value)} rows={4} maxLength={2000} placeholder="Collane su cui vi interessa provarlo, tempi, dubbi sulla riservatezza…" className={campo} />
      </label>

      {/* Campo esca contro i bot: fuori schermo, escluso da tastiera e lettori. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Sito web
          <input tabIndex={-1} autoComplete="off" value={sito} onChange={(e) => setSito(e.target.value)} />
        </label>
      </div>

      <label className="flex items-start gap-2 font-sans text-sm text-stone-600">
        <input type="checkbox" required checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1 accent-accento" />
        <span>
          Ho letto l'<Link href="/privacy" className="underline hover:text-accento">informativa privacy</Link>. Useremo questi dati solo per rispondere alla richiesta. *
        </span>
      </label>

      {errore && (
        <div role="alert" className="rounded-lg border border-accento/30 bg-accento/5 p-3 font-sans text-sm text-accento">
          {errore}
          {mailto && (
            <a href={mailto} className="mt-2 block font-semibold underline">
              Apri la mail già compilata →
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={invio}
        className="rounded-md bg-accento px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-accento/90 disabled:cursor-wait disabled:opacity-60"
      >
        {invio ? "Invio…" : "Richiedi un pilota"}
      </button>
    </form>
  );
}
