import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Globe, Search, GraduationCap } from "lucide-react";
import { HeroMeshBackground } from "@/components/HeroMeshBackground";

const pillars = [
  {
    icon: ShieldCheck,
    title: "On-Chain Truth",
    description: "We rely on immutable ledger data. Every report, analysis, and testimony we deliver is rooted in cryptographic facts and verifiable blockchain transactions.",
  },
  {
    icon: Globe,
    title: "Local Context",
    description: "Global playbooks fail when applied to local financial realities. We build intelligence designed specifically for East Africa's regulatory frameworks and mobile money integrations.",
  },
  {
    icon: Search,
    title: "Actionable Clarity",
    description: "We bridge the gap between complex blockchain code and standard legal or compliance workflows. We deliver insights that regulators, courts, and institutions can act upon immediately.",
  },
  {
    icon: GraduationCap,
    title: "Capacity Building",
    description: "We don't just solve cases; we empower the ecosystem. By training regional investigators, regulators, and legal professionals, we build long-term sustainable expertise.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - NuruTrace Labs" },
      {
        name: "description",
        content:
          "Founded in Nairobi to bring blockchain intelligence to Africa's regulators, investigators, and institutions.",
      },
      { property: "og:title", content: "About - NuruTrace Labs" },
      {
        property: "og:description",
        content: "Every financial crime leaves a trace. Our job is to find it.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--navy-900)] py-28 text-white md:py-36">
        <HeroMeshBackground />
        <div className="container-nt relative max-w-4xl">
          <span className="eyebrow text-[var(--gold-500)]">Our mission</span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            Every financial crime leaves a trace.{" "}
            <span className="text-[var(--gold-500)]">Our job is to find it.</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-nt grid gap-16 md:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow text-[var(--gold-500)]">Founding story</span>
            <div className="gold-divider mt-4" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-[var(--grey-700)]">
            <p>
              NuruTrace Labs was founded in 2026, the moment Kenya became one of the first African
              nations to enact a dedicated framework for virtual asset service providers. The VASPs
              Act 2025 and its 2026 regulations created a market that needed local expertise - not
              imported playbooks.
            </p>
            <p>
              We started NuruTrace to fill that gap.{" "}
              <strong className="text-[var(--navy-900)]">Nuru</strong> is Swahili for light.
              Combined with <strong className="text-[var(--navy-900)]">trace</strong>, it captures
              what we do: illuminate the on-chain activity that matters to Kenya's regulators,
              banks, courts, and investigators.
            </p>
            <p>
              Our team blends forensics, legal practice, and compliance experience earned inside
              East African institutions. We work where the work actually happens - Nairobi first,
              the continent next.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream-50)] py-24">
        <div className="container-nt">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <span className="eyebrow text-[var(--gold-500)]">Our Principles</span>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.15] text-[var(--navy-900)] md:text-5xl">
                The foundation of blockchain intelligence.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--grey-700)]">
                At NuruTrace Labs, we guide our forensic investigations and regulatory compliance with strict operating principles built for Africa's digital asset frontier.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="group rounded-lg border border-[var(--border)] bg-white p-8"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--navy-900)]/5 text-[var(--navy-900)] group-hover:bg-[var(--gold-500)] group-hover:text-[var(--navy-900)] transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[var(--navy-900)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--navy-900)] py-24 text-white">
        <HeroMeshBackground />
        <div className="container-nt relative grid gap-12 md:grid-cols-2">
          <div>
            <span className="eyebrow text-[var(--gold-500)]">Kenya context</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Why Kenya first.</h2>
          </div>
          <div className="space-y-5 text-white/75">
            <p>
               Kenya's <strong className="text-white">VASPs Act 2025</strong> and its 2026
               regulations place the country at the forefront of African crypto regulation, with the
               CMA, CBK, and FRC building the infrastructure for licensed virtual asset activity.
            </p>
            <p>
               With M-Pesa as the world's most mature mobile-money rail and a young, crypto-fluent
               population, Kenya is the natural launchpad for blockchain intelligence built for the
               continent - not imported and translated.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-nt text-center">
          <p className="eyebrow text-[var(--gold-500)]">Aligned with</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-medium text-[var(--grey-700)]">
            <span>VASPs Act 2025</span>
            <span className="text-[var(--border)]">/</span>
            <span>CMA Kenya</span>
            <span className="text-[var(--border)]">/</span>
            <span>FATF Guidelines</span>
            <span className="text-[var(--border)]">/</span>
            <span>Travel Rule</span>
            <span className="text-[var(--border)]">/</span>
            <span>OSINT Standards</span>
          </div>
          <Link to="/contact" className="btn-gold mt-10">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
