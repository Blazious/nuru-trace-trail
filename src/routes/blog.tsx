import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — NuruTrace Labs" },
      {
        name: "description",
        content:
          "Field notes on blockchain forensics, Kenya VASP compliance, and crypto investigations across Africa.",
      },
      { property: "og:title", content: "Insights — NuruTrace Labs" },
      {
        property: "og:description",
        content: "Briefings on Kenya's VASPs Act, crypto investigations, and forensic methodology.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = ["All", "Forensics", "Compliance", "Kenya Policy", "Education", "Investigations"];

const posts = [
  {
    tag: "Kenya Policy",
    title: "What the VASPs Act 2025 means for Kenyan businesses",
    excerpt:
      "An operator's guide to Kenya's first dedicated crypto law: registration triggers, timelines, and what compliance teams should be doing today.",
    author: "NuruTrace Editorial",
    date: "Jun 2026",
    read: "8 min",
    featured: true,
  },
  {
    tag: "Forensics",
    title: "How blockchain forensics works: a guide for law enforcement",
    excerpt:
      "Wallet clustering, cross-chain bridges, mixers, and DEX traces — the techniques investigators need to understand.",
    author: "NuruTrace Editorial",
    date: "Jun 2026",
    read: "6 min",
  },
  {
    tag: "Compliance",
    title: "Crypto AML for African banks: a practical checklist",
    excerpt:
      "Risk scoring, sanctions screening, and transaction monitoring tuned to emerging-market exposure patterns.",
    author: "NuruTrace Editorial",
    date: "Jun 2026",
    read: "5 min",
  },
];

function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-[var(--navy-900)] py-24 text-white md:py-32">
        <div className="container-nt max-w-3xl">
          <span className="eyebrow text-[var(--gold-500)]">Insights</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">
            Field notes from the chain.
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Briefings on Kenyan policy, forensic methodology, and the operational realities of
            running compliance in Africa's crypto economy.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-white py-6">
        <div className="container-nt flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                i === 0
                  ? "bg-[var(--navy-900)] text-white"
                  : "border border-[var(--border)] text-[var(--grey-700)] hover:border-[var(--navy-900)] hover:text-[var(--navy-900)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-[var(--cream-50)] py-20">
        <div className="container-nt">
          {/* Featured */}
          <Link
            to="/blog"
            className="group grid gap-10 rounded-lg border border-[var(--border)] bg-white p-8 transition-all hover:border-[var(--navy-900)] md:grid-cols-[1.2fr_1fr] md:p-12"
          >
            <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--navy-700)] md:aspect-auto" />
            <div className="flex flex-col justify-center">
              <span className="self-start rounded bg-[var(--gold-500)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--navy-900)]">
                Featured · {featured.tag}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-[var(--navy-900)] md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-[var(--grey-700)]">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-[var(--grey-700)]">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen size={12} /> {featured.read}
                </span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <Link
                to="/blog"
                key={p.title}
                className="flex flex-col rounded-lg border border-[var(--border)] bg-white p-8 transition-all hover:border-[var(--navy-900)] hover:shadow-[0_20px_60px_-30px_rgba(10,22,40,0.3)]"
              >
                <span className="self-start rounded bg-[var(--navy-900)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-500)]">
                  {p.tag}
                </span>
                <h3 className="mt-5 text-2xl font-semibold leading-snug text-[var(--navy-900)]">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--grey-700)]">
                  {p.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-[var(--grey-700)]">
                  <span>{p.author} · {p.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <BookOpen size={12} /> {p.read}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy-900)] py-20 text-white">
        <div className="container-nt grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Get briefings in your inbox.
            </h2>
            <p className="mt-3 text-white/65">
              Occasional notes on Kenyan crypto policy, enforcement trends, and forensic technique.
              No spam.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@organisation.co.ke"
              className="flex-1 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold-500)] focus:outline-none"
            />
            <button className="btn-gold whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
