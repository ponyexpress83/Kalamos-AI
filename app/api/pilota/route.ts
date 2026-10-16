import { NextResponse } from "next/server";
import { azienda } from "@/config/azienda";
import { chiaveChiamante, consumaQuota } from "@/lib/rate-limit";
import { mailtoRichiesta, richiestaPilotaSchema, testoRichiesta } from "@/lib/pilota";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Richiesta di pilota dalla pagina /pilota.
 *
 * Nessun database: la richiesta diventa una mail al fondatore, inviata con
 * l'API di Resend (una chiamata HTTP, nessuna dipendenza in più). Se l'invio
 * non è configurato o fallisce, la risposta porta un link mailto già
 * compilato, così la richiesta non si perde: la persona la manda dalla sua
 * casella con un clic.
 *
 * Variabili: RESEND_API_KEY, KALAMOS_LEADS_TO (destinatario; altrimenti
 * l'emailContatto di config/azienda.ts), KALAMOS_MAIL_FROM (mittente; il
 * mittente di prova di Resend consegna solo all'indirizzo dell'account).
 */

const FINESTRE_PILOTA = [
  { durataMs: 10 * 60_000, massimo: 3 },
  { durataMs: 24 * 60 * 60_000, massimo: 10 },
];

export async function POST(req: Request) {
  const quota = consumaQuota(`pilota:${chiaveChiamante(req)}`, FINESTRE_PILOTA);
  if (!quota.ammessa) {
    return NextResponse.json(
      { error: "Abbiamo già ricevuto alcune richieste da questa rete. Riprova più tardi o scrivici direttamente." },
      { status: 429, headers: { "retry-after": String(quota.riprovaFraSecondi ?? 600) } },
    );
  }

  let corpo: unknown;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  // Campo esca compilato: si risponde come a un invio riuscito, senza inviare.
  if (corpo && typeof corpo === "object" && "sito" in corpo && (corpo as { sito?: string }).sito) {
    return NextResponse.json({ ok: true });
  }

  const esito = richiestaPilotaSchema.safeParse(corpo);
  if (!esito.success) {
    const primo = esito.error.issues[0];
    return NextResponse.json({ error: primo?.message ?? "Controlla i campi del modulo." }, { status: 400 });
  }
  const r = esito.data;

  const destinatario = process.env.KALAMOS_LEADS_TO || azienda.emailContatto;
  const chiave = process.env.RESEND_API_KEY;
  const mailto = azienda.emailContatto ? mailtoRichiesta(azienda.emailContatto, r) : null;

  if (!chiave || !destinatario) {
    return NextResponse.json(
      {
        error: mailto
          ? "Il modulo non può inviare in questo momento. Puoi mandare la richiesta dalla tua casella: è già compilata."
          : "Il modulo non può inviare in questo momento.",
        mailto,
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${chiave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.KALAMOS_MAIL_FROM || "Kalamos <onboarding@resend.dev>",
        to: [destinatario],
        reply_to: r.email,
        subject: `Richiesta pilota — ${r.casa}`,
        text: testoRichiesta(r),
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
  } catch (err) {
    // La richiesta resta nei log della funzione, per recuperarla a mano.
    console.error("[pilota] invio non riuscito", err instanceof Error ? err.message : err, JSON.stringify(r));
    return NextResponse.json(
      {
        error: mailto
          ? "L'invio non è riuscito. Puoi mandare la richiesta dalla tua casella: è già compilata."
          : "L'invio non è riuscito. Riprova fra qualche minuto.",
        mailto,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
