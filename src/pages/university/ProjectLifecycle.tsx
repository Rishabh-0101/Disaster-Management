import DashboardLayout from '../../components/layout/DashboardLayout';
import Timeline from '../../components/common/Timeline';
import { UNIVERSITY_NAV_ITEMS } from './universityNav';

const PHASES = [
  { label: 'Challenge accepted', complete: true, timestamp: '10 Jun 2026' },
  { label: 'Team assigned', complete: true, timestamp: '12 Jun 2026' },
  { label: 'Solution proposal submitted', complete: true, timestamp: '20 Jun 2026' },
  { label: 'Prototype development', complete: false },
  { label: 'Field testing', complete: false },
  { label: 'Deployment & impact reporting', complete: false },
];

export default function ProjectLifecycle() {
  return (
    <DashboardLayout title="University Portal" navItems={UNIVERSITY_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Project Lifecycle</h1>
      <p className="mt-1 text-sm text-slate-400">Track a project from proposal through to deployed impact.</p>

      <div className="mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
        <Timeline items={PHASES} />
      </div>
    </DashboardLayout>
  );
}
