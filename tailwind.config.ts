import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette di brand Kalamos (allineata al logo)
        inchiostro: "#14213d", // blu inchiostro (K e wordmark)
        accento: "#cb5a3c", // corallo/terracotta (la "AI" e la piega del libro)
        carta: "#f7f3ec", // crema/carta (fondo del logo)
        "carta-scura": "#e9e1d3", // bordi / superfici sommesse
      },
      fontFamily: {
        // Heading serif (editoriale), corpo sans pulito
        serif: ["Spectral", "Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        scheda: "46rem",
      },
    },
  },
  plugins: [],
};

export default config;
