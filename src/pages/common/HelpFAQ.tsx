import { useState } from 'react';
import { ChevronDown, Mail, Phone, MapPin, FileText, Search as SearchIcon, Users, Building2, Factory, Landmark } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I report a problem?',
    a: 'Click "Report a Problem" from any page, fill in the problem title, description, category, and confirm its location (or use "Use my current location" for GPS auto-fill), then add photo/video evidence and submit. You will get a tracking ID.',
  },
  {
    q: 'Do I need to log in to report a problem?',
    a: 'No. Citizens can report problems without logging in. However, creating an account lets you track the status of your reports more easily and see your history.',
  },
  {
    q: 'How does a university get matched to a challenge?',
    a: "Our matching engine compares the challenge category, location, and required expertise against each university's departments and labs to generate a match score shown as a progress bar.",
  },
  {
    q: 'How can industry partners get involved?',
    a: 'Industry partners register their capabilities (funding, hardware, mentorship, CSR support) and get matched to projects that need those specific resources.',
  },
  {
    q: 'How is impact measured?',
    a: 'Once a project is deployed, the responsible institution reports back on people benefited, villages covered and cost saved, which is displayed with charts on the Impact Stories page.',
  },
  {
    q: 'How do I track my report after submitting?',
    a: 'Go to "Track a Problem" and search either by your Tracking ID, or by the phone/email you used when reporting — both methods work.',
  },
  {
    q: 'What is Disaster Mode?',
    a: 'A special view in the Government portal that surfaces Critical and High priority reports first, for rapid, coordinated emergency response.',
  },
];

const WORKFLOW_STEPS = [
  { icon: FileText, label: 'Report', color: 'bg-brand-500/15 text-brand-300' },
  { icon: SearchIcon, label: 'Verify', color: 'bg-amber-500/15 text-amber-300' },
  { icon: Building2, label: 'Match', color: 'bg-blue-500/15 text-blue-300' },
  { icon: Factory, label: 'Build', color: 'bg-accent-orange/15 text-accent-orange' },
  { icon: Landmark, label: 'Fund', color: 'bg-purple-500/15 text-purple-300' },
  { icon: Users, label: 'Impact', color: 'bg-emerald-500/15 text-emerald-300' },
];

export default function HelpFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Help &amp; FAQ</h1>
      <p className="mt-2 text-sm text-slate-400">
        Read the full written guide below, or skim the visual workflow if you'd rather see it at a glance.
      </p>

      {/* Graphical / animated overview */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
          The SamadhanSetu Journey — at a glance
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${step.color} animate-pulse`}
                  style={{ animationDuration: '3s', animationDelay: `${idx * 0.2}s` }}
                >
                  <step.icon size={22} />
                </span>
                <span className="text-xs font-medium text-slate-300">{step.label}</span>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden h-0.5 w-8 bg-gradient-to-r from-brand-400/50 to-transparent sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Written full guide */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-3 text-lg font-semibold text-white">Full Written Guide</h2>
        <div className="space-y-4 text-sm leading-relaxed text-slate-400">
          <p>
            <span className="font-semibold text-slate-200">1. Reporting:</span> Use the "Report a
            Problem" button anywhere in the app. You'll go through 5 steps — Details, Location,
            Evidence, Review, and Submit. Location supports real GPS auto-detect plus a live map
            preview so your exact spot is recorded accurately.
          </p>
          <p>
            <span className="font-semibold text-slate-200">2. Exploring challenges:</span> The
            "Explore Challenges" page groups every open problem by category with counts, so
            universities and industry partners can quickly find where their expertise is most
            needed.
          </p>
          <p>
            <span className="font-semibold text-slate-200">3. Matching:</span> Every challenge
            shows a "Match Score" against your university or company's registered
            expertise/capabilities — the higher the score, the better the fit.
          </p>
          <p>
            <span className="font-semibold text-slate-200">4. Dashboards:</span> After logging in,
            each role (Citizen, University, Industry, Government) gets its own dashboard with
            relevant charts, assigned work, and next steps.
          </p>
          <p>
            <span className="font-semibold text-slate-200">5. Tracking:</span> Anyone can check
            progress anytime via "Track a Problem," searching either by tracking ID or by the
            phone/email used at report time.
          </p>
        </div>
      </div>

      {/* FAQ accordion */}
      <h2 className="mt-10 text-lg font-semibold text-white">Frequently Asked Questions</h2>
      <div className="mt-4 space-y-3">
        {FAQS.map((faq, idx) => (
          <div key={faq.q} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-white"
            >
              {faq.q}
              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform ${openIndex === idx ? 'rotate-180 text-brand-300' : 'text-slate-500'}`}
              />
            </button>
            {openIndex === idx && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-slate-400">{faq.a}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
        <h3 className="mb-4 font-semibold text-white">Still need help?</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-center gap-2"><Mail size={14} /> contact@samadhansetu.in</li>
          <li className="flex items-center gap-2"><Phone size={14} /> +91 1800 XXX XXXX</li>
          <li className="flex items-center gap-2"><MapPin size={14} /> National Innovation Hub, India</li>
        </ul>
      </div>
    </div>
  );
}
