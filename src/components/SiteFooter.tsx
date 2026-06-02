import { Link } from "@tanstack/react-router";
import { Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy-900)] text-white">
      <div className="container-nt grid gap-12 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold">
              Nuru<span className="text-[var(--gold-500)]">Trace</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">Labs</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Blockchain intelligence with African context and global reach.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white/70 transition hover:border-[var(--gold-500)] hover:text-[var(--gold-500)]"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:info@nurutrace.co.ke"
              aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white/70 transition hover:border-[var(--gold-500)] hover:text-[var(--gold-500)]"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="eyebrow text-[var(--gold-500)]">Navigate</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/services", label: "Services" },
              { to: "/about", label: "About" },
              { to: "/blog", label: "Insights" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/70 transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-[var(--gold-500)]">Contact</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>Nairobi, Kenya</li>
            <li>
              <a className="hover:text-white" href="mailto:info@nurutrace.co.ke">
                info@nurutrace.co.ke
              </a>
            </li>
            <li className="font-mono text-xs text-white/50">nurutrace.co.ke</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--gold-500)]/30">
        <div className="container-nt flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} NuruTrace Labs Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-white">Privacy</Link>
            <Link to="/" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
