import { useRef, useState } from 'react';
import { UploadCloud, X, FileText } from 'lucide-react';

interface FileUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
}

export default function FileUploader({ files, onChange, maxFiles = 5, accept = 'image/*,video/*' }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const combined = [...files, ...Array.from(newFiles)].slice(0, maxFiles);
    onChange(combined);
  };

  const removeFile = (idx: number) => {
    onChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${
          dragOver ? 'border-brand-400 bg-brand-400/10' : 'border-white/15 bg-white/5 hover:border-white/30'
        }`}
      >
        <UploadCloud size={28} className="mb-2 text-brand-300" />
        <p className="text-sm text-slate-300">
          <span className="font-medium text-brand-300">Click to upload</span> or drag and drop
        </p>
        <p className="mt-1 text-xs text-slate-500">Photos or videos as evidence (max {maxFiles} files)</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2 truncate text-slate-300">
                <FileText size={14} /> {file.name}
              </span>
              <button type="button" onClick={() => removeFile(idx)} className="text-slate-500 hover:text-red-400">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
