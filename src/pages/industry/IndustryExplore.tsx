import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import MatchScore from '../../components/common/MatchScore';
import { INDUSTRY_NAV_ITEMS } from './industryNav';
import { CHALLENGES } from '../../constants/demoData';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS } from '../../constants/statuses';

export default function IndustryExplore() {
  return (
    <DashboardLayout title="Industry Portal" navItems={INDUSTRY_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Explore Challenges</h1>
      <p className="mt-1 text-sm text-slate-400">Challenges that could benefit from industry funding or expertise.</p>

      <div className="mt-6 space-y-4">
        {CHALLENGES.map((c) => (
          <div key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge className={PRIORITY_COLORS[c.priority]}>{c.priority}</Badge>
              <Badge className={STATUS_COLORS[c.status]}>{STATUS_LABELS[c.status]}</Badge>
            </div>
            <p className="text-sm font-semibold text-white">{c.title}</p>
            <p className="mt-1 text-xs text-slate-500">{c.location}</p>
            <div className="mt-3 max-w-xs">
              <MatchScore label="Your Company" score={c.matchScore} />
            </div>
            <button className="mt-4 rounded-lg bg-accent-orange px-4 py-2 text-sm font-semibold text-navy-950 hover:opacity-90 transition">
              Offer Support
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
