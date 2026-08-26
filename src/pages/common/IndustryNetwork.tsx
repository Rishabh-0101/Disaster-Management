import { Factory, Mail } from 'lucide-react';
import Badge from '../../components/common/Badge';
import { ALL_INDUSTRY_PARTNERS as INDUSTRY_PARTNERS } from '../../constants/demoData';

export default function IndustryNetwork() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Industry Network</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Industry partners supporting solutions with funding, mentorship, and technical resources.
      </p>

      <div className="mt-8 space-y-6">
        {INDUSTRY_PARTNERS.map((partner) => (
          <div key={partner.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-orange/15 text-accent-orange">
                <Factory size={22} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">{partner.name}</h3>
                <p className="text-sm text-slate-400">{partner.sector}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Capabilities</p>
              <div className="flex flex-wrap gap-2">
                {partner.capabilities.map((cap) => (
                  <Badge key={cap} className="bg-accent-orange/10 text-accent-orange border-accent-orange/30">{cap}</Badge>
                ))}
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <Mail size={14} /> {partner.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
