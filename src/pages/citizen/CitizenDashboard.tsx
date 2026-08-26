import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  LineChart,
  Line,
} from 'recharts';
import { FileText, Search, PlusCircle, MapPin } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { listProblems, Problem } from '../../services/problemService';
import { STATUS_LABELS, STATUS_COLORS } from '../../constants/statuses';
import { CATEGORIES } from '../../constants/categories';
import type { DashboardNavItem } from '../../components/layout/DashboardLayout';

const CITIZEN_NAV_ITEMS: DashboardNavItem[] = [
  { to: '/citizen/dashboard', label: 'Dashboard', icon: FileText },
  { to: '/report-problem', label: 'Report a Problem', icon: PlusCircle },
  { to: '/track-problem', label: 'Track a Problem', icon: Search },
];

const PIE_COLORS = ['#22d3ee', '#0ea5c9', '#7dd3fc', '#38bdf8', '#0284a3', '#ff6b4a', '#a78bfa'];

// Smooth sine-wave-style animated line data — purely decorative, shows a
// "community activity" trend. Regenerates a gentle wave pattern.
function buildWaveData(points = 24) {
  return Array.from({ length: points }, (_, i) => ({
    t: i,
    value: Math.round(50 + 40 * Math.sin(i / 2.2) + 10 * Math.sin(i / 0.7)),
  }));
}

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const waveData = buildWaveData();

  useEffect(() => {
    listProblems()
      .then(setAllProblems)
      .catch(() => setAllProblems([]))
      .finally(() => setLoading(false));
  }, []);

  const myProblems = user?.email ? allProblems.filter((p) => p.reporter_contact === user.email) : [];

  const categoryData = CATEGORIES.map((cat) => ({
    name: cat.label,
    value: allProblems.filter((p) => p.category === cat.id).length,
  })).filter((c) => c.value > 0);

  const statusCounts = Object.entries(
    allProblems.reduce<Record<string, number>>((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({ status: STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status, count }));

  return (
    <DashboardLayout title="Citizen Portal" navItems={CITIZEN_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
      <p className="mt-1 text-sm text-slate-400">Report problems in your community and track their progress.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Your Reports" value={myProblems.length} icon={FileText} />
        <Link
          to="/report-problem"
          className="flex items-center justify-between rounded-2xl border border-brand-400/30 bg-brand-400/10 p-5 transition hover:bg-brand-400/20"
        >
          <div>
            <p className="text-sm font-semibold text-white">Report a Problem</p>
            <p className="text-xs text-slate-400">Takes about 2 minutes</p>
          </div>
          <PlusCircle className="text-brand-300" size={22} />
        </Link>
        <Link
          to="/track-problem"
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
        >
          <div>
            <p className="text-sm font-semibold text-white">Track a Problem</p>
            <p className="text-xs text-slate-400">By tracking ID or contact</p>
          </div>
          <Search className="text-slate-300" size={22} />
        </Link>
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            All Reports by Category (Bar)
          </h2>
          {categoryData.length === 0 ? (
            <p className="py-16 text-center text-xs text-slate-500">No reports yet — submit one to see this chart populate.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Bar dataKey="value" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Reports by Status (Pie)
          </h2>
          {statusCounts.length === 0 ? (
            <p className="py-16 text-center text-xs text-slate-500">No reports yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusCounts} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                  {statusCounts.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10, color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Community Activity Trend
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={waveData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Your Recent Reports</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : myProblems.length === 0 ? (
          <EmptyState
            title="No reports yet"
            description="Reports you submit while signed in with this email will show up here."
            action={
              <Link to="/report-problem" className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition">
                Report a Problem
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {myProblems.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-sm font-semibold text-white">{p.title}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} /> {[p.city, p.district, p.state].filter(Boolean).join(', ')}
                  </p>
                </div>
                <Badge className={STATUS_COLORS[p.status]}>{STATUS_LABELS[p.status]}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
