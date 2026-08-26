import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmptyState from '../../components/common/EmptyState';
import { UNIVERSITY_NAV_ITEMS } from './universityNav';
import { Users2, Plus } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

// TODO: replace with real data from your `teams` table in Supabase.
const INITIAL_TEAM: TeamMember[] = [
  { id: 't1', name: 'Dr. A. Sharma', role: 'Faculty Lead' },
  { id: 't2', name: 'Priya Verma', role: 'Student — Civil Engineering' },
  { id: 't3', name: 'Rohit Kumar', role: 'Student — Computer Science' },
];

export default function TeamManagement() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);

  return (
    <DashboardLayout title="University Portal" navItems={UNIVERSITY_NAV_ITEMS}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Management</h1>
          <p className="mt-1 text-sm text-slate-400">Faculty and student teams working on assigned challenges.</p>
        </div>
        <button className="flex items-center gap-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {team.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No team members yet" description="Add faculty and students to start working on a challenge." />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {team.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">
                  <Users2 size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </div>
              <button
                onClick={() => setTeam(team.filter((m) => m.id !== member.id))}
                className="text-xs text-slate-500 hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
