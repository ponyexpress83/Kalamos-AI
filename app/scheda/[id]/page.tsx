import { notFound } from "next/navigation";
import SchedaDemo from "@/components/SchedaDemo";
import { manuscripts, getManuscriptMeta, getManuscriptText } from "@/lib/manuscripts";
import { getCachedSchede } from "@/lib/schede";
import { publishers } from "@/config/publishers";

/** Data di arrivo relativa a oggi: rigenerazione oraria della pagina statica. */
export const revalidate = 3600;

export function generateStaticParams() {
  return manuscripts.map((m) => ({ id: m.id }));
}

export default async function SchedaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meta = getManuscriptMeta(id);
  const text = getManuscriptText(id);
  if (!meta || !text) notFound();

  return (
    <SchedaDemo
      id={meta.id}
      titolo={meta.titolo}
      autore={meta.autore}
      provenienza={meta.provenienza}
      arrivato={meta.arrivato}
      text={text}
      schedePerCasa={getCachedSchede(meta.id)}
      publishers={publishers.map((p) => ({
        id: p.id,
        nome: p.nome,
        collane: p.collane.map((c) => ({ nome: c.nome, profilo: c.profilo })),
      }))}
    />
  );
}
