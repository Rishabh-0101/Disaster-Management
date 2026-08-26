import DashboardLayout from '../../components/layout/DashboardLayout';
import { GOV_NAV_ITEMS } from './govNav';
import { Sparkles } from 'lucide-react';
import { CHALLENGES } from '../../constants/demoData';

// TODO: replace with real AI/LLM-generated recommendations from your backend.
const RECOMMENDATIONS = CHALLENGES.map((c, idx) => ({
  id: c.id,
  title: c.title,
  suggestion:
    idx === 0
      ? 'High urgency — recommend fast-track assignment to nearest civil engineering department.'
      : idx === 1
      ? 'Critical health risk — recommend immediate routing to district health office plus a water-management partner university.'
      : 'Moderate priority — good candidate for a student capstone project this semester.',
}));

export default function AIRecommendations() {
  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <div className="flex items-center gap-2">
        <Sparkles className="text-brand-300" size={22} />
        <h1 className="text-2xl font-bold text-white">AI Recommendations</h1>
      </div>
      <p className="mt-1 text-sm text-slate-400">
        AI-assisted analysis suggesting priority, routing, and institution matches for open challenges.
      </p>

      <div className="mt-6 space-y-4">
        {RECOMMENDATIONS.map((rec) => (
          <div key={rec.id} className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-5">
            <p className="text-sm font-semibold text-white">{rec.title}</p>
            <p className="mt-2 flex items-start gap-2 text-sm text-brand-200">
              <Sparkles size={14} className="mt-0.5 shrink-0" /> {rec.suggestion}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
