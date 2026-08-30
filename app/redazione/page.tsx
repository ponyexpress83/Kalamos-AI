import Scrivania, {
  type ScrivaniaManoscritto,
  type ScrivaniaPublisher,
} from "@/components/Scrivania";
import { manuscripts, getManuscriptText } from "@/lib/manuscripts";
import { getCachedScheda } from "@/lib/schede";
import { publishers } from "@/config/publishers";

export const metadata = { title: "Redazione — Kalamos·AI" };

/**
 * Scrivania dell'editor: schermata principale dell'app.
 * Il server fornisce testi e schede in cache; il client applica il contesto
 * della redazione scelta (localStorage) e costruisce la coda.
 */
export default function RedazionePage() {
  const manoscritti: ScrivaniaManoscritto[] = manuscripts.map((m) => ({
    id: m.id,
    titolo: m.titolo,
    autore: m.autore,
    genere: m.genere,
    parole: m.parole,
    provenienza: m.provenienza,
    arrivato: m.arrivato,
    text: getManuscriptText(m.id) ?? "",
    cache: getCachedScheda(m.id),
  }));

  const pubs: ScrivaniaPublisher[] = publishers.map((p) => ({
    id: p.id,
    nome: p.nome,
    ambito: p.ambito,
    gruppo: p.gruppo,
    collane: p.collane.map((c) => ({ nome: c.nome, profilo: c.profilo })),
  }));

  return <Scrivania manoscritti={manoscritti} publishers={pubs} />;
}
