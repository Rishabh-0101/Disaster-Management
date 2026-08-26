import { Check, Circle } from 'lucide-react';

export interface TimelineItem {
  label: string;
  timestamp?: string;
  complete: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-0">
      {items.map((item, idx) => (
        <div key={item.label} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                item.complete ? 'bg-brand-400 text-navy-950' : 'bg-white/10 text-slate-500'
              }`}
            >
              {item.complete ? <Check size={14} /> : <Circle size={8} fill="currentColor" />}
            </div>
            {idx < items.length - 1 && (
              <div className={`w-0.5 flex-1 ${item.complete ? 'bg-brand-400' : 'bg-white/10'}`} style={{ minHeight: 32 }} />
            )}
          </div>
          <div className="pb-8">
            <p className={`text-sm font-medium ${item.complete ? 'text-white' : 'text-slate-500'}`}>
              {item.label}
            </p>
            {item.timestamp && <p className="text-xs text-slate-500">{item.timestamp}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
