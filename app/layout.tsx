import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

/**
 * Font servito dal nostro dominio: next/font lo scarica alla build. Prima il
 * foglio arrivava da fonts.googleapis.com a ogni visita, cioè l'IP di ogni
 * editore finiva a Google — stonato per un prodotto che vende riservatezza,
 * e una richiesta bloccante in più al primo caricamento.
 */
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-spectral",
});

export const metadata: Metadata = {
  title: "Kalamos AI — Editorial Intelligence Infrastructure",
  description:
    "Kalamos collega analisi dei manoscritti, contesto di catalogo, decisioni editoriali e memoria istituzionale in un workspace AI-native per editori.",
  openGraph: {
    title: "Kalamos AI",
    description:
      "Analisi dei manoscritti sul catalogo reale della casa editrice, con citazione verificata nel testo e memoria delle decisioni editoriali.",
    locale: "it_IT",
    type: "website",
    siteName: "Kalamos AI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={spectral.variable}>
      <body>
        <div className="no-print"><Header /></div>
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
