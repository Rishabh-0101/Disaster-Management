import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Calendar, ArrowLeft } from 'lucide-react';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { CHALLENGES } from '../../constants/demoData';
import { STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS } from '../../constants/statuses';

export default function ChallengeDetails() {
  const { id } = useParams();
  const challenge = CHALLENGES.find((c) => c.id === id);

  if (!challenge) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="Challenge not found" description="This challenge may have been removed or the link is incorrect." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/explore-challenges" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">
        <ArrowLeft size={14} /> Back to Explore Challenges
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge className={PRIORITY_COLORS[challenge.priority]}>{challenge.priority}</Badge>
        <Badge className={STATUS_COLORS[challenge.status]}>{STATUS_LABELS[challenge.status]}</Badge>
        {challenge.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <h1 className="text-2xl font-bold text-white sm:text-3xl">{challenge.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
        <span className="flex items-center gap-1"><MapPin size={14} /> {challenge.location}</span>
        <span className="flex items-center gap-1"><Calendar size={14} /> {challenge.date}</span>
        <span className="flex items-center gap-1"><Users size={14} /> {challenge.affected.toLocaleString('en-IN')} affected</span>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
        <h2 className="mb-2 text-lg font-semibold text-white">Problem Description</h2>
        <p className="text-sm leading-relaxed text-slate-300">{challenge.description}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition">
          Accept Challenge
        </button>
        <button className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition">
          Propose a Solution
        </button>
      </div>
    </div>
  );
}
