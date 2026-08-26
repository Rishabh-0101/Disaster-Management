import DashboardLayout from '../../components/layout/DashboardLayout';
import MatchScore from '../../components/common/MatchScore';
import Badge from '../../components/common/Badge';
import { GOV_NAV_ITEMS } from './govNav';
import { CHALLENGES, ALL_UNIVERSITIES as UNIVERSITIES } from '../../constants/demoData';

export default function UniversityMatching() {
  return (
    <DashboardLayout title="Government Portal" navItems={GOV_NAV_ITEMS}>
      <h1 className="text-2xl font-bold text-white">University Matching</h1>
      <p className="mt-1 text-sm text-slate-400">
        Suggested university matches for each open challenge, based on expertise and location.
      </p>

      <div className="mt-6 space-y-6">
        {CHALLENGES.map((challenge) => (
          <div key={challenge.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">{challenge.title}</h2>
              <Badge>{challenge.location}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {UNIVERSITIES.map((uni, idx) => (
                <div key={uni.id} className="rounded-xl border border-white/10 bg-navy-900/50 p-4">
                  <p className="text-sm font-medium text-white">{uni.name}</p>
                  <p className="text-xs text-slate-500">{uni.location}</p>
                  <div className="mt-3">
                    <MatchScore label="Match" score={challenge.matchScore - idx * 15 > 0 ? challenge.matchScore - idx * 15 : 20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
