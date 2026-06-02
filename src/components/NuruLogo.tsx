import { cn } from "@/lib/utils";

type NuruLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

export function NuruLogo({ className, markClassName, showWordmark = true }: NuruLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <NuruLogoMark className={markClassName} />
      {showWordmark && (
        <span className="inline-flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-white">
            Nuru<span className="text-[var(--gold-500)]">Trace</span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">
            Labs
          </span>
        </span>
      )}
    </span>
  );
}

export function NuruLogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label="NuruTrace Labs logo"
      className={cn("h-9 w-9 shrink-0", className)}
    >
      <g fill="none" stroke="#FFC326" strokeLinecap="round" strokeWidth="8">
        <path d="M64 13v28" />
        <path d="M64 87v28" />
        <path d="M13 64h28" />
        <path d="M87 64h28" />
        <path d="M28 28l20 20" />
        <path d="M80 80l20 20" />
        <path d="M100 28 80 48" />
        <path d="M48 80l-20 20" />
      </g>
      <g fill="#FFC326">
        <circle cx="64" cy="8" r="8" />
        <circle cx="64" cy="120" r="8" />
        <circle cx="8" cy="64" r="8" />
        <circle cx="120" cy="64" r="8" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="104" cy="104" r="8" />
        <circle cx="104" cy="24" r="8" />
        <circle cx="24" cy="104" r="8" />
      </g>
      <circle cx="64" cy="64" r="32" fill="#3F82F4" />
      <circle cx="64" cy="64" r="15" fill="#FFC326" />
    </svg>
  );
}
