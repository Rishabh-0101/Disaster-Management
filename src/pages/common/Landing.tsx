import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowRight, Search, MapPin } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import { HOME_STATS, LIVE_FEED } from '../../constants/demoData';
import { STATUS_LABELS, STATUS_COLORS } from '../../constants/statuses';
import { CATEGORIES } from '../../constants/categories';
import { listProblems, Problem } from '../../services/problemService';
import { timeAgo } from '../../utils/formatters';
import { Users, CheckCircle2, Building2 } from 'lucide-react';

interface FeedItem {
  id: string;
  title: string;
  location: string;
  status: Problem['status'];
  isReal: boolean;
}

export default function Landing() {
  const [realFeed, setRealFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    listProblems()
      .then((problems) => {
        const mapped: FeedItem[] = problems.slice(0, 3).map((p) => ({
          id: p.tracking_id,
          title: p.title,
          location: [p.city, p.district, p.state].filter(Boolean).join(', '),
          status: p.status,
          isReal: true,
        }));
        setRealFeed(mapped);
      })
      .catch(() => setRealFeed([]));
  }, []);

  // Real citizen-submitted reports show first (labeled "Live"); demo sample
  // reports fill any remaining slots and are clearly labeled "Sample".
  const demoFeed: FeedItem[] = LIVE_FEED.map((item) => ({ ...item, isReal: false }));
  const feed = [...realFeed, ...demoFeed].slice(0, 3);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-glow-gradient" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-xs font-medium text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            National Innovation Collaboration Platform
          </div>

          <h1 className="mx-auto max-w-4xl text-center text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">Report the Problem. </span>
            <span className="text-gradient">Find the Expertise.</span>
            <br />
            <span className="text-white">Build the Solution. </span>
            <span className="text-gradient">Measure the Impact.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-300 sm:text-base">
            SamadhanSetu connects citizens who know about problems, universities who know how to
            solve them, industries who know how to build solutions, and governments who can
            enable implementation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/report-problem"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-400 to-brand-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-glow transition hover:opacity-90"
            >
              Report a Problem <ArrowRight size={16} />
            </Link>
            <Link
              to="/track-problem"
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Search size={16} /> Track My Problem
            </Link>
            <Link
              to="/explore-challenges"
              className="flex items-center gap-1 px-2 py-3 text-sm font-medium text-brand-300 hover:text-brand-200"
            >
              Explore Challenges <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-extrabold text-white">{HOME_STATS.problemsReported.toLocaleString('en-IN')}</p>
              <p className="mt-1 text-xs text-slate-400">Problems reported</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">{HOME_STATS.resolved.toLocaleString('en-IN')}</p>
              <p className="mt-1 text-xs text-slate-400">Resolved</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">{HOME_STATS.institutionsEngaged}</p>
              <p className="mt-1 text-xs text-slate-400">Institutions engaged</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live feed */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Live Feed</h2>
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Updating
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feed.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 card-glow">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">{item.id}</span>
                <div className="flex items-center gap-1.5">
                  {item.isReal ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">Live</Badge>
                  ) : (
                    <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/40">Sample</Badge>
                  )}
                  <Badge className={STATUS_COLORS[item.status]}>{STATUS_LABELS[item.status]}</Badge>
                </div>
              </div>
              <p className="mb-2 text-sm font-semibold text-white">{item.title}</p>
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin size={12} /> {item.location}
              </p>
            </div>
          ))}
        </div>
        {realFeed.length === 0 && (
          <p className="mt-4 text-center text-xs text-slate-500">
            The 3 cards above marked "Sample" are illustrative demo data. Report a problem to see your own appear here as "Live".
          </p>
        )}
      </section>

      {/* Category strip */}
      <section className="border-t border-white/10 bg-navy-900/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-xl font-bold text-white sm:text-2xl">Explore by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.slice(0, 10).map((cat) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (Icons as any)[cat.icon] || Icons.CircleHelp;
              return (
                <Link
                  key={cat.id}
                  to="/explore-challenges"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-brand-400/50 hover:text-white"
                >
                  <Icon size={14} className="text-brand-300" /> {cat.label}
                </Link>
              );
            })}
            <Link
              to="/explore-challenges"
              className="rounded-full bg-brand-500/15 px-4 py-2 text-xs font-semibold text-brand-300 hover:bg-brand-500/25 transition"
            >
              +{CATEGORIES.length - 10} more →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 bg-navy-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-xl font-bold text-white sm:text-2xl">How SamadhanSetu Works</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Citizens" value="Report a problem" icon={Users} />
            <StatCard label="Universities & Industry" value="Build the solution" icon={Building2} />
            <StatCard label="Government" value="Enable & fund impact" icon={CheckCircle2} />
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-t border-white/10 bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Have a problem in your community? <span className="text-gradient">Report it today.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            It takes less than two minutes, no login required, and you'll get a tracking ID to
            follow every step to resolution.
          </p>
          <Link
            to="/report-problem"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-400 to-brand-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-glow transition hover:opacity-90"
          >
            Report a Problem <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
