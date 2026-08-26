import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, CheckCircle2 } from 'lucide-react';
import Stepper from '../../components/common/Stepper';
import CategorySelector from '../../components/forms/CategorySelector';
import LocationSelector, { LocationValue } from '../../components/forms/LocationSelector';
import FileUploader from '../../components/forms/FileUploader';
import { reportProblem } from '../../services/problemService';
import { CATEGORIES } from '../../constants/categories';

const STEPS = [
  { label: 'Details' },
  { label: 'Location' },
  { label: 'Evidence' },
  { label: 'Review' },
  { label: 'Submit' },
];

interface FormState {
  title: string;
  description: string;
  category: string;
  location: LocationValue;
  affected: string;
  reporterName: string;
  reporterContact: string;
  files: File[];
}

const initialState: FormState = {
  title: '',
  description: '',
  category: '',
  location: { state: '', district: '', city: '', address: '' },
  affected: '',
  reporterName: '',
  reporterContact: '',
  files: [],
};

export default function ReportProblem() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const categoryLabel = CATEGORIES.find((c) => c.id === form.category)?.label || 'Not selected';

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const problem = await reportProblem({
        title: form.title,
        description: form.description,
        category: form.category,
        state: form.location.state,
        district: form.location.district,
        city: form.location.city,
        address: form.location.address,
        latitude: form.location.latitude,
        longitude: form.location.longitude,
        affected_count: Number(form.affected) || 0,
        priority: 'Medium',
        reporter_name: form.reporterName,
        reporter_contact: form.reporterContact,
      });
      navigate('/report-problem/success', { state: { trackingId: problem.tracking_id } });
    } catch {
      navigate('/report-problem/success', { state: { trackingId: undefined } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">Report a Problem</h1>
      <p className="mt-2 text-center text-sm text-slate-400">
        Help your community by reporting societal challenges. No login required.
      </p>

      <div className="mt-8">
        <Stepper steps={STEPS} currentStep={step} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 card-glow sm:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Problem Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Flooded road blocks access to village school"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Problem Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="Describe the problem in detail. What is happening? Who is affected? Since when?"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category * <span className="text-xs text-slate-500">({CATEGORIES.length} categories)</span>
              </label>
              <div className="max-h-72 overflow-y-auto pr-1">
                <CategorySelector value={form.category} onChange={(category) => setForm({ ...form, category })} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Approx. People Affected</label>
              <input
                type="number"
                value={form.affected}
                onChange={(e) => setForm({ ...form, affected: e.target.value })}
                placeholder="e.g. 500"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <LocationSelector value={form.location} onChange={(location) => setForm({ ...form, location })} />
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Upload Evidence</label>
            <FileUploader files={form.files} onChange={(files) => setForm({ ...form, files })} maxFiles={8} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {form.files.map((file, idx) =>
                file.type.startsWith('image/') ? (
                  <div key={idx} className="aspect-square overflow-hidden rounded-lg border border-white/10">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full object-cover" />
                  </div>
                ) : null
              )}
            </div>
            <p className="text-xs text-slate-500">
              Photos/videos help universities and government verify and prioritize your report faster.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Your Name (optional)</label>
              <input
                value={form.reporterName}
                onChange={(e) => setForm({ ...form, reporterName: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Contact Number / Email (optional)</label>
              <input
                value={form.reporterContact}
                onChange={(e) => setForm({ ...form, reporterContact: e.target.value })}
                placeholder="Used later to track this report by contact too"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
              />
            </div>

            <div className="overflow-hidden rounded-xl border border-brand-400/20 bg-brand-400/5">
              <div className="flex items-center gap-2 border-b border-brand-400/20 bg-brand-400/10 px-4 py-2.5">
                <CheckCircle2 size={16} className="text-brand-300" />
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">Review before submitting</p>
              </div>
              <div className="space-y-3 p-4 text-sm">
                <p className="font-semibold text-white">{form.title || 'Untitled problem'}</p>
                <p className="text-slate-400">{form.description || 'No description provided.'}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
                    <FileText size={12} /> {categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
                    <MapPin size={12} />
                    {[form.location.city, form.location.district, form.location.state].filter(Boolean).join(', ') || 'Location not set'}
                  </span>
                  <span className="rounded-full border border-white/10 px-2 py-1">{form.files.length} file(s) attached</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="py-6 text-center">
            <CheckCircle2 size={32} className="mx-auto mb-3 text-brand-300" />
            <p className="text-sm text-slate-300">You're ready to submit. Click below to confirm.</p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 1}
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-30"
          >
            Back
          </button>
          {step < 5 ? (
            <button
              onClick={next}
              className="rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-brand-400 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-lg bg-gradient-to-r from-brand-400 to-brand-500 px-6 py-2.5 text-sm font-semibold text-navy-950 shadow-glow transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit Problem'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
