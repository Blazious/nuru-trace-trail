import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NuruTrace Labs" },
      {
        name: "description",
        content:
          "Founded in Nairobi to bring blockchain intelligence to Africa's regulators, investigators, and institutions.",
      },
      { property: "og:title", content: "About — NuruTrace Labs" },
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

const founders = [
  {
    name: "Founding Partner",
    title: "CEO & Forensics Lead",
    bio: "Leads the firm's investigations practice. Background in financial crime and digital forensics across Eastern Africa.",
  },
  {
    name: "Founding Partner",
    title: "Compliance & Policy",
    bio: "Heads VASP and banking compliance. Deep familiarity with Kenya's CMA, CBK, and FATF frameworks.",
  },
  {
    name: "Founding Partner",
    title: "Legal & Education",
    bio: "Practising advocate. Designs the firm's training programmes for the bar, bench, and academia.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="bg-[var(--navy-900)] py-28 text-white md:py-36">
        <div className="container-nt max-w-4xl">
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
              nations to enact a dedicated framework for virtual asset service providers. The
              VASPs Act 2025 and its 2026 regulations created a market that needed local expertise —
              not imported playbooks.
            </p>
            <p>
              We started NuruTrace to fill that gap. <strong className="text-[var(--navy-900)]">Nuru</strong>
              {" "}is Swahili for light. Combined with{" "}
              <strong className="text-[var(--navy-900)]">trace</strong>, it captures what we do:
              illuminate the on-chain activity that matters to Kenya's regulators, banks, courts,
              and investigators.
            </p>
            <p>
              Our team blends forensics, legal practice, and compliance experience earned inside
              East African institutions. We work where the work actually happens — Nairobi
              first, the continent next.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream-50)] py-24">
        <div className="container-nt">
          <div className="max-w-xl">
            <span className="eyebrow text-[var(--gold-500)]">The team</span>
            <h2 className="mt-3 text-4xl font-bold text-[var(--navy-900)] md:text-5xl">
              Founders.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {founders.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-[var(--border)] bg-white p-8"
              >
                <div className="aspect-square w-full rounded-md bg-gradient-to-br from-[var(--navy-900)] to-[var(--navy-700)] grid place-items-center">
                  <span className="font-display text-5xl text-[var(--gold-500)]">N</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--navy-900)]">{f.name}</h3>
                <p className="text-sm font-medium text-[var(--gold-500)]">{f.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--grey-700)]">{f.bio}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--navy-900)] hover:text-[var(--gold-500)]"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy-900)] py-24 text-white">
        <div className="container-nt grid gap-12 md:grid-cols-2">
          <div>
            <span className="eyebrow text-[var(--gold-500)]">Kenya context</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Why Kenya first.
            </h2>
          </div>
          <div className="space-y-5 text-white/75">
            <p>
              Kenya's <strong className="text-white">VASPs Act 2025</strong> and its 2026 regulations
              place the country at the forefront of African crypto regulation, with the CMA, CBK,
              and FRC building the infrastructure for licensed virtual asset activity.
            </p>
            <p>
              With M-Pesa as the world's most mature mobile-money rail and a young, crypto-fluent
              population, Kenya is the natural launchpad for blockchain intelligence built for the
              continent — not imported and translated.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-nt text-center">
          <p className="eyebrow text-[var(--gold-500)]">Aligned with</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-medium text-[var(--grey-700)]">
            <span>VASPs Act 2025</span>
            <span className="text-[var(--border)]">·</span>
            <span>CMA Kenya</span>
            <span className="text-[var(--border)]">·</span>
            <span>FATF Guidelines</span>
            <span className="text-[var(--border)]">·</span>
            <span>Travel Rule</span>
            <span className="text-[var(--border)]">·</span>
            <span>OSINT Standards</span>
          </div>
          <Link to="/contact" className="btn-gold mt-10">
            Meet the team
          </Link>
        </div>
      </section>
    </>
  );
}
