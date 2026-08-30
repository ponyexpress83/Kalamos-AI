import AskKalamosClient from "@/components/AskKalamosClient";
import { WorkspacePage } from "@/components/WorkspaceShell";

export const metadata = { title: "Ask Kalamos — Kalamos AI" };

export default function AskPage() {
  return <WorkspacePage eyebrow="Grounded editorial copilot" title="Ask Kalamos" description="Non una chatbot generica: risponde sul contesto editoriale disponibile, segnala quando un dato manca e mantiene separati suggerimenti AI, decisioni umane e review legale."><AskKalamosClient /></WorkspacePage>;
}
