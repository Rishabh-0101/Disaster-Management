import { Check } from 'lucide-react';

interface Step {
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 1-indexed
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isComplete = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                  isComplete
                    ? 'border-brand-400 bg-brand-400 text-navy-950'
                    : isActive
                    ? 'border-brand-400 text-brand-300'
                    : 'border-white/20 text-slate-500'
                }`}
              >
                {isComplete ? <Check size={16} /> : stepNum}
              </div>
              <span
                className={`text-xs font-medium ${isActive || isComplete ? 'text-white' : 'text-slate-500'}`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 ${isComplete ? 'bg-brand-400' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
