import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-carta-scura bg-carta/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" aria-label="Kalamos AI — home">
          <Logo height={30} />
        </Link>
        <nav className="flex items-center gap-5 font-sans text-sm">
          <Link href="/redazione" className="text-stone-600 transition hover:text-accento">
            Redazione
          </Link>
          <Link href="/demo" className="text-stone-600 transition hover:text-accento">
            Aggiungi manoscritto
          </Link>
        </nav>
      </div>
    </header>
  );
}
