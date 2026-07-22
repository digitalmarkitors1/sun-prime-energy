import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

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

          {/* Right: approved component brands */}
          <div className="md:col-span-7 md:self-center">
            <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-5 border-y border-line py-8">
              {["Goodwe", "Havells", "Sungrow", "Renewsys", "Adani", "Vikram", "Waaree"].map((p, i) => (
                <Reveal key={p} delay={0.04 * i} as="li" className="block">
                  <span className="text-[20px] font-semibold tracking-tight text-ink transition-colors hover:text-amber md:text-[24px]">
                    {p}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-ink/45">
                Tier-1 module, inverter &amp; BoS manufacturers
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
