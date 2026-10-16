import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/sito";

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
  metadataBase: new URL(SITE_URL),
  title: "Kalamos AI — la scheda di lettura sul vostro catalogo",
  description:
    "Kalamos legge i manoscritti che arrivano in redazione e prepara la scheda sulle collane del vostro catalogo, con una citazione verificata nel testo. L'editor decide; Kalamos ricorda perché.",
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
        <div className="no-print"><Footer /></div>
        {/* Statistiche di visita senza cookie; vanno attivate nel progetto Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
