import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import { GOV_NAV_ITEMS } from './govNav';
import { AlertTriangle, Siren, MapPin, Waves } from 'lucide-react';
import { INDIAN_STATES } from '../../constants/indianStates';

// Demo disaster reports & clusters — matching the structure shown in the
// reference platform. Wire these to real data via problemService once your
// backend classifies reports by disaster type.
const DISASTER_REPORTS = [
  {
    id: 'd1',
    type: 'Flood',
    priority: 'Critical' as const,
    title: 'Flooded road blocks access to village school',
    description: 'Heavy rainfall has repeatedly flooded the only road connecting our village to the school.',
    location: 'Ranchi, Jharkhand',
    date: '22 Aug 2026',
    affected: 3200,
  },
  {
    id: 'd2',
    type: 'Flood',
    priority: 'Critical' as const,
    title: 'Road to school flooded during rain',
    description: 'The road connecting our village to the primary school gets completely waterlogged during monsoon.',
    location: 'Ranchi, Jharkhand',
    date: '22 Aug 2026',
    affected: 1500,
  },
  {
    id: 'd3',
    type: 'Water Contamination',
    priority: 'High' as const,
    title: 'Drinking water contamination in village',
    description: 'The hand pump gives contaminated water. Many people are falling sick.',
    location: 'Patna, Bihar',
    date: '22 Aug 2026',
    affected: 4500,
  },
];

const DISASTER_CLUSTERS = [
  { id: 'CL-JH-RNC-001', title: 'Ranchi Flooded School Road Reports', location: 'Ranchi, Jharkhand', priority: 'Critical' as const, reports: 27, affected: 3200 },
  { id: 'CL-BR-PAT-001', title: 'Patna Water Contamination Reports', location: 'Patna, Bihar', priority: 'Critical' as const, reports: 14, affected: 4500 },
  { id: 'CL-JH-SIM-001', title: 'Simdega Drinking Water Cluster', location: 'Simdega, Jharkhand', priority: 'High' as const, reports: 9, affected: 1800 },
];

const DISASTER_TYPES = ['Flood', 'Drought', 'Water Contamination', 'Cyclone', 'Earthquake', 'Landslide'];

export default function DisasterMode() {
  const [active, setActive] = useState(false);
  const [stateFilter, setStateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredReports = DISASTER_REPORTS.filter((r) => {
    const stateOk = stateFilter === 'all' || r.location.toLowerCase().includes(stateFilter.toLowerCase());
    const typeOk = typeFilter === 'all' || r.type === typeFilter;
    return stateOk && typeOk;
  });

  const totalAffected = DISASTER_REPORTS.reduce((sum, r) => sum + r.affected, 0);
  const criticalCount = DISASTER_REPORTS.filter((r) => r.priority === 'Critical').length;

  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
            <Siren size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">Disaster Mode</h1>
            <p className="text-sm text-slate-400">Emergency coordination dashboard for disaster response.</p>
          </div>
        </div>
        <button
          onClick={() => setActive((v) => !v)}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
            active ? 'bg-red-500 text-white hover:bg-red-600' : 'border border-white/20 text-white hover:bg-white/10'
          }`}
        >
          {active ? 'Disaster Mode: ACTIVE' : 'Activate Disaster Mode'}
        </button>
      </div>

      {active && (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-red-300">
            <AlertTriangle size={16} /> Emergency coordination is live. New reports are being triaged in real time.
          </p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wide text-red-400">Disaster Reports</p>
          <p className="mt-1 text-2xl font-bold text-white">{DISASTER_REPORTS.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wide text-amber-400">Critical</p>
          <p className="mt-1 text-2xl font-bold text-white">{criticalCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wide text-brand-300">People Affected</p>
          <p className="mt-1 text-2xl font-bold text-white">{totalAffected.toLocaleString('en-IN')}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wide text-emerald-400">Active Clusters</p>
          <p className="mt-1 text-2xl font-bold text-white">{DISASTER_CLUSTERS.length}</p>
        </div>
      </div>

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
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Filter by Disaster Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
          >
            <option value="all" className="bg-navy-900">All Disaster Types</option>
            {DISASTER_TYPES.map((t) => (
              <option key={t} value={t} className="bg-navy-900">{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Disaster Reports</h2>
          <div className="space-y-3">
            {filteredReports.length === 0 && (
              <p className="text-sm text-slate-500">No reports match this filter.</p>
            )}
            {filteredReports.map((r) => (
              <div key={r.id} className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Waves size={14} className="text-red-400" />
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/40">{r.priority}</Badge>
                  <Badge>{r.type}</Badge>
                </div>
                <p className="text-sm font-semibold text-white">{r.title}</p>
                <p className="mt-1 text-xs text-slate-400">{r.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {r.location}</span>
                  <span>{r.date}</span>
                  <span>{r.affected.toLocaleString('en-IN')} affected</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Disaster Clusters</h2>
          <div className="space-y-3">
            {DISASTER_CLUSTERS.map((c) => (
              <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{c.title}</p>
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/40">{c.priority}</Badge>
                </div>
                <p className="text-xs text-slate-500">{c.id} | {c.location}</p>
                <div className="mt-3 flex items-center gap-6">
                  <div>
                    <p className="text-lg font-bold text-white">{c.reports}</p>
                    <p className="text-[10px] uppercase text-slate-500">Reports</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{c.affected.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] uppercase text-slate-500">Affected</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
