import heroImage from "@/assets/hero-network.jpg";

export function HeroMeshBackground() {
  return (
    <>
      <img
        src={heroImage}
        alt=""
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-900)]/75 via-[var(--navy-900)]/88 to-[var(--navy-900)]" />
    </>
  );
}
