import Image from "next/image";
import { metaForPath } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";
import { site } from "@/data/site";

export const metadata = metaForPath("/services");

export default function ServicesPage() {
  const flagship = [...site.allProjects].sort((a, b) => b.capacity - a.capacity).slice(0, 6);
  const totalKWp = Math.round(site.allProjects.reduce((s, p) => s + p.capacity, 0));
  const count = site.allProjects.length;
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Four capabilities,
            <br />
            <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">one accountable team.</span>
          </>
        }
        lead="Design, EPC, operations, and compliance handled in-house — so the proposal you approve is the plant we commission and the SLA we run."
        meta={
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-l border-line pl-6 text-[13.5px] md:grid-cols-1 md:gap-y-3">
            {site.serviceDetails.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="group flex items-center gap-3 text-ink/70 transition-colors hover:text-ink"
                >
                  <span aria-hidden className="h-px w-5 bg-ink/30 transition-all group-hover:w-8 group-hover:bg-amber" />
                  <span className="font-medium">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      {/* Service deep-dives */}
      {site.serviceDetails.map((s, i) => (
        <Section
          key={s.slug}
          tone={i % 2 === 0 ? "sun" : "leaf"}
          size="loose"
          className="border-t border-line"
        >
          <a id={s.slug} className="sr-only" aria-hidden>
            {s.title}
          </a>
          <Container>
            <div className="grid gap-12 md:grid-cols-12 md:gap-14">
              <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Reveal>
                  <span aria-hidden className="block h-px w-10 bg-amber/80" />
                </Reveal>
                <Reveal delay={0.05} as="h2" className="mt-6 text-balance text-[36px] font-semibold leading-[1.05] tracking-tight md:text-[52px]">
                  {s.title}
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink/65">{s.lead}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <dl className="mt-10 grid grid-cols-2 gap-y-5 border-t border-line pt-6">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Typical scale</dt>
                      <dd className="mt-1.5 text-[15px] font-medium tracking-tight">{s.typical}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Timeline</dt>
                      <dd className="mt-1.5 text-[15px] font-medium tracking-tight">{s.timeline}</dd>
                    </div>
                  </dl>
                </Reveal>
                <Reveal delay={0.2}>
                  <h3 className="mt-10 text-[12px] font-medium uppercase tracking-[0.16em] text-ink/55">
                    What&apos;s included
                  </h3>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {s.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-[14.5px] text-ink/75">
                        <span aria-hidden className="mt-2 h-px w-3 bg-ink/35" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.25}>
                  <h3 className="mt-10 text-[12px] font-medium uppercase tracking-[0.16em] text-ink/55">
                    Best suited for
                  </h3>
                  <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink/70">{s.suited}</p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="mt-10">
                    <Button href="/contact" variant="primary" showArrow>
                      Discuss this capability
                    </Button>
                  </div>
                </Reveal>
              </div>

              <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <Reveal delay={0.05}>
                  <div className="sticky top-24 aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink/5">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* Selected projects */}
      <Section tone="sky" size="default" className="border-t border-line">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Reveal><Eyebrow>Selected projects</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[32px] font-semibold leading-[1.1] tracking-tight md:text-[44px]">
                {count} plants,{" "}
                <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">
                  {totalKWp.toLocaleString("en-IN")} kWp delivered.
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">
                  From Delhi University colleges and schools to Havells, HPCL, and Indraprastha Gas —
                  engineered, built, and commissioned across Delhi NCR and Rajasthan.
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
            {flagship.map((p, i) => (
              <Reveal key={`${p.name}-${i}`} delay={(i % 3) * 0.05} as="li" className="block bg-paper p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink/50">{p.sector}</span>
                  <span className="text-[12px] text-ink/45">{p.commissioned}</span>
                </div>
                <h3 className="mt-3 text-[18px] font-semibold leading-snug tracking-tight">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="bg-gradient-to-br from-ink to-amber-bright bg-clip-text text-[28px] font-semibold tracking-tight text-transparent">
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
      <FinalCTA />
    </>
  );
}
