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
      <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-mist pt-24 text-center md:pt-28">
        {/* Full-bleed background — image paints instantly + is the reduced-motion / mobile fallback */}
        <Image
          src={site.heroImage}
          alt="Commercial rooftop solar PV array commissioned by Sunprime Energy Solutions"
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover"
        />
        {/* Ambient video loop layered over the poster image */}
        <video
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={site.heroImage}
          aria-hidden
        >
          <source src="/videos/hero-solar.mp4" type="video/mp4" />
        </video>
        {/* Cinematic scrim — video stays visible; nav + headline stay legible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/35 to-ink/80"
        />

        <Container>
          <div className="mx-auto max-w-3xl py-10">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-mist/25 bg-ink/25 px-5 py-2 text-[clamp(11px,1.1vw,13px)] font-medium tracking-tight text-mist backdrop-blur-sm">
                Commercial &amp; Industrial Solar EPC
              </span>
            </Reveal>
            <Reveal
              delay={0.05}
              as="h1"
              className="mx-auto mt-5 max-w-3xl text-balance text-[clamp(1.9rem,min(4.8vw,8vh),4.5rem)] font-semibold leading-[1.05] tracking-tight text-mist [text-shadow:0_2px_24px_rgba(10,22,40,0.35)]"
            >
              Power your <span className="text-green-bright">future</span> with{" "}
              <span className="text-green-bright">clean</span>, engineered solar{" "}
              <span className="text-green-bright">energy</span>.
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-[clamp(0.95rem,1.35vw,1.125rem)] leading-relaxed text-mist/85">
                Grid-tied solar PV for commercial, industrial, and institutional sites across India —
                designed for yield, built for the long view.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col items-center gap-3">
                <Button href="/contact" variant="amber" showArrow>
                  Get a Free Consultation
                </Button>
                <Link
                  href="/services"
                  className="text-[13.5px] font-medium tracking-tight text-mist/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Explore our capabilities
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* KPI strip */}
      <section className="border-y border-line bg-sky">
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
                  <div className="bg-gradient-to-br from-blue via-ink to-amber-bright bg-clip-text text-[32px] font-semibold tracking-tight text-transparent md:text-[40px]">
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
