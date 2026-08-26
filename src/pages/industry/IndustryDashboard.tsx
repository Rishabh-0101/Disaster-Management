import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import { INDUSTRY_NAV_ITEMS } from './industryNav';
import { Handshake, FolderKanban, IndianRupee, Users } from 'lucide-react';

export default function IndustryDashboard() {
  return (
    <DashboardLayout title="Industry Portal" navItems={INDUSTRY_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Industry Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">Track your partnerships, funded projects and impact.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Active Partnerships" value="6" icon={Handshake} />
        <StatCard label="Funded Projects" value="4" icon={FolderKanban} />
        <StatCard label="Total Contribution" value="Rs. 32.00 L" icon={IndianRupee} />
        <StatCard label="People Impacted" value="18,200" icon={Users} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-sm font-semibold text-white">Get Started</h2>
        <p className="text-sm text-slate-400">
          Explore open challenges that match your company's capabilities and propose support —
          funding, hardware, mentorship, or CSR resources.
        </p>
      </div>
    </DashboardLayout>
  );
}
