import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NuruLogo } from "./NuruLogo";

const links = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[var(--navy-900)]/95 backdrop-blur">
      <div className="container-nt flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <NuruLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative py-1 text-[15px] font-medium text-white/65 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[var(--gold-500)] after:transition-transform hover:text-white"
              activeProps={{
                className: "text-white after:scale-x-100",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-gold !py-2.5 !text-[13px]">
            Request a Demo
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-[var(--navy-900)] md:hidden">
          <div className="container-nt flex flex-col gap-1 py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-white/75 hover:bg-white/5 hover:text-white"
                activeProps={{ className: "bg-white/5 text-white" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3">
              Request a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
