import * as Icons from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';

interface CategorySelectorProps {
  value: string;
  onChange: (categoryId: string) => void;
}

export default function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CATEGORIES.map((cat) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Icon = (Icons as any)[cat.icon] || Icons.CircleHelp;
        const isSelected = value === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition ${
              isSelected
                ? 'border-brand-400 bg-brand-400/10 text-white'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
            }`}
          >
            <Icon size={22} className={isSelected ? 'text-brand-300' : 'text-slate-400'} />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
