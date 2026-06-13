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
      <defs>
        <radialGradient id="nuru-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFC94D" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#FFC94D" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFD470" />
          <stop offset="100%" stop-color="#F5A623" />
        </linearGradient>
      </defs>

      {/* Central Glow (representing Nuru / Light) */}
      <circle cx="64" cy="64" r="32" fill="url(#nuru-glow)" />

      {/* Network Links (3D Isometric Cube / Graph) */}
      <polygon
        points="64,20 102,42 102,86 64,108 26,86 26,42"
        fill="none"
        stroke="url(#link-grad)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M64,64 L64,20 M64,64 L102,86 M64,64 L26,86"
        stroke="url(#link-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Network Nodes (Vertices) */}
      <circle cx="64" cy="20" r="5" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="102" cy="42" r="5" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="102" cy="86" r="5" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="64" cy="108" r="5" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="26" cy="86" r="5" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="26" cy="42" r="5" fill="#FFFFFF" stroke="#F5A623" strokeWidth="2.5" />

      {/* Central Glowing Node */}
      <circle cx="64" cy="64" r="8" fill="#FFC94D" stroke="#F5A623" strokeWidth="3" />
    </svg>
  );
}
