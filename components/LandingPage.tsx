import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";
import { site } from "@/data/site";
import { landingPages } from "@/data/landingPages";

export function LandingPage({ slug }: { slug: string }) {
  const data = landingPages[slug];
  if (!data) return null;

  // Proof strip — prefer projects matching the page's sector; fall back to the
  // overall flagship mix when a sector has too few plants to fill the grid.
  let proof = data.sector
    ? site.allProjects.filter((p) => p.sector === data.sector)
    : [...site.allProjects];
  if (proof.length < 3) proof = [...site.allProjects];
  proof = proof.sort((a, b) => b.capacity - a.capacity).slice(0, 6);

  const totalKWp = Math.round(site.allProjects.reduce((s, p) => s + p.capacity, 0));
  const related = data.related.map((s) => landingPages[s]).filter(Boolean);
  const faqHeading = data.faqHeading ?? "Frequently asked questions";

  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={
          <>
            {data.h1Lead}{" "}
            <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">
              {data.h1Highlight}
            </span>
          </>
        }
        lead={data.lead}
        meta={
          <div className="border-l border-line pl-6">
            <div className="grid gap-4">
              {site.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="text-[22px] font-semibold tracking-tight text-ink">{s.value}</div>
                  <div className="text-[12.5px] text-ink/55">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button href="/contact" variant="primary" showArrow>
                Free feasibility study
              </Button>
            </div>
          </div>
        }
      />

      {/* Overview */}
      <Section tone="paper" size="default" className="border-t border-line">
        <Container size="narrow">
          <div className="space-y-6">
            {data.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === 0 ? "text-[19px] leading-relaxed text-ink/80" : "text-[16px] leading-relaxed text-ink/65"}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section tone="sky" size="default" className="border-t border-line">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Why Sunprime</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[30px] font-semibold leading-[1.1] tracking-tight md:text-[42px]">
              {data.benefitsHeading}
            </Reveal>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm bg-line md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {data.benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.05} as="li" className="block bg-paper p-6 md:p-7">
                <span aria-hidden className="block h-px w-8 bg-amber/80" />
                <h3 className="mt-5 text-[17px] font-semibold leading-snug tracking-tight">{b.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{b.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Proof — delivered projects */}
      <Section tone="paper" size="default" className="border-t border-line">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Reveal>
                <Eyebrow>Delivered, not promised</Eyebrow>
              </Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[40px]">
                {site.allProjects.length} plants,{" "}
                <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">
                  {totalKWp.toLocaleString("en-IN")} kWp commissioned.
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">
                  From Delhi University colleges and schools to Havells, HPCL, and Indraprastha Gas — engineered, built,
                  and commissioned across Delhi NCR and beyond.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Button href="/projects" variant="secondary" showArrow>
                View all projects
              </Button>
            </Reveal>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm bg-line md:mt-14 md:grid-cols-3">
            {proof.map((p, i) => (
              <Reveal key={`${p.name}-${i}`} delay={(i % 3) * 0.05} as="li" className="block bg-paper p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink/50">{p.sector}</span>
                  <span className="text-[12px] text-ink/45">{p.commissioned}</span>
                </div>
                <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="bg-gradient-to-br from-ink to-amber-bright bg-clip-text text-[26px] font-semibold tracking-tight text-transparent">
                    {p.capacity.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[13px] text-ink/55">kWp · {p.location}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Process />

      {/* FAQ */}
      <Section tone="leaf" size="default" className="border-t border-line">
        <Container size="narrow">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[30px] font-semibold leading-[1.1] tracking-tight md:text-[40px]">
            {faqHeading}
          </Reveal>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {data.faqs.map((f, i) => (
              <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="text-[16px] font-medium leading-snug tracking-tight text-ink">{f.q}</span>
                    <Plus
                      size={18}
                      aria-hidden
                      className="mt-0.5 flex-shrink-0 text-ink/40 transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/65">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related solutions — internal linking */}
      {related.length > 0 && (
        <Section tone="paper" size="tight" className="border-t border-line">
          <Container>
            <Reveal>
              <Eyebrow>Explore related solutions</Eyebrow>
            </Reveal>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={(i % 4) * 0.04} as="li" className="bg-paper">
                  <Link
                    href={`/${r.slug}`}
                    className="group flex h-full items-center justify-between gap-3 p-5 transition-colors hover:bg-mist"
                  >
                    <span className="text-[14.5px] font-medium leading-snug tracking-tight text-ink">{r.navLabel}</span>
                    <ArrowUpRight
                      size={15}
                      className="flex-shrink-0 text-ink/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <FinalCTA />
    </>
  );
}
