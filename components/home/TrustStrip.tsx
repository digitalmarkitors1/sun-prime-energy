import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function TrustStrip() {
  return (
    <section className="relative border-y border-line bg-paper py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-1/3 -z-10 bg-gradient-to-bl from-warm/40 via-cream/20 to-transparent"
      />

      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: editorial header */}
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Bill of materials</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
              Every plant we commission is built on{" "}
              <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">
                Tier-1 components
              </span>
              .
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">
                Sourced directly from manufacturers we can support across the twenty-five-year
                warranty term. No relabelled imports. No tier-2 substitution at commissioning.
              </p>
            </Reveal>
          </div>

          {/* Right: category list */}
          <div className="md:col-span-7">
            <ul className="divide-y divide-line border-y border-line">
              {site.partnerStack.map((row, i) => (
                <Reveal key={row.category} delay={0.05 * i} as="li" className="block">
                  <div className="group flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:gap-6 md:py-6">
                    {/* Category label */}
                    <div className="flex min-w-0 items-center gap-3 md:basis-[44%]">
                      <span
                        aria-hidden
                        className="h-px w-5 bg-amber/70 transition-all duration-500 group-hover:w-8 group-hover:bg-amber-bright"
                      />
                      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55">
                        {row.category}
                      </span>
                    </div>

                    {/* Partners list */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 md:basis-[56%]">
                      {row.partners.map((p, j) => (
                        <span key={p} className="inline-flex items-baseline gap-3">
                          <span className="text-[17px] font-semibold tracking-tight text-ink transition-colors group-hover:text-ink md:text-[19px]">
                            {p}
                          </span>
                          {j < row.partners.length - 1 && (
                            <span aria-hidden className="text-[14px] text-ink/30">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-ink/45">
                ↑ Module &amp; inverter manufacturers · channel relationships · monitoring stack
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
