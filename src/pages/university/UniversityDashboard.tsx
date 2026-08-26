import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { UNIVERSITY_NAV_ITEMS } from './universityNav';
import { ListChecks, Users2, Award, Rocket } from 'lucide-react';

export default function UniversityDashboard() {
  return (
    <DashboardLayout title="University Portal" navItems={UNIVERSITY_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">University Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">Overview of your accepted challenges, teams and outcomes.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Assigned Challenges" value="5" icon={ListChecks} />
        <StatCard label="Active Teams" value="3" icon={Users2} />
        <StatCard label="Patents Filed" value="7" icon={Award} />
        <StatCard label="Startups Created" value="11" icon={Rocket} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-sm font-semibold text-white">Next Steps</h2>
        <p className="text-sm text-slate-400">
          Review newly matched challenges under "Assigned Challenges" and assign a faculty-led
          student team to begin work.
        </p>
      </div>
    </DashboardLayout>
  );
}
