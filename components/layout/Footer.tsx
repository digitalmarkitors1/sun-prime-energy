import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-mist">
      {/* Photo accent header */}
      <div className="relative h-[200px] w-full overflow-hidden md:h-[280px]">
        <Image
          src="/photos/aerial-utility-farm.jpg"
          alt="Aerial view of a utility-scale solar PV plant engineered by Sun Prime Energy Solutions in India"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/65 to-ink" />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-7">
            <div className="flex items-center gap-3 text-mist">
              <span aria-hidden className="h-px w-12 bg-amber" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-mist/70">
                Engineering renewable infrastructure across India
              </span>
            </div>
          </Container>
        </div>
      </div>

      <div className="grain">
        <Container className="pt-16">
          {/* Brand zone */}
          <div className="grid items-end gap-12 border-b border-mist/10 pb-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Logo tone="mist" size="lg" />
              <h3 className="mt-7 text-balance text-[32px] font-semibold leading-[1.05] tracking-tight md:text-[44px]">
                Solar engineered to outlive
                <br />
                <span className="bg-gradient-to-r from-amber-bright via-sun to-amber bg-clip-text text-transparent">
                  the expectations on day one.
                </span>
              </h3>
            </div>
            <div className="md:col-span-5">
              <p className="max-w-md text-[15px] leading-relaxed text-mist/65">
                Sun Prime Energy Solutions designs, builds, and operates grid-tied solar PV plants for commercial,
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

          {/* Nav zone */}
          <div className="grid gap-12 border-b border-mist/10 py-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">
                Capabilities
              </h4>
              <ul className="mt-6 space-y-3.5 text-[14.5px] text-mist/80">
                {site.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services#${s.slug}`}
                      className="group inline-flex items-center gap-2 transition-colors hover:text-amber-bright"
                    >
                      <span aria-hidden className="h-px w-3 bg-mist/30 transition-all group-hover:w-5 group-hover:bg-amber" />
                      <span>{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">
                Industries
              </h4>
              <ul className="mt-6 space-y-3.5 text-[14.5px] text-mist/80">
                {site.industries.slice(0, 6).map((ind) => (
                  <li key={ind.slug}>
                    <Link href="/services" className="transition-colors hover:text-amber-bright">
                      {ind.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">
                Company
              </h4>
              <ul className="mt-6 space-y-3.5 text-[14.5px] text-mist/80">
                <li><Link href="/about" className="transition-colors hover:text-amber-bright">About Sun Prime Energy Solutions</Link></li>
                <li><Link href="/projects" className="transition-colors hover:text-amber-bright">Projects</Link></li>
                <li><Link href="/insights" className="transition-colors hover:text-amber-bright">Insights</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-amber-bright">Contact</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist/40">
                Service areas
              </h4>
              <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[13.5px] text-mist/70">
                {site.serviceAreas.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Credentials zone */}
          <div className="grid gap-5 border-b border-mist/10 py-12 md:grid-cols-3">
            {site.certifications.map((c) => (
              <div
                key={c.code}
                className="group relative flex h-full items-start gap-4 overflow-hidden rounded-md border border-mist/12 bg-ink-soft/50 p-5 transition-all hover:-translate-y-0.5 hover:border-green-bright/50 hover:bg-ink-soft/70"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-green-bright via-amber to-sun transition-transform duration-700 group-hover:scale-x-100"
                />
                <span aria-hidden className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-bright shadow-[0_0_12px_rgba(43,169,104,0.7)]" />
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
          <div className="grid gap-10 py-12 md:grid-cols-3 md:gap-8">
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
          <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-mist/10 py-7 md:flex-row md:items-center">
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
            <div className="flex items-center gap-5">
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
                href={`mailto:${site.contact.email}`}
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mist/15 text-mist/60 transition-all hover:border-amber-bright hover:text-amber-bright"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
