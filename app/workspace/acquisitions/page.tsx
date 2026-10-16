import AcquisitionsTable from "@/components/AcquisitionsTable";
import { demoOpportunities } from "@/lib/demo-workspace";
import { PrimaryLink, WorkspacePage } from "@/components/WorkspaceShell";

export const metadata = { title: "Acquisizioni — Kalamos AI" };

export default function AcquisitionsPage() {
  return (
    <WorkspacePage eyebrow="Acquisition intelligence" title="Ogni fonte, un solo contesto." description="Scout, agenzie, foreign rights, autori già conosciuti e unsolicited entrano nella stessa pipeline senza essere trattati come opportunità equivalenti." actions={<PrimaryLink href="/demo">+ Nuova analisi</PrimaryLink>}>
      <AcquisitionsTable opportunities={demoOpportunities} />
    </WorkspacePage>
  );
}
