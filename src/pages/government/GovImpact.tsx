import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { GOV_NAV_ITEMS } from './govNav';
import { IMPACT_STATS, IMPACT_STORIES } from '../../constants/demoData';
import { Users, MapPin, IndianRupee, FolderKanban } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

const BAR_COLORS = ['#22d3ee', '#0ea5c9', '#7dd3fc', '#38bdf8'];

export default function GovImpact() {
  const chartData = IMPACT_STORIES.map((s) => ({ name: s.title, people: s.people }));

  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Impact Analytics</h1>
      <p className="mt-1 text-sm text-slate-400">Measurable social impact from all deployed solutions.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="People Benefited" value={IMPACT_STATS.peopleBenefited.toLocaleString('en-IN')} icon={Users} />
        <StatCard label="Villages Covered" value={IMPACT_STATS.villagesCovered} icon={MapPin} />
        <StatCard label="Cost Saved" value={IMPACT_STATS.costSavedLabel} icon={IndianRupee} />
        <StatCard label="Projects Deployed" value={IMPACT_STORIES.length} icon={FolderKanban} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-400">Impact by Project</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-20} textAnchor="end" height={70} />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            <Bar dataKey="people" radius={[6, 6, 0, 0]}>
              {chartData.map((_, idx) => (
                <Cell key={idx} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {IMPACT_STORIES.map((story) => (
          <div key={story.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-slate-500">{story.location} | {story.date}</p>
            <p className="mt-1 text-sm font-semibold text-white">{story.title}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
              <div>
                <p className="text-sm font-bold text-white">{story.people.toLocaleString('en-IN')}</p>
                <p className="text-[10px] uppercase text-slate-500">People</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{story.villages}</p>
                <p className="text-[10px] uppercase text-slate-500">Villages</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{story.costSaved}</p>
                <p className="text-[10px] uppercase text-slate-500">Saved</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
