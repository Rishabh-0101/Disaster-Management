import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import { GOV_NAV_ITEMS } from './govNav';
import { CHALLENGES } from '../../constants/demoData';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS, ProblemStatus } from '../../constants/statuses';

export default function ChallengeManagement() {
  const [statusFilter, setStatusFilter] = useState<ProblemStatus | 'all'>('all');

  const filtered = CHALLENGES.filter((c) => statusFilter === 'all' || c.status === statusFilter);

  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Challenge Management</h1>
          <p className="mt-1 text-sm text-slate-400">Review, prioritize and assign reported challenges.</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ProblemStatus | 'all')}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-400"
        >
          <option value="all" className="bg-navy-900">All statuses</option>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key} className="bg-navy-900">{label}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-white">{c.title}</td>
                <td className="px-4 py-3 text-slate-400">{c.location}</td>
                <td className="px-4 py-3"><Badge className={PRIORITY_COLORS[c.priority]}>{c.priority}</Badge></td>
                <td className="px-4 py-3"><Badge className={STATUS_COLORS[c.status]}>{STATUS_LABELS[c.status]}</Badge></td>
                <td className="px-4 py-3">
                  <button className="text-brand-300 hover:text-brand-200">Assign →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
