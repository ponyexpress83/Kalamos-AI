import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-carta-scura bg-carta/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight text-inchiostro">
          Kalamos<span className="text-accento">·</span>AI
        </Link>
        <nav className="flex items-center gap-5 font-sans text-sm">
          <Link href="/" className="text-stone-600 transition hover:text-accento">
            Analizza
          </Link>
          <Link href="/redazione" className="text-stone-600 transition hover:text-accento">
            Redazione
          </Link>
        </nav>
      </div>
    </header>
  );
}
