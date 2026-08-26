import { Building2, Mail, MapPin, FlaskConical } from 'lucide-react';
import Badge from '../../components/common/Badge';
import { ALL_UNIVERSITIES as UNIVERSITIES } from '../../constants/demoData';

export default function UniversityNetwork() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">University Network</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Universities and higher education institutions partnering to solve societal challenges.
      </p>

      <div className="mt-8 space-y-6">
        {UNIVERSITIES.map((uni) => (
          <div key={uni.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 card-glow">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                <Building2 size={22} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">{uni.name}</h3>
                <p className="flex items-center gap-1 text-sm text-slate-400">
                  <MapPin size={12} /> {uni.location}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Departments</p>
              <div className="flex flex-wrap gap-2">
                {uni.departments.map((d) => (
                  <Badge key={d}>{d}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Expertise Areas</p>
              <div className="flex flex-wrap gap-2">
                {uni.expertise.map((e) => (
                  <Badge key={e} className="bg-brand-500/10 text-brand-300 border-brand-500/30">{e}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <FlaskConical size={12} /> Labs
              </p>
              <div className="flex flex-wrap gap-2">
                {uni.labs.map((l) => (
                  <Badge key={l}>{l}</Badge>
                ))}
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <Mail size={14} /> {uni.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
