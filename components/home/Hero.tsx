import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-mist pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Color washes — warm sun + cool atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[720px] w-[720px] -translate-y-24 translate-x-24 rounded-full bg-gradient-to-br from-sun/45 via-amber-bright/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-32 -z-10 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-green-soft/30 via-bluemist/40 to-transparent blur-3xl"
      />

      <Container>
        <div className="grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Solar EPC · India</Eyebrow>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-bright/30 bg-green-bright/[0.08] px-3 py-1 text-[11px] font-medium tracking-tight text-green">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-bright shadow-[0_0_8px_rgba(46,177,78,0.7)]" />
                Renewable energy partner
              </span>
            </div>
            <Reveal delay={0.05} as="h1" className="mt-7 text-balance text-[44px] font-semibold leading-[1.02] tracking-tight md:text-[72px]">
              Engineered solar power,
              <br />
              <span className="bg-gradient-to-r from-ink/55 via-amber to-amber-bright bg-clip-text text-transparent">
                end to end.
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-pretty text-[17px] leading-relaxed text-ink/70">
                Sun Prime Energy Solutions designs, builds, and operates grid-tied solar PV plants for commercial,
                industrial, and institutional clients across India. ISO 9001:2015 certified.
                MNRE channel partner.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="/contact" variant="primary" showArrow>
                  Request a feasibility study
                </Button>
                <Button href="/services" variant="secondary">
                  View capabilities
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <ParallaxImage
                src={site.heroImage}
                alt="Industrial rooftop solar PV array commissioned by Sun Prime Energy Solutions"
                sizes="(min-width: 768px) 40vw, 90vw"
                priority
                translate={60}
                scale={1.18}
                className="aspect-[4/5] w-full rounded-sm bg-ink/5"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/0 to-ink/0" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                  <div className="rounded-sm bg-ink/85 px-4 py-3 text-mist backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-mist/55">
                      <span aria-hidden className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-bright opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-bright" />
                      </span>
                      <span>Live capacity</span>
                    </div>
                    <div className="mt-1 text-[18px] font-semibold tracking-tight">
                      2,000+ kWp delivered
                    </div>
                  </div>
                </div>
              </ParallaxImage>
            </Reveal>
          </div>
        </div>

        {/* KPI strip */}
        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-2 gap-y-8 border-t border-line pt-10 md:mt-20 md:grid-cols-4 md:gap-0">
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={
                  "flex flex-col px-0 md:px-8" +
                  (i !== 0 ? " md:border-l md:border-line" : "")
                }
              >
                <div className="bg-gradient-to-br from-ink via-ink to-amber-bright bg-clip-text text-[32px] font-semibold tracking-tight text-transparent md:text-[40px]">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-ink/55">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
