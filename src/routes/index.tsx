import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-network.jpg";
import {
  Shield,
  Scale,
  GraduationCap,
  ArrowRight,
  Landmark,
  Building2,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NuruTrace Labs — Blockchain Intelligence for Kenya & Africa" },
      {
        name: "description",
        content:
          "NuruTrace Labs helps law enforcement, financial institutions, and legal professionals in Kenya and Africa trace, analyse, and understand crypto assets.",
      },
      { property: "og:title", content: "NuruTrace Labs — Blockchain Intelligence for Africa" },
      {
        property: "og:description",
        content: "Forensics, compliance, and intelligence built for Kenya's VASPs Act 2025.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const stats = [
  { value: "VASPs Act 2025", label: "Kenya's crypto law is live" },
  { value: "KES 47B+", label: "Crypto held by Kenyan investors (est.)" },
  { value: "7", label: "Specialised service lines" },
  { value: "3", label: "Core client segments" },
];

const topServices = [
  {
    icon: Shield,
    name: "LEA Support & Investigations",
    desc: "Training, crypto tracing support, and investigation assistance for police, DCI, DPP and other agencies.",
  },
  {
    icon: Landmark,
    name: "VASP Compliance",
    desc: "Compliance consulting for crypto businesses operating under Kenya's VASPs Act 2025 and Regulations 2026.",
  },
  {
    icon: GraduationCap,
    name: "Legal Education",
    desc: "Training programmes for lawyers, judges, and legal practitioners on crypto fundamentals and admissibility.",
  },
];

const audiences = [
  {
    icon: Shield,
    title: "Law Enforcement",
    line: "Trace illicit flows. Build prosecutable cases.",
  },
  {
    icon: Building2,
    title: "Financial Institutions",
    line: "Manage crypto-rail exposure with confidence.",
  },
  {
    icon: Scale,
    title: "Legal & Academia",
    line: "Educate the next generation of crypto-fluent professionals.",
  },
];

const posts = [
  {
    tag: "Kenya Policy",
    title: "What the VASPs Act 2025 means for Kenyan businesses",
    excerpt:
      "An operator's guide to Kenya's first dedicated crypto law — what changes, who must register, and how to prepare.",
    read: "8 min read",
  },
  {
    tag: "Forensics",
    title: "How blockchain forensics works: a guide for law enforcement",
    excerpt:
      "From wallet clustering to cross-chain tracing — the techniques investigators need to understand today.",
    read: "6 min read",
  },
  {
    tag: "Compliance",
    title: "Crypto AML for African banks: a practical checklist",
    excerpt:
      "Risk scoring, sanctions screening, and transaction monitoring tuned for emerging-market exposure.",
    read: "5 min read",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy-900)] text-white">
        <img
          src={heroImage}
          alt=""
          width={1920}
          height={1080}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-900)]/70 via-[var(--navy-900)]/85 to-[var(--navy-900)]" />
        <div className="container-nt relative py-24 md:py-36">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="gold-divider" />
              <span className="eyebrow text-[var(--gold-500)]">Nairobi · Kenya</span>
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              Blockchain intelligence with{" "}
              <span className="text-[var(--gold-500)]">African context</span> and global reach.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
              NuruTrace Labs helps law enforcement, financial institutions, and legal professionals
              in Kenya and Africa trace, analyse, and understand crypto assets.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Request a Demo <ArrowRight className="ml-2" size={16} />
              </Link>
              <Link to="/services" className="btn-outline-gold">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--cream-50)] py-20">
        <div className="container-nt">
          <div className="grid gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-[var(--gold-500)] pl-5">
                <div className="font-display text-3xl font-bold text-[var(--navy-900)] md:text-4xl">
                  {s.value}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="bg-white py-24">
        <div className="container-nt">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="max-w-xl">
              <span className="eyebrow text-[var(--gold-500)]">What we do</span>
              <h2 className="mt-3 text-4xl font-bold text-[var(--navy-900)] md:text-5xl">
                Forensics, compliance, intelligence.
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-semibold text-[var(--navy-900)] underline-offset-4 hover:underline"
            >
              View all 7 services →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {topServices.map((s) => (
              <div
                key={s.name}
                className="group rounded-lg border border-[var(--border)] bg-white p-8 transition-all hover:border-[var(--navy-900)] hover:shadow-[0_20px_60px_-30px_rgba(10,22,40,0.4)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-md bg-[var(--navy-900)] text-[var(--gold-500)]">
                  <s.icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--navy-900)]">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">{s.desc}</p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--gold-500)] hover:text-[var(--navy-900)]"
                >
                  Learn more <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-[var(--navy-900)] py-24 text-white">
        <div className="container-nt">
          <div className="max-w-xl">
            <span className="eyebrow text-[var(--gold-500)]">Who we serve</span>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Built for those on the front line.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="group rounded-lg border border-white/10 p-8 transition-all hover:border-[var(--gold-500)]"
              >
                <a.icon className="text-[var(--gold-500)]" size={28} />
                <h3 className="mt-6 text-2xl font-semibold">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{a.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-[var(--border)] bg-white py-12">
        <div className="container-nt">
          <p className="eyebrow text-center text-[var(--grey-700)]">
            Built for Kenya's VASPs Act 2025 · Aligned with FATF guidelines · CMA-aware compliance ·
            OSINT-grade forensics
          </p>
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-[var(--cream-50)] py-24">
        <div className="container-nt">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="max-w-xl">
              <span className="eyebrow text-[var(--gold-500)]">Insights</span>
              <h2 className="mt-3 text-4xl font-bold text-[var(--navy-900)] md:text-5xl">
                Field notes from the chain.
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-sm font-semibold text-[var(--navy-900)] underline-offset-4 hover:underline"
            >
              All articles →
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <article
                key={p.title}
                className="flex flex-col rounded-lg border border-[var(--border)] bg-white p-7 transition-all hover:border-[var(--navy-900)]"
              >
                <span className="self-start rounded bg-[var(--navy-900)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-500)]">
                  {p.tag}
                </span>
                <h3 className="mt-5 text-xl font-semibold leading-snug text-[var(--navy-900)]">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--grey-700)]">
                  {p.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-[var(--grey-700)]">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen size={12} /> {p.read}
                  </span>
                  <Link
                    to="/blog"
                    className="font-semibold text-[var(--gold-500)] hover:text-[var(--navy-900)]"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--navy-900)] py-24 text-white">
        <div className="container-nt text-center">
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Ready to <span className="text-[var(--gold-500)]">trace the chain?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/65">
            Talk to our team about your investigation, compliance programme, or training need.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-gold">
              Request a Demo
            </Link>
            <a
              href="mailto:info@nurutrace.co.ke"
              className="btn-outline-gold"
            >
              info@nurutrace.co.ke
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
