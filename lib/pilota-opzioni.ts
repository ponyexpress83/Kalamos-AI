/**
 * Opzioni del modulo pilota, in un file senza zod: il modulo nel browser
 * importa solo queste, e la validazione resta sul server.
 */
export const VOLUMI = ["meno di 50", "50–200", "200–500", "oltre 500", "non lo so"] as const;

export const CANALI = [
  "email o portale proposte",
  "agenzie letterarie",
  "scout",
  "diritti esteri",
  "autori già in catalogo",
  "premi e concorsi",
] as const;

