import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Linkedin, Lock, Check } from "lucide-react";
import { HeroMeshBackground } from "@/components/HeroMeshBackground";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Request a Demo — NuruTrace Labs" },
      {
        name: "description",
        content:
          "Talk to NuruTrace Labs about an investigation, compliance programme, or training engagement.",
      },
      { property: "og:title", content: "Request a Demo — NuruTrace Labs" },
      {
        property: "og:description",
        content: "Reach our Nairobi team for blockchain intelligence, compliance, and training.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const serviceOptions = [
  "LEA Support & Investigations",
  "VASP Compliance",
  "Bank & MFI Compliance",
  "Private Investigations",
  "Legal Education",
  "Research & Academia",
  "Blockchain Tech Solutions",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--navy-900)] py-24 text-white md:py-32">
        <HeroMeshBackground />
        <div className="container-nt relative max-w-3xl">
          <span className="eyebrow text-[var(--gold-500)]">Get in touch</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">
            Request a <span className="text-[var(--gold-500)]">demo.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Tell us about your investigation, compliance need, or training programme. We respond
            within one business day.
          </p>
        </div>
      </section>

      <section className="bg-[var(--cream-50)] py-20">
        <div className="container-nt grid gap-12 md:grid-cols-[2fr_1fr]">
          <div className="rounded-lg border border-[var(--border)] bg-white p-8 md:p-12">
            {submitted ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--gold-500)] text-[var(--navy-900)]">
                  <Check size={26} />
                </div>
                <h2 className="mt-6 font-display text-3xl font-bold text-[var(--navy-900)]">
                  Message received.
                </h2>
                <p className="mt-3 max-w-md text-[var(--grey-700)]">
                  Thanks for reaching out — we'll be in touch within one business day at the email
                  you provided.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Organisation" name="org" required />
                </div>
                <Field label="Email" name="email" type="email" required />

                <div>
                  <label className="eyebrow mb-2 block text-[var(--grey-700)]">
                    Service interested in
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--navy-900)] focus:border-[var(--navy-900)] focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a service…
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="eyebrow mb-2 block text-[var(--grey-700)]">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Briefly describe what you're working on."
                    className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--navy-900)] focus:border-[var(--navy-900)] focus:outline-none"
                  />
                </div>

                <button type="submit" className="btn-gold w-full sm:w-auto">
                  Send message
                </button>

                <p className="flex items-center gap-2 pt-2 text-xs text-[var(--grey-700)]">
                  <Lock size={12} /> Your information is kept confidential and never shared.
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-8">
            <InfoBlock icon={Mail} label="Email">
              <a
                href="mailto:info@nurutrace.co.ke"
                className="font-medium text-[var(--navy-900)] hover:text-[var(--gold-500)]"
              >
                info@nurutrace.co.ke
              </a>
            </InfoBlock>
            <InfoBlock icon={MapPin} label="Office">
              Nairobi, Kenya
              <br />
              <span className="text-xs text-[var(--grey-700)]">By appointment</span>
            </InfoBlock>
            <InfoBlock icon={Linkedin} label="LinkedIn">
              <a
                href="#"
                className="font-medium text-[var(--navy-900)] hover:text-[var(--gold-500)]"
              >
                /company/nurutrace-labs
              </a>
            </InfoBlock>

            <div className="rounded-lg border border-[var(--gold-500)]/30 bg-[var(--navy-900)] p-6 text-white">
              <p className="eyebrow text-[var(--gold-500)]">For urgent matters</p>
              <p className="mt-3 text-sm text-white/75">
                Active law-enforcement investigations involving time-sensitive on-chain movement:
                contact us directly and flag the email subject with{" "}
                <span className="font-mono text-[var(--gold-500)]">[URGENT-LEA]</span>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block text-[var(--grey-700)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--navy-900)] focus:border-[var(--navy-900)] focus:outline-none"
      />
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[var(--gold-500)]" />
        <span className="eyebrow text-[var(--grey-700)]">{label}</span>
      </div>
      <div className="mt-2 text-[15px] leading-relaxed text-[var(--grey-700)]">{children}</div>
    </div>
  );
}
