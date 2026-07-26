import Link from "next/link";
import { notFound } from "next/navigation";
import SchedaView from "@/components/SchedaView";
import PrintButton from "@/components/PrintButton";
import { heuristicForDemo } from "@/lib/demo";
import { manuscripts } from "@/lib/manuscripts";

export function generateStaticParams() {
  return manuscripts.map((m) => ({ id: m.id }));
}

export default function SchedaPage({ params }: { params: { id: string } }) {
  const result = heuristicForDemo(params.id);
  if (!result) notFound();

  return (
    <div>
      <div className="no-print mb-6 flex items-center justify-between">
        <Link
          href="/redazione"
          className="font-sans text-sm text-stone-500 transition hover:text-accento"
        >
          ← Redazione
        </Link>
        <PrintButton />
      </div>
      <SchedaView result={result} />
    </div>
  );
}
