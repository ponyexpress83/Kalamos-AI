import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { answerDemoQuestion, demoSourcesForQuestion, workspaceContextText } from "@/lib/demo-workspace";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export async function POST(req: NextRequest) {
  const session = verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Sessione scaduta." }, { status: 401 });

  let question = "";
  try {
    const body = (await req.json()) as { question?: string };
    question = body.question?.trim() || "";
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
  if (!question) return NextResponse.json({ error: "Scrivi una domanda." }, { status: 400 });
  if (question.length > 1200) return NextResponse.json({ error: "Domanda troppo lunga." }, { status: 413 });

  const sources = demoSourcesForQuestion(question);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ answer: answerDemoQuestion(question), sources, mode: "deterministic-demo" });

  try {
    const client = new Anthropic({ apiKey, timeout: 25_000, maxRetries: 1 });
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 650,
      system: "Sei Ask Kalamos, copilota per una redazione. Usa SOLO il contesto fornito. Non inventare dati, clausole o decisioni. Distingui sempre suggerimenti AI e decisioni umane. Se una cosa non è nel contesto, dillo. Rispondi in italiano, in modo concreto, massimo 140 parole. Non dare pareri legali: per i contratti indica sempre che serve review Legal/Rights.",
      messages: [{ role: "user", content: `CONTESTO DIMOSTRATIVO:\n${workspaceContextText()}\n\nDOMANDA:\n${question}` }],
    });
    const answer = message.content.find((b) => b.type === "text")?.text?.trim();
    return NextResponse.json({ answer: answer || answerDemoQuestion(question), sources, mode: "llm-grounded" });
  } catch {
    return NextResponse.json({ answer: answerDemoQuestion(question), sources, mode: "deterministic-fallback" });
  }
}
