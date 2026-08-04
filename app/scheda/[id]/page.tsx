import Link from "next/link";
import { notFound } from "next/navigation";
import SchedaView from "@/components/SchedaView";
import PrintButton from "@/components/PrintButton";
import { getSchedaForDemo } from "@/lib/schede";
import EditorFeedback from "@/components/EditorFeedback";
import { manuscripts } from "@/lib/manuscripts";

export function generateStaticParams() {
  return manuscripts.map((m) => ({ id: m.id }));
}

export default function SchedaPage({ params }: { params: { id: string } }) {
  const result = getSchedaForDemo(params.id);
  if (!result) notFound();

  return (
    <div>
      <div className="no-print mb-6 flex items-center justify-between gap-3">
        <Link
          href="/redazione"
          className="font-sans text-sm text-stone-500 transition hover:text-accento"
        >
          ← Redazione
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs text-stone-400">
            {result.meta.cache
              ? `scheda generata dal vivo il ${result.meta.cache.generata_il} con ${result.meta.cache.modello} · servita da cache`
              : "stima offline etichettata · analisi reale disponibile dalla demo"}
          </span>
          <PrintButton />
        </div>
      </div>
      <SchedaView result={result} />
      <EditorFeedback schedaKey={`demo-${params.id}`} />
    </div>
  );
}
