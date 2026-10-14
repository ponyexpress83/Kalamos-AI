import MemoriaClient from "@/components/MemoriaClient";
import { demoMemory, demoOpportunities } from "@/lib/demo-workspace";
import { WorkspacePage } from "@/components/WorkspaceShell";

export const metadata = { title: "Editorial Memory — Kalamos AI" };

export default function MemoryPage() {
  return (
    <WorkspacePage eyebrow="Institutional editorial memory" title="Non solo cosa avete deciso. Perché." description="La differenza rispetto a un modello generico nasce quando la redazione registra motivazioni verificabili: consenso, disaccordo e ragione della decisione restano interrogabili nel tempo.">
      <MemoriaClient
        demo={demoMemory}
        opportunita={demoOpportunities.map((o) => ({ id: o.id, title: o.title, imprint: o.imprint }))}
      />
    </WorkspacePage>
  );
}
