import heroImage from "@/assets/hero-network.jpg";

const nodes = [
  { cx: 68, cy: 18, r: 2.4, delay: "0s" },
  { cx: 78, cy: 34, r: 3.2, delay: "0.5s" },
  { cx: 66, cy: 52, r: 2.8, delay: "1s" },
  { cx: 84, cy: 58, r: 2.3, delay: "1.5s" },
  { cx: 56, cy: 70, r: 2.5, delay: "0.25s" },
  { cx: 74, cy: 78, r: 3, delay: "0.9s" },
  { cx: 90, cy: 76, r: 1.8, delay: "1.8s" },
];

export function HeroMeshBackground() {
  return (
    <>
      <img
        src={heroImage}
        alt=""
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-30"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="mesh-motion pointer-events-none absolute inset-y-0 right-0 hidden h-full w-full opacity-80 md:block"
      >
        <defs>
          <linearGradient id="mesh-line-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="48%" stopColor="rgba(245,166,35,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
        </defs>

        <g className="mesh-grid">
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 9 }).map((__, column) => (
              <circle
                key={`${row}-${column}`}
                cx={40 + column * 7}
                cy={14 + row * 12}
                r="0.28"
                className="fill-white/25"
              />
            )),
          )}
        </g>

        <path
          d="M56 70 V52 H66 M66 52 V34 H78 M78 34 H90 V58 H84 M74 78 V58 H84"
          className="mesh-line"
          pathLength="1"
        />
        <path d="M66 52 C66 38 78 28 90 36" className="mesh-orbit" pathLength="1" />
        <path d="M56 70 H74 V78 H90" className="mesh-line mesh-line-delayed" pathLength="1" />

        {nodes.map((node) => (
          <g key={`${node.cx}-${node.cy}`}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r + 1.8}
              className="mesh-node-ring"
              style={{ animationDelay: node.delay }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className="mesh-node"
              style={{ animationDelay: node.delay }}
            />
          </g>
        ))}

        <circle cx="78" cy="58" r="16" className="mesh-large-ring" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-900)]/75 via-[var(--navy-900)]/88 to-[var(--navy-900)]" />
    </>
  );
}
