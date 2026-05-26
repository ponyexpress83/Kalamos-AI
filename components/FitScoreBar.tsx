function colorFor(score: number): string {
  if (score >= 65) return "bg-emerald-600";
  if (score >= 45) return "bg-amber-500";
  return "bg-stone-400";
}

export default function FitScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-full overflow-hidden rounded-full bg-carta-scura">
        <div className={`h-full rounded-full ${colorFor(score)}`} style={{ width: `${score}%` }} />
      </div>
      <span className="w-14 shrink-0 text-right font-sans text-sm tabular-nums text-inchiostro">
        {score}<span className="text-stone-400">/100</span>
      </span>
    </div>
  );
}
