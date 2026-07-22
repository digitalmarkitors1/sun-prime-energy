import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/data/site";

export function Hero() {
  return (
    <>
      <section className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden bg-mist pt-24 text-center md:min-h-[88vh] md:pt-28">
        {/* Full-bleed background */}
        <Image
          src={site.heroImage}
          alt="Commercial rooftop solar PV array commissioned by Sunprime Energy Solutions"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Centered readability wash — a lighter pool where the copy sits, image revealed toward the edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(70% 65% at 50% 45%, rgba(247,245,240,0.92) 0%, rgba(247,245,240,0.72) 55%, rgba(247,245,240,0.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-mist/90 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-mist to-transparent"
        />

        <Container>
          <div className="mx-auto max-w-3xl py-16 md:py-24">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-ink/15 bg-paper/50 px-5 py-2 text-[13px] font-medium tracking-tight text-ink/75 backdrop-blur-sm">
                Commercial &amp; Industrial Solar EPC
              </span>
            </Reveal>
            <Reveal
              delay={0.05}
              as="h1"
              className="mx-auto mt-7 max-w-3xl text-balance text-[44px] font-semibold leading-[1.03] tracking-tight md:text-[76px]"
            >
              Power your future with clean, engineered solar energy.
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-7 max-w-2xl text-pretty text-[18px] leading-relaxed text-ink/70">
                Grid-tied solar PV for commercial, industrial, and institutional sites across India —
                designed for yield, built for the long view.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col items-center gap-4">
                <Button href="/contact" variant="amber" showArrow>
                  Get a Free Consultation
                </Button>
                <Link
                  href="/services"
                  className="text-[13.5px] font-medium tracking-tight text-ink/60 underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Explore our capabilities
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* KPI strip */}
      <section className="border-y border-line bg-mist">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:gap-0 md:py-12">
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
    </>
  );
}
