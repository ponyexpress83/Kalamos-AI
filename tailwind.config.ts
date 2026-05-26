import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carta: "#FAF7F2",
        "carta-scura": "#EFE9DF",
        inchiostro: "#1A1A1A",
        ruggine: "#8B3A2A",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "'Segoe UI'", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
