import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  Landmark,
  Building2,
  Search,
  GraduationCap,
  BookOpen,
  Boxes,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — NuruTrace Labs" },
      {
        name: "description",
        content:
          "Seven service lines spanning blockchain forensics, VASP compliance, legal education, and applied blockchain solutions.",
      },
      { property: "og:title", content: "Services — NuruTrace Labs" },
      {
        property: "og:description",
        content: "Forensics, compliance, investigations, and education for Africa's crypto economy.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Shield,
    name: "LEA Support & Investigations",
    tags: ["Police", "DCI", "DPP"],
    desc: "Training, crypto tracing support, and end-to-end investigation assistance for Kenyan and regional law enforcement agencies. From first wallet ID to prosecutable case file.",
    pricing: "Project fee + retainer",
    priority: "High Priority",
  },
  {
    icon: Landmark,
    name: "VASP Compliance",
    tags: ["Exchanges", "Custodians", "Wallets"],
    desc: "Compliance consulting for crypto businesses registering and operating under Kenya's VASPs Act 2025 and Regulations 2026. Policy drafting, registration support, ongoing monitoring.",
    pricing: "Monthly retainer",
    priority: "High Priority",
  },
  {
    icon: Building2,
    name: "Bank & MFI Compliance",
    tags: ["Banks", "MFIs", "Payments"],
    desc: "Blockchain compliance advisory for banks, microfinance institutions, and payment companies with exposure to crypto rails through M-Pesa, off-ramps, and merchant flows.",
    pricing: "Monthly retainer",
    priority: "Medium",
  },
  {
    icon: Search,
    name: "Private Investigations",
    tags: ["Law Firms", "Arbitration", "Private"],
    desc: "Crypto asset tracing, wallet forensics, and admissible forensic reports for private clients, law firms, and arbitration proceedings.",
    pricing: "Project-based",
    priority: "Medium",
  },
  {
    icon: GraduationCap,
    name: "Legal Education",
    tags: ["Lawyers", "Judges", "Bar"],
    desc: "Training programmes for lawyers, judges, and legal practitioners on crypto fundamentals, evidentiary standards, and admissibility in Kenyan and East African courts.",
    pricing: "Training package",
    priority: "High Priority",
  },
  {
    icon: BookOpen,
    name: "Research & Academia",
    tags: ["Universities", "Think Tanks"],
    desc: "Blockchain education modules and research partnerships with universities, research institutes, and policy think tanks across the region.",
    pricing: "Training package",
    priority: "Medium",
  },
  {
    icon: Boxes,
    name: "Blockchain Tech Solutions",
    tags: ["Health", "Smart City", "Supply Chain"],
    desc: "Applied blockchain solutions: health sector record integrity, smart city infrastructure, and supply chain provenance tooling tailored for African deployments.",
    pricing: "Project-based",
    priority: "Emerging",
  },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-[var(--navy-900)] py-24 text-white md:py-32">
        <div className="container-nt max-w-3xl">
          <span className="eyebrow text-[var(--gold-500)]">Our services</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">
            Seven service lines.{" "}
            <span className="text-[var(--gold-500)]">One mission.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            From courtroom-ready forensics to multi-year compliance programmes — every engagement
            is grounded in Kenyan law and African operating context.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream-50)] py-20">
        <div className="container-nt grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={s.name}
              className="group flex flex-col rounded-lg border border-[var(--border)] bg-white p-8 transition-all hover:border-[var(--navy-900)] hover:shadow-[0_20px_60px_-30px_rgba(10,22,40,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-md bg-[var(--navy-900)] text-[var(--gold-500)]">
                  <s.icon size={22} />
                </div>
                <span className="text-[10px] font-mono text-[var(--grey-700)]">
                  0{i + 1} / 07
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-[var(--border)] bg-[var(--cream-50)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--grey-700)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-[var(--navy-900)]">{s.name}</h2>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--grey-700)]">
                {s.desc}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5">
                <span className="text-xs text-[var(--grey-700)]">
                  <span className="font-semibold text-[var(--navy-900)]">{s.pricing}</span>
                </span>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-sm font-semibold text-[var(--gold-500)] hover:text-[var(--navy-900)]"
                >
                  Get in touch <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--navy-900)] py-20 text-white">
        <div className="container-nt flex flex-col items-center text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Not sure which service fits?
          </h2>
          <p className="mt-4 max-w-xl text-white/65">
            Tell us about the problem — we'll point you to the right engagement model, or honestly
            tell you if we're not the right partner.
          </p>
          <Link to="/contact" className="btn-gold mt-8">
            Start the conversation
          </Link>
        </div>
      </section>
    </>
  );
}
