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
} from 'recharts';
import { Users, MapPin, IndianRupee, GraduationCap, Award, Rocket, Building2 } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import { IMPACT_STATS, IMPACT_STORIES } from '../../constants/demoData';

const PIE_COLORS = ['#22d3ee', '#0ea5c9', '#7dd3fc', '#38bdf8', '#0284a3'];

export default function ImpactStories() {
  const barData = IMPACT_STORIES.map((s) => ({ name: s.title.split(' ').slice(0, 2).join(' '), people: s.people }));
  const pieData = IMPACT_STORIES.map((s) => ({ name: s.title.split(' ').slice(0, 3).join(' '), value: s.people }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Impact Stories</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Measurable social impact from solutions deployed through SamadhanSetu.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="People Benefited" value={IMPACT_STATS.peopleBenefited.toLocaleString('en-IN')} icon={Users} />
        <StatCard label="Villages Covered" value={IMPACT_STATS.villagesCovered} icon={MapPin} />
        <StatCard label="Institutions" value={IMPACT_STATS.institutions} icon={Building2} />
        <StatCard label="Cost Saved" value={IMPACT_STATS.costSavedLabel} icon={IndianRupee} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Students Involved" value={IMPACT_STATS.studentsInvolved.toLocaleString('en-IN')} icon={GraduationCap} />
        <StatCard label="Patents Filed" value={IMPACT_STATS.patentsFiled} icon={Award} />
        <StatCard label="Startups Created" value={IMPACT_STATS.startupsCreated} icon={Rocket} />
        <StatCard label="Institutions Engaged" value={IMPACT_STATS.institutions} icon={Building2} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
            People Benefited by Project (Bar)
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="people" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Impact Share by Project (Pie)
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {IMPACT_STORIES.map((story) => (
          <div key={story.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
            <div className="mb-2 flex items-center gap-2 text-emerald-400">
              <Award size={16} />
              <span className="text-xs font-medium">{story.location} | {story.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{story.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{story.summary}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-center">
              <div>
                <p className="text-lg font-bold text-white">{story.people.toLocaleString('en-IN')}</p>
                <p className="text-[10px] uppercase text-slate-500">People</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">{story.villages}</p>
                <p className="text-[10px] uppercase text-slate-500">Villages</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">{story.costSaved}</p>
                <p className="text-[10px] uppercase text-slate-500">Saved</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
