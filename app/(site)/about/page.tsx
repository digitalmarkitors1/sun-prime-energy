import Image from "next/image";
import { metaForPath } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/data/site";

export const metadata = metaForPath("/about");

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: site.url }, { name: "About", url: `${site.url}/about` }]} />
      <PageHero
        eyebrow="About"
        title={
          <>
            A Delhi-based solar firm,
            <br />
            <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">engineered for the long view.</span>
          </>
        }
        lead={
          <>
            Sunprime Energy Solutions designs, builds, and operates grid-tied solar PV plants for
            commercial, industrial, and institutional clients across India. We win on bankability
            and yield — not on the lowest price-per-watt.
          </>
        }
      />

      {/* Origin / story */}
      <Section tone="paper" size="default">
        <Container>
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow>What we do</Eyebrow>
              </Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[32px] font-semibold leading-[1.1] tracking-tight md:text-[44px]">
                Solar engineered like the asset it actually is.
              </Reveal>
            </div>
            <div className="md:col-span-7 space-y-6 text-[16px] leading-relaxed text-ink/70">
              <Reveal delay={0.1}>
                <p>
                  A solar plant is a twenty-five-year financial instrument. The capex is loud; the
                  yield is quiet. Most procurement decisions treat it the other way around.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Sunprime Energy Solutions works with owners who have decided to take the long view. That changes
                  how we engineer — every plant is yield-modelled before it is sold, and every BOM
                  is specified to be supportable for the warranty term.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  We are ISO 9001:2015 certified, and we run our own
                  design, EPC, and O&amp;M teams from our Nehru Place office in New Delhi.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Founder */}
      <Section tone="mist" size="loose">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <Reveal>
                <div className="relative aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-sm bg-ink/5 ring-1 ring-line">
                  <Image
                    src="/photos/founder-sk-saini.jpg"
                    alt="Lt. Mr. S.K. Saini, Founder of Sunprime Energy Solutions"
                    fill
                    sizes="240px"
                    className="object-cover object-top"
                  />
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-9">
              <Reveal>
                <Eyebrow>{site.founder.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[32px] font-semibold leading-[1.1] tracking-tight md:text-[44px]">
                {site.founder.name}
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-ink/45">
                  {site.founder.role}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-16">
            {/* Left — the story */}
            <div className="md:col-span-7 space-y-6 text-[16px] leading-relaxed text-ink/70">
              {site.founder.story.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className={i === site.founder.story.length - 1 ? "border-l-2 border-ink/15 pl-5 text-ink/60" : undefined}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Right — competencies */}
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow>Competencies in brief</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <ul className="mt-6 divide-y divide-line border-t border-line">
                  {site.founder.competencies.map((c) => (
                    <li key={c} className="py-3.5 text-[14px] leading-snug text-ink/65">
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats wall */}
      <Section tone="ink" size="default" className="grain">
        <Container>
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-0">
            {site.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i}>
                <div className={"flex flex-col px-0 md:px-8" + (i !== 0 ? " md:border-l md:border-mist/15" : "")}>
                  <div className="text-[36px] font-semibold tracking-tight md:text-[44px]">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-2 text-[12px] uppercase tracking-[0.16em] text-mist/55">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Operating principles */}
      <Section tone="mist" size="loose">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal><Eyebrow>Operating principles</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[32px] font-semibold leading-[1.1] tracking-tight md:text-[44px]">
                Four rules we engineer to.
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <ul className="divide-y divide-line">
                {site.principles.map((p, i) => (
                  <Reveal key={p.title} delay={0.05 * i} as="li" className="block py-7 first:pt-0 last:pb-0">
                    <div className="grid gap-3 md:grid-cols-12 md:gap-6">
                      <h3 className="md:col-span-5 text-[19px] font-semibold leading-snug tracking-tight">
                        {p.title}
                      </h3>
                      <p className="md:col-span-7 text-[15px] leading-relaxed text-ink/65">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Disciplines */}
      <Section tone="paper" size="default">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal><Eyebrow>How we&apos;re organised</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                Four disciplines, one accountable team.
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
                {site.disciplines.map((d, i) => (
                  <Reveal key={d.title} delay={0.05 * i} as="li" className="block bg-paper p-6 md:p-8">
                    <h3 className="text-[18px] font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{d.body}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Certifications + Office */}
      <Section tone="mist" size="default">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Reveal><Eyebrow>Credentials</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                Verified, audited, and on the record.
              </Reveal>
              <ul className="mt-10 divide-y divide-line">
                {site.certifications.map((c, i) => (
                  <Reveal key={c.code} delay={0.05 * i} as="li" className="block py-5 first:pt-0">
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="text-[16px] font-semibold tracking-tight text-ink">{c.code}</h3>
                      <p className="max-w-md text-right text-[14px] text-ink/60">{c.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5">
              <Reveal>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink/5 ring-1 ring-line">
                  <iframe
                    title="Sunprime Energy Solutions office — Devika Tower, Nehru Place, New Delhi"
                    src="https://www.google.com/maps?q=Devika%20Tower%2C%20Nehru%20Place%2C%20New%20Delhi%20110019&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div className="mt-5 text-[13.5px] leading-relaxed text-ink/65">
                  <div className="font-medium text-ink">Head office</div>
                  <div className="mt-1">
                    {site.contact.addressLine1}, {site.contact.addressLine2}<br />
                    New Delhi {site.contact.postalCode}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
