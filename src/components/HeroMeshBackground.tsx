import heroImage from "@/assets/hero-network.jpg";

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
      <div className="pointer-events-none absolute right-[12%] top-[28%] hidden h-2 w-2 rounded-full bg-[var(--gold-500)]/70 shadow-[0_0_24px_rgba(245,166,35,0.45)] md:block" />
      <div className="pointer-events-none absolute right-[24%] top-[62%] hidden h-1.5 w-1.5 rounded-full bg-white/45 shadow-[0_0_18px_rgba(255,255,255,0.3)] md:block" />
      <div className="pointer-events-none absolute right-[38%] top-[44%] hidden h-1 w-1 rounded-full bg-[var(--gold-500)]/55 shadow-[0_0_16px_rgba(245,166,35,0.35)] lg:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-900)]/75 via-[var(--navy-900)]/88 to-[var(--navy-900)]" />
    </>
  );
}
