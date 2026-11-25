import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function WhyUs() {
  return (
    <Section tone="sun" size="default" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 -z-10 h-[440px] w-[440px] rounded-full bg-gradient-to-bl from-warm/60 via-cream/40 to-transparent blur-3xl"
      />
      <Container>
        <div className="grid gap-14 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Why Sunprime Energy Solutions</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[36px] font-semibold leading-[1.1] tracking-tight md:text-[48px]">
              Built like a <span className="bg-gradient-to-r from-amber-bright to-amber bg-clip-text text-transparent">25-year asset</span>, engineered to perform for decades.
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/65">
                Reliable plant output, performance in line with projections, and post-commissioning
                support when issues arise — not just the lowest price per watt. This approach shapes
                how we engineer, who we partner with, and how we operate the plant after handover.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <ul className="divide-y divide-line">
              {site.differentiators.map((d, i) => (
                <Reveal key={d.title} delay={0.05 * i} as="li" className="block py-7 first:pt-0 last:pb-0">
                  <div className="grid gap-3 md:grid-cols-12 md:gap-6">
                    <div className="md:col-span-5">
                      <h3 className="text-[19px] font-semibold leading-snug tracking-tight">
                        {d.title}
                      </h3>
                    </div>
                    <p className="md:col-span-7 text-[15px] leading-relaxed text-ink/65">
                      {d.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
