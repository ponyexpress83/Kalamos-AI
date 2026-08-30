/**
 * Listino pubblico API Anthropic (USD per milione di token), usato per
 * calcolare il COSTO MISURATO per scheda dai token effettivi.
 * Fonte: platform.claude.com/docs/en/pricing — rilevato ad agosto 2026.
 * Se il listino cambia, aggiornare qui.
 */
const PREZZI_USD_PER_MTOK: Record<string, { input: number; output: number }> = {
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-opus-4-8": { input: 5, output: 25 },
  "claude-opus-4-7": { input: 5, output: 25 },
  "claude-haiku-4-5": { input: 1, output: 5 },
};

/**
 * Prezzo del modello. Se il modello non è in listino si usa il più caro fra
 * quelli noti: una stima di spesa deve sbagliare per eccesso, non per difetto.
 */
export function prezzoModello(modello: string): { input: number; output: number } {
  const noto = PREZZI_USD_PER_MTOK[modello];
  if (noto) return noto;
  const tutti = Object.values(PREZZI_USD_PER_MTOK);
  return {
    input: Math.max(...tutti.map((p) => p.input)),
    output: Math.max(...tutti.map((p) => p.output)),
  };
}

export function costoSchedaUSD(
  modello: string | undefined,
  usage: { input_tokens: number; output_tokens: number } | undefined,
): number | null {
  if (!modello || !usage) return null;
  const p = PREZZI_USD_PER_MTOK[modello];
  if (!p) return null;
  return (
    (usage.input_tokens / 1_000_000) * p.input +
    (usage.output_tokens / 1_000_000) * p.output
  );
}
