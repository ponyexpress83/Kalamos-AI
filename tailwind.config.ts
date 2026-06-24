import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette di brand Kalamos
        inchiostro: "#14213d", // blu inchiostro
        accento: "#b3001b", // rosso editoriale
        carta: "#fbfaf7", // bianco carta
        "carta-scura": "#ece7dd", // bordi / superfici sommesse
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
