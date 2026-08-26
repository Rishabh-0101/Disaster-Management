import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import { GOV_NAV_ITEMS } from './govNav';
import { IMPACT_STORIES } from '../../constants/demoData';

export default function GovProjects() {
  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Projects</h1>
      <p className="mt-1 text-sm text-slate-400">Projects deployed across universities and industry partners.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Deployed</th>
              <th className="px-4 py-3">Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {IMPACT_STORIES.map((s) => (
              <tr key={s.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-white">{s.title}</td>
                <td className="px-4 py-3 text-slate-400">{s.location}</td>
                <td className="px-4 py-3 text-slate-400">{s.date}</td>
                <td className="px-4 py-3"><Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">{s.costSaved} saved</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
