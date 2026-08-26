interface MatchScoreProps {
  label: string;
  score: number; // 0-100
}

export default function MatchScore({ label, score }: MatchScoreProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const color = clamped >= 70 ? 'bg-emerald-400' : clamped >= 40 ? 'bg-amber-400' : 'bg-slate-400';

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="uppercase tracking-wide text-slate-400">Your Match Score</span>
        <span className="font-semibold text-white">{clamped}%</span>
      </div>
      <p className="mb-1 text-xs text-slate-400">{label}</p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
