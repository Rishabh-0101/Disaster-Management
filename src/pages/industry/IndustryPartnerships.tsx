import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import { INDUSTRY_NAV_ITEMS } from './industryNav';
import { ALL_UNIVERSITIES as UNIVERSITIES } from '../../constants/demoData';
import { Handshake } from 'lucide-react';

export default function IndustryPartnerships() {
  return (
    <DashboardLayout title="Industry Portal" navItems={INDUSTRY_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Partnerships</h1>
      <p className="mt-1 text-sm text-slate-400">Your active collaborations with universities and government bodies.</p>

      <div className="mt-6 space-y-4">
        {UNIVERSITIES.map((uni) => (
          <div key={uni.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-orange/15 text-accent-orange">
                <Handshake size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{uni.name}</p>
                <p className="text-xs text-slate-500">{uni.location}</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">Active</Badge>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
