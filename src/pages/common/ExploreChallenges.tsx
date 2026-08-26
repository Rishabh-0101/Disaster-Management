import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { MapPin, Users, Search, LayoutGrid, List } from 'lucide-react';
import Badge from '../../components/common/Badge';
import MatchScore from '../../components/common/MatchScore';
import EmptyState from '../../components/common/EmptyState';
import { CHALLENGES } from '../../constants/demoData';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS, Priority, ProblemStatus } from '../../constants/statuses';
import { CATEGORIES } from '../../constants/categories';
import { listProblems } from '../../services/problemService';
import { formatDate } from '../../utils/formatters';

// A single shape used for both the built-in demo challenges and any real
// problems citizens have reported (from local storage or your backend),
// so category counts and the list reflect real submissions too.
interface DisplayChallenge {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  affected: number;
  priority: Priority;
  status: ProblemStatus;
  categoryLabels: string[];
  matchScore: number;
}

export default function ExploreChallenges() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [view, setView] = useState<'categories' | 'list'>('categories');
  const [realChallenges, setRealChallenges] = useState<DisplayChallenge[]>([]);

  useEffect(() => {
    listProblems()
      .then((problems) => {
        const mapped: DisplayChallenge[] = problems.map((p) => {
          const catLabel = CATEGORIES.find((c) => c.id === p.category)?.label || p.category;
          return {
            id: p.id,
            title: p.title,
            description: p.description,
            location: [p.city, p.district, p.state].filter(Boolean).join(', '),
            date: formatDate(p.created_at),
            affected: p.affected_count,
            priority: p.priority,
            status: p.status,
            categoryLabels: [catLabel],
            matchScore: 50,
          };
        });
        setRealChallenges(mapped);
      })
      .catch(() => setRealChallenges([]));
  }, []);

  const demoAsDisplay: DisplayChallenge[] = CHALLENGES.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    location: c.location,
    date: c.date,
    affected: c.affected,
    priority: c.priority,
    status: c.status,
    categoryLabels: c.tags,
    matchScore: c.matchScore,
  }));

  // Real, citizen-submitted challenges appear first, demo ones after.
  const allChallenges = [...realChallenges, ...demoAsDisplay];

  const countFor = (label: string) =>
    allChallenges.filter((c) => c.categoryLabels.some((t) => t.toLowerCase() === label.toLowerCase())).length;

  const filtered = allChallenges.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || c.categoryLabels.some((t) => t.toLowerCase() === category.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Explore Challenges</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Browse societal problems reported by citizens across India and find where your expertise fits.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center card-glow">
          <p className="text-3xl font-extrabold text-gradient">{allChallenges.length}</p>
          <p className="text-xs uppercase tracking-wide text-slate-400">Total Challenges</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search challenges..."
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
          />
        </div>
        <div className="flex rounded-lg border border-white/10 p-1">
          <button
            onClick={() => setView('categories')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${view === 'categories' ? 'bg-brand-500 text-navy-950' : 'text-slate-400'}`}
          >
            <LayoutGrid size={14} /> Categories
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${view === 'list' ? 'bg-brand-500 text-navy-950' : 'text-slate-400'}`}
          >
            <List size={14} /> List
          </button>
        </div>
      </div>

      {view === 'categories' && !category && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (Icons as any)[cat.icon] || Icons.CircleHelp;
            const count = countFor(cat.label);
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.label)}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:border-brand-400/50 hover:bg-white/10 card-glow"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition group-hover:bg-brand-500/25">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="font-semibold text-white">{cat.label}</p>
                  <p className="text-xs text-slate-500">{count} active challenge{count === 1 ? '' : 's'}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {(view === 'list' || category) && (
        <>
          {category && (
            <button
              onClick={() => setCategory(null)}
              className="mt-8 flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200"
            >
              ← All categories
            </button>
          )}
          <div className="mt-6 space-y-4">
            {filtered.length === 0 && (
              <EmptyState
                title="No active challenges here yet"
                description="Be the first to report a problem in this category and get it matched to universities and industry."
                action={
                  <Link to="/report-problem" className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition">
                    Report a Problem
                  </Link>
                }
              />
            )}
            {filtered.map((challenge) => (
              <div key={challenge.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow transition hover:border-brand-400/30">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge className={PRIORITY_COLORS[challenge.priority]}>{challenge.priority}</Badge>
                  <Badge className={STATUS_COLORS[challenge.status]}>{STATUS_LABELS[challenge.status]}</Badge>
                  {challenge.categoryLabels.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{challenge.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {challenge.location}</span>
                  <span>{challenge.date}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {challenge.affected.toLocaleString('en-IN')} affected</span>
                </div>

                <div className="mt-4 max-w-xs">
                  <MatchScore label="Your University" score={challenge.matchScore} />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition">
                    Accept Challenge
                  </button>
                  <Link to={`/challenges/${challenge.id}`} className="text-sm font-medium text-brand-300 hover:text-brand-200">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
