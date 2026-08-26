import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

export default function SubmissionSuccess() {
  const location = useLocation();
  const trackingId = (location.state as { trackingId?: string })?.trackingId || 'JH-2026-000000';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        <CheckCircle2 size={32} />
      </span>
      <h1 className="text-2xl font-bold text-white">Problem Reported Successfully</h1>
      <p className="mt-2 text-sm text-slate-400">
        Thank you for helping your community. Save your tracking ID to follow progress.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3">
        <span className="font-mono text-lg font-semibold text-brand-300">{trackingId}</span>
        <button onClick={handleCopy} className="text-slate-400 hover:text-white">
          <Copy size={16} />
        </button>
      </div>
      {copied && <p className="mt-2 text-xs text-emerald-400">Copied to clipboard</p>}

      <div className="mt-8 flex gap-3">
        <Link
          to="/track-problem"
          className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition"
        >
          Track This Problem
        </Link>
        <Link
          to="/"
          className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
