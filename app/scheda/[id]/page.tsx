import { notFound } from "next/navigation";
import SchedaDemo from "@/components/SchedaDemo";
import { manuscripts, getManuscriptMeta, getManuscriptText } from "@/lib/manuscripts";
import { getCachedScheda } from "@/lib/schede";
import { publishers } from "@/config/publishers";

export function generateStaticParams() {
  return manuscripts.map((m) => ({ id: m.id }));
}

export default function SchedaPage({ params }: { params: { id: string } }) {
  const meta = getManuscriptMeta(params.id);
  const text = getManuscriptText(params.id);
  if (!meta || !text) notFound();

  return (
    <SchedaDemo
      id={meta.id}
      titolo={meta.titolo}
      autore={meta.autore}
      provenienza={meta.provenienza}
      arrivato={meta.arrivato}
      text={text}
      cache={getCachedScheda(meta.id)}
      publishers={publishers.map((p) => ({
        id: p.id,
        nome: p.nome,
        collane: p.collane.map((c) => ({ nome: c.nome, profilo: c.profilo })),
      }))}
    />
  );
}
