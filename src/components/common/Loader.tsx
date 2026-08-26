interface LoaderProps {
  size?: number;
  label?: string;
  fullScreen?: boolean;
}

export default function Loader({ size = 32, label, fullScreen = false }: LoaderProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className="animate-spin rounded-full border-2 border-white/20 border-t-brand-400"
        style={{ width: size, height: size }}
      />
      {label && <p className="text-sm text-slate-400">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">{spinner}</div>
    );
  }

  return <div className="flex w-full items-center justify-center py-12">{spinner}</div>;
}
