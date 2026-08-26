import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import { UNIVERSITY_NAV_ITEMS } from './universityNav';
import { CHALLENGES } from '../../constants/demoData';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS } from '../../constants/statuses';

export default function AssignedChallenges() {
  return (
    <DashboardLayout title="University Portal" navItems={UNIVERSITY_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Assigned Challenges</h1>
      <p className="mt-1 text-sm text-slate-400">Challenges your institution has accepted or been assigned.</p>

      <div className="mt-6 space-y-4">
        {CHALLENGES.map((c) => (
          <div key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge className={PRIORITY_COLORS[c.priority]}>{c.priority}</Badge>
              <Badge className={STATUS_COLORS[c.status]}>{STATUS_LABELS[c.status]}</Badge>
            </div>
            <p className="text-sm font-semibold text-white">{c.title}</p>
            <p className="mt-1 text-xs text-slate-500">{c.location} • {c.date}</p>
            <div className="mt-4 flex gap-3">
              <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition">
                Assign Team
              </button>
              <button className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
