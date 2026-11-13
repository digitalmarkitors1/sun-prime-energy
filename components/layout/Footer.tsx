import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/data/site";
import { landingPages } from "@/data/landingPages";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-mist">
      <div className="grain border-t border-mist/10">
        <Container className="pt-12">
          {/* Tagline */}
          <div className="mb-8 flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-amber" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-mist/55">
              Engineering renewable infrastructure across India
            </span>
          </div>

          {/* Brand zone */}
          <div className="grid items-end gap-6 border-b border-mist/10 pb-9 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Logo tone="mist" size="lg" />
              <h3 className="mt-5 text-balance text-[20px] font-semibold leading-[1.15] tracking-tight md:text-[26px]">
                Solar engineered to outlive{" "}
                <span className="bg-gradient-to-r from-amber-bright via-sun to-amber bg-clip-text text-transparent">
                  the expectations on day one.
                </span>
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="max-w-md text-[14px] leading-relaxed text-mist/65">
                Sunprime Energy Solutions designs, builds, and operates grid-tied solar PV plants for commercial,
                industrial, and institutional clients across India — from feasibility through
                twenty-five years of operations.
              </p>
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-green-bright/30 bg-green-bright/[0.06] px-3.5 py-1.5">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-bright opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-bright" />
                </span>
                <span className="text-[12px] font-medium tracking-tight text-green-soft">
                  Renewable-energy infrastructure partner
                </span>
              </div>
            </div>
          </div>

          {/* Solutions zone */}
          <div className="border-b border-mist/10 py-9">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">
              Solar solutions
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] text-mist/80 sm:grid-cols-3 lg:grid-cols-4">
              {Object.values(landingPages).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-amber-bright"
                  >
                    <span aria-hidden className="h-px w-3 bg-mist/30 transition-all group-hover:w-5 group-hover:bg-amber" />
                    <span>{p.navLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials zone */}
          <div className="grid gap-4 border-b border-mist/10 py-8 md:grid-cols-3">
            {site.certifications.map((c) => (
              <div
                key={c.code}
                className="group relative flex h-full items-start gap-4 overflow-hidden rounded-md border border-mist/12 bg-ink-soft/50 p-4 transition-all hover:-translate-y-0.5 hover:border-green-bright/50 hover:bg-ink-soft/70"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-blue-bright via-green-bright to-amber transition-transform duration-700 group-hover:scale-x-100"
                />
                <span aria-hidden className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-bright shadow-[0_0_12px_rgba(59,130,246,0.7)]" />
                <div className="flex flex-col">
                  <div className="text-[14.5px] font-semibold leading-tight tracking-tight text-mist">
                    {c.code}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-relaxed text-mist/55">
                    {c.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact strip */}
          <div className="grid gap-6 py-8 md:grid-cols-3 md:gap-8">
            <div className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 flex-shrink-0 text-amber" />
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">Head office</div>
                <address className="mt-2 not-italic text-[14.5px] leading-relaxed text-mist/85">
                  {site.contact.addressLine1}<br />
                  {site.contact.addressLine2}<br />
                  New Delhi {site.contact.postalCode}
                </address>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail size={18} className="mt-1 flex-shrink-0 text-amber" />
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">Email</div>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-2 block text-[14.5px] font-medium tracking-tight text-mist transition-colors hover:text-amber-bright"
                >
                  {site.contact.email}
                </a>
                <p className="mt-2 text-[12.5px] leading-relaxed text-mist/55">{site.contact.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone size={18} className="mt-1 flex-shrink-0 text-amber" />
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">Call</div>
                <a
                  href={site.contact.phoneHref}
                  className="mt-2 block text-[14.5px] font-medium tracking-tight text-mist transition-colors hover:text-amber-bright"
                >
                  {site.contact.phone}
                </a>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-amber-bright transition-colors hover:text-amber"
                >
                  Request a feasibility study
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-mist/10 py-6 md:flex-row md:items-center">
            <div className="flex flex-col gap-1.5 text-[12px] text-mist/45 md:flex-row md:items-center md:gap-3">
              <p>© {year} {site.legalName}. All rights reserved.</p>
              <span aria-hidden className="hidden h-3 w-px bg-mist/15 md:inline-block" />
              <p>
                Designed and developed by{" "}
                <a
                  href="https://digitalmarkitors.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-mist/75 underline-offset-4 transition-colors hover:text-amber-bright hover:underline"
                >
                  Digital Markitors
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mist/15 text-mist/60 transition-all hover:border-amber-bright hover:text-amber-bright"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mist/15 text-mist/60 transition-all hover:border-amber-bright hover:text-amber-bright"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94z" />
                </svg>
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mist/15 text-mist/60 transition-all hover:border-amber-bright hover:text-amber-bright"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.63.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.9 4.9 0 01-1.15 1.77c-.55.55-1.11.9-1.77 1.15-.63.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.25-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.31.88-.35 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.21 1.5.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.31 1.86.35 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.31-.88.35-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.21-1.5-.35-1.86a3.1 3.1 0 00-.75-1.15 3.1 3.1 0 00-1.15-.75c-.36-.14-.88-.31-1.86-.35-1.05-.05-1.37-.06-4.04-.06zm0 3.06A5.14 5.14 0 1112 17.14 5.14 5.14 0 0112 6.86zm0 1.8a3.34 3.34 0 100 6.68 3.34 3.34 0 000-6.68zm5.34-.94a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
