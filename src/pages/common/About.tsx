import { ShieldCheck, Users, Building2, Landmark, Factory, Target, Layers, Award, Globe2 } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-navy-950">
        <ShieldCheck size={26} />
      </div>
      <h1 className="text-3xl font-extrabold text-white sm:text-4xl">About SamadhanSetu</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
        SamadhanSetu — literally "Solution Bridge" — is a national innovation collaboration
        platform built to close the gap between people who face everyday societal problems and
        the institutions equipped to solve them. Every day, citizens across India encounter
        problems that never get formally recorded, let alone solved: a broken hand pump, an
        unsafe school building, a flooded road, an unlit street. SamadhanSetu turns each of these
        moments into a tracked case — from the first report, to a matched university or industry
        partner, to a government-enabled, measurable solution.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Target className="mb-2 text-brand-300" size={20} />
          <p className="text-sm font-semibold text-white">Our Mission</p>
          <p className="mt-1 text-xs text-slate-400">Make every local problem visible, matchable, and solvable through collective effort.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Globe2 className="mb-2 text-brand-300" size={20} />
          <p className="text-sm font-semibold text-white">Our Reach</p>
          <p className="mt-1 text-xs text-slate-400">Built to scale across every state and union territory in India, one district at a time.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Award className="mb-2 text-brand-300" size={20} />
          <p className="text-sm font-semibold text-white">Our Standard</p>
          <p className="mt-1 text-xs text-slate-400">Every solution deployed is measured — people benefited, cost saved, and outcomes tracked.</p>
        </div>
      </div>

      <h2 className="mt-14 text-xl font-bold text-white">Who Uses SamadhanSetu</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <Users className="mb-3 text-brand-300" size={22} />
          <h3 className="font-semibold text-white">Citizens</h3>
          <p className="mt-1 text-sm text-slate-400">
            Anyone can report a real problem affecting their community in under two minutes — no
            login required. Attach photos, pin the exact location, and get a tracking ID to follow
            progress until it's resolved.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <Building2 className="mb-3 text-brand-300" size={22} />
          <h3 className="font-semibold text-white">Universities</h3>
          <p className="mt-1 text-sm text-slate-400">
            Faculty and students are matched to challenges that fit their department's expertise
            and labs — turning capstone projects, research, and theses into solutions that reach
            real villages and neighborhoods, not just a grade.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <Factory className="mb-3 text-accent-orange" size={22} />
          <h3 className="font-semibold text-white">Industry Partners</h3>
          <p className="mt-1 text-sm text-slate-400">
            Companies contribute funding, hardware, mentorship and CSR resources to scale
            university-built prototypes into real, deployed, maintained solutions — while meeting
            CSR and ESG commitments with fully transparent impact reporting.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
          <Landmark className="mb-3 text-brand-300" size={22} />
          <h3 className="font-semibold text-white">Government</h3>
          <p className="mt-1 text-sm text-slate-400">
            District and state bodies oversee, prioritize, and fund implementation — with
            dashboards showing problem clusters, AI-assisted recommendations, and a dedicated
            Disaster Mode for rapid coordination during emergencies.
          </p>
        </div>
      </div>

      <h2 className="mt-14 text-xl font-bold text-white">How It Works</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          { step: '01', title: 'Report', desc: 'A citizen reports a problem with location, category and evidence.' },
          { step: '02', title: 'Match', desc: 'Our matching engine finds the best-fit university and industry partner.' },
          { step: '03', title: 'Build', desc: 'Teams design, prototype and deploy a real solution on the ground.' },
          { step: '04', title: 'Measure', desc: 'Impact is tracked and published as a public Impact Story.' },
        ].map((s) => (
          <div key={s.step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <span className="text-2xl font-extrabold text-brand-400/40">{s.step}</span>
            <p className="mt-1 text-sm font-semibold text-white">{s.title}</p>
            <p className="mt-1 text-xs text-slate-400">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
        <div className="flex items-center gap-2">
          <Layers className="text-brand-300" size={18} />
          <h3 className="font-semibold text-white">Our Vision</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Built in alignment with the National Education Policy 2020's vision of community-driven,
          multidisciplinary innovation, SamadhanSetu aims to become the default bridge between
          India's civic problems and its research and industrial capacity — so that no reported
          problem sits unseen, and every solution's impact is visible, verifiable, and repeatable
          across districts.
        </p>
      </div>
    </div>
  );
}
