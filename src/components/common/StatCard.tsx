import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  accent?: string;
}

export default function StatCard({ label, value, icon: Icon, accent = 'text-brand-400' }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 card-glow">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
        {Icon && <Icon size={18} className={accent} />}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
