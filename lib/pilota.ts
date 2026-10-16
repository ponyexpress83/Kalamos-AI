import { z } from "zod";
import { CANALI, VOLUMI } from "./pilota-opzioni";

export { CANALI, VOLUMI };

export const richiestaPilotaSchema = z.object({
  nome: z.string().trim().min(2, "Scrivi nome e cognome.").max(120),
  email: z.email("Serve un indirizzo email valido.").max(160),
  casa: z.string().trim().min(2, "Scrivi il nome della casa editrice.").max(160),
  ruolo: z.string().trim().max(120).optional().default(""),
  volume: z.enum(VOLUMI),
  canali: z.array(z.enum(CANALI)).max(CANALI.length).default([]),
  messaggio: z.string().trim().max(2000).optional().default(""),
  privacy: z.literal(true, { error: "Serve la presa visione dell'informativa." }),
  /** Campo esca: invisibile alle persone, i bot lo riempiono. */
  sito: z.string().max(0).optional().default(""),
});

export type RichiestaPilota = z.infer<typeof richiestaPilotaSchema>;

/** Testo della richiesta, uguale per la mail e per il ripiego mailto. */
export function testoRichiesta(r: Omit<RichiestaPilota, "privacy" | "sito">): string {
  return [
    `Nome: ${r.nome}`,
    `Email: ${r.email}`,
    `Casa editrice: ${r.casa}`,
    `Ruolo: ${r.ruolo || "—"}`,
    `Proposte al mese: ${r.volume}`,
    `Canali di arrivo: ${r.canali.length ? r.canali.join(", ") : "—"}`,
    "",
    r.messaggio || "(nessun messaggio)",
  ].join("\n");
}

export function mailtoRichiesta(
  destinatario: string,
  r: Omit<RichiestaPilota, "privacy" | "sito">,
): string {
  const oggetto = `Richiesta pilota Kalamos — ${r.casa}`;
  return `mailto:${destinatario}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(testoRichiesta(r))}`;
}
