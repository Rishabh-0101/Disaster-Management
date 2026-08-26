import { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  Cell as RCell,
} from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import { GOV_NAV_ITEMS } from './govNav';
import { CHALLENGES, IMPACT_STATS } from '../../constants/demoData';
import { CATEGORIES } from '../../constants/categories';
import { INDIAN_STATES } from '../../constants/indianStates';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS } from '../../constants/statuses';
import { listProblems, getStatsByState, Problem } from '../../services/problemService';
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  MapPin,
  IndianRupee,
  Building2,
} from 'lucide-react';

const CATEGORY_COLORS = ['#22d3ee', '#0ea5c9', '#7dd3fc', '#38bdf8', '#0284a3', '#ff6b4a', '#a78bfa'];
const URGENCY_COLORS: Record<string, string> = {
  Critical: '#f472b6',
  High: '#fb923c',
  Medium: '#fbbf24',
  Low: '#94a3b8',
};

export default function GovDashboard() {
  const [realProblems, setRealProblems] = useState<Problem[]>([]);
  const [stateStats, setStateStats] = useState<{ state: string; count: number }[]>([]);
  const [stateFilter, setStateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    listProblems().then(setRealProblems).catch(() => setRealProblems([]));
    getStatsByState().then(setStateStats).catch(() => setStateStats([]));
  }, []);

  // Combine demo challenges + real citizen-submitted problems into one shape for stats.
  const combined = useMemo(() => {
    const fromDemo = CHALLENGES.map((c) => ({
      priority: c.priority,
      status: c.status as string,
      category: c.tags[0]?.toLowerCase() || 'other',
      state: c.location.split(',').pop()?.trim() || '',
    }));
    const fromReal = realProblems.map((p) => ({
      priority: p.priority,
      status: p.status as string,
      category: CATEGORIES.find((c) => c.id === p.category)?.label.toLowerCase() || p.category,
      state: p.state,
    }));
    return [...fromDemo, ...fromReal];
  }, [realProblems]);

  const filtered = combined.filter((c) => {
    const stateOk = stateFilter === 'all' || c.state.toLowerCase() === stateFilter.toLowerCase();
    const catOk = categoryFilter === 'all' || c.category.toLowerCase() === categoryFilter.toLowerCase();
    return stateOk && catOk;
  });

  const total = filtered.length;
  const critical = filtered.filter((c) => c.priority === 'Critical').length;
  const inProgress = filtered.filter((c) => c.status === 'in_progress' || c.status === 'assigned' || c.status === 'under_review').length;
  const completed = filtered.filter((c) => c.status === 'resolved').length;

  const categoryData = CATEGORIES.map((cat) => ({
    name: cat.label,
    value: filtered.filter((c) => c.category === cat.label.toLowerCase()).length,
  })).filter((c) => c.value > 0);

  const urgencyData = ['Critical', 'High', 'Medium', 'Low'].map((level) => ({
    name: level,
    value: filtered.filter((c) => c.priority === level).length,
  })).filter((c) => c.value > 0);

  const topStates = stateStats.slice(0, 10);

  const recentProblems = [...realProblems]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Government Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">National overview of societal challenges and innovation projects.</p>
        </div>
        <Badge className="bg-red-500/20 text-red-300 border-red-500/40">
          <AlertTriangle size={12} className="mr-1 inline" /> Disaster Mode available in sidebar
        </Badge>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Problems" value={total} icon={FileText} />
        <StatCard label="Critical" value={critical} icon={AlertTriangle} accent="text-red-400" />
        <StatCard label="In Progress" value={inProgress} icon={Clock} accent="text-amber-400" />
        <StatCard label="Completed" value={completed} icon={CheckCircle2} accent="text-emerald-400" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="People Benefited" value={IMPACT_STATS.peopleBenefited.toLocaleString('en-IN')} icon={Users} />
        <StatCard label="Villages Covered" value={IMPACT_STATS.villagesCovered} icon={MapPin} />
        <StatCard label="Cost Saved" value={IMPACT_STATS.costSavedLabel} icon={IndianRupee} />
        <StatCard label="Universities" value={10} icon={Building2} />
      </div>

      {/* Filters */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Filter by State</label>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
          >
            <option value="all" className="bg-navy-900">All States</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s} className="bg-navy-900">{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Filter by Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
          >
            <option value="all" className="bg-navy-900">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.label} className="bg-navy-900">{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts row 1 */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Problems by Category</h2>
          {categoryData.length === 0 ? (
            <p className="py-16 text-center text-xs text-slate-500">No data for this filter combination.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} interval={0} angle={-25} textAnchor="end" height={55} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((_, idx) => (
                    <RCell key={idx} fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Urgency Distribution</h2>
          {urgencyData.length === 0 ? (
            <p className="py-16 text-center text-xs text-slate-500">No data for this filter combination.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={urgencyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                  {urgencyData.map((entry, idx) => (
                    <Cell key={idx} fill={URGENCY_COLORS[entry.name] || CATEGORY_COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Charts row 2: Top states + recent problems */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Top States by Problems</h2>
          {topStates.length === 0 ? (
            <p className="py-16 text-center text-xs text-slate-500">
              No real reports yet — submit one via "Report a Problem" to see it appear here.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(180, topStates.length * 36)}>
              <BarChart data={topStates} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <YAxis type="category" dataKey="state" stroke="#94a3b8" fontSize={11} width={90} />
                <Tooltip contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Bar dataKey="count" fill="#22d3ee" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Recent Problems</h2>
          {recentProblems.length === 0 ? (
            <p className="py-16 text-center text-xs text-slate-500">No citizen reports yet.</p>
          ) : (
            <div className="space-y-3">
              {recentProblems.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-navy-900/50 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-white">{p.title}</p>
                    <p className="text-xs text-slate-500">{[p.city, p.district, p.state].filter(Boolean).join(', ')}</p>
                  </div>
                  <Badge className={STATUS_COLORS[p.status]}>{STATUS_LABELS[p.status]}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Sample Challenges</h2>
        <div className="space-y-3">
          {CHALLENGES.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <p className="text-xs text-slate-500">{c.location} • {c.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={PRIORITY_COLORS[c.priority]}>{c.priority}</Badge>
                <Badge className={STATUS_COLORS[c.status]}>{STATUS_LABELS[c.status]}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
