import { useState, FormEvent } from 'react';
import { Search, MapPin, Phone } from 'lucide-react';
import Timeline from '../../components/common/Timeline';
import EmptyState from '../../components/common/EmptyState';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import { getProblemByTrackingId, getProblemsByContact, Problem } from '../../services/problemService';
import { STATUS_LABELS, STATUS_COLORS } from '../../constants/statuses';

const TIMELINE_STEPS = [
  'submitted',
  'under_review',
  'assigned',
  'solution_proposed',
  'in_progress',
  'resolved',
] as const;

function buildTimeline(status: Problem['status']) {
  const idx = TIMELINE_STEPS.indexOf(status as (typeof TIMELINE_STEPS)[number]);
  const completedCount = idx === -1 ? 1 : idx + 1;
  const labels = [
    'Report submitted',
    'Category & location verified',
    'Institution / university assigned',
    'Solution proposed',
    'Implementation in progress',
    'Problem resolved',
  ];
  return labels.map((label, i) => ({ label, complete: i < completedCount }));
}

type Mode = 'id' | 'contact';

export default function TrackProblem() {
  const [mode, setMode] = useState<Mode>('id');
  const [trackingId, setTrackingId] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);
    setProblem(null);
    setProblems([]);
    try {
      if (mode === 'id') {
        const result = await getProblemByTrackingId(trackingId.trim());
        setProblem(result);
      } else {
        const results = await getProblemsByContact(contact.trim());
        if (results.length === 0) throw new Error('No reports found for that contact.');
        setProblems(results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nothing found. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">Track a Problem</h1>
      <p className="mt-2 text-center text-sm text-slate-400">
        Track your report by tracking ID, or find all reports linked to your contact details.
      </p>

      <div className="mt-6 flex rounded-lg border border-white/10 p-1 text-sm">
        <button
          onClick={() => setMode('id')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 font-medium transition ${mode === 'id' ? 'bg-brand-500 text-navy-950' : 'text-slate-400'}`}
        >
          <Search size={14} /> By Tracking ID
        </button>
        <button
          onClick={() => setMode('contact')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 font-medium transition ${mode === 'contact' ? 'bg-brand-500 text-navy-950' : 'text-slate-400'}`}
        >
          <Phone size={14} /> By Contact
        </button>
      </div>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2">
        {mode === 'id' ? (
          <input
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. JH-2026-482910"
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
          />
        ) : (
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone number or email used when reporting"
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
          />
        )}
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition"
        >
          <Search size={16} /> Track
        </button>
      </form>

      <div className="mt-10">
        {loading && <Loader label="Looking up your report…" />}

        {!loading && searched && !problem && problems.length === 0 && (
          <EmptyState title="Nothing found" description={error || 'Please check your details and try again.'} />
        )}

        {!loading && problem && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-slate-500">{problem.tracking_id}</p>
              <Badge className={STATUS_COLORS[problem.status]}>{STATUS_LABELS[problem.status]}</Badge>
            </div>
            <h2 className="text-lg font-semibold text-white">{problem.title}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
              <MapPin size={12} />
              {[problem.city, problem.district, problem.state].filter(Boolean).join(', ')}
            </p>

            <div className="mt-6">
              <Timeline items={buildTimeline(problem.status)} />
            </div>
          </div>
        )}

        {!loading && problems.length > 0 && (
          <div className="space-y-4">
            {problems.map((p) => (
              <div key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs text-slate-500">{p.tracking_id}</p>
                  <Badge className={STATUS_COLORS[p.status]}>{STATUS_LABELS[p.status]}</Badge>
                </div>
                <p className="text-sm font-semibold text-white">{p.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                  <MapPin size={12} /> {[p.city, p.district, p.state].filter(Boolean).join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
