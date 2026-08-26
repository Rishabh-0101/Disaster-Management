import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import { GOV_NAV_ITEMS } from './govNav';
import { CATEGORIES } from '../../constants/categories';
import { CHALLENGES } from '../../constants/demoData';

export default function ProblemClusters() {
  // TODO: replace with a real clustering algorithm / backend call (e.g. geo + category grouping).
  const clusters = CATEGORIES.map((cat) => ({
    category: cat,
    items: CHALLENGES.filter((c) => c.tags.some((t) => t.toLowerCase() === cat.label.toLowerCase())),
  })).filter((cluster) => cluster.items.length > 0);

  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">Problem Clusters</h1>
      <p className="mt-1 text-sm text-slate-400">
        Related problems grouped by category and geography to identify systemic patterns.
      </p>

      <div className="mt-6 space-y-6">
        {clusters.length === 0 && (
          <p className="text-sm text-slate-500">No clusters found in current demo data.</p>
        )}
        {clusters.map((cluster) => (
          <div key={cluster.category.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">{cluster.category.label}</h2>
              <Badge>{cluster.items.length} problems</Badge>
            </div>
            <div className="space-y-2">
              {cluster.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg bg-navy-900/50 px-4 py-2 text-sm">
                  <span className="text-slate-300">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.location}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
