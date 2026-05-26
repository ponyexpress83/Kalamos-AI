import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalamos AI — Editorial Intelligence Engine",
  description: "Prototipo dimostrativo: triage e valutazione manoscritti per editori.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
