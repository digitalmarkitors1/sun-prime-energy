import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Services() {
  return (
    <Section tone="leaf" size="default" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-bluemist/60 via-mist to-transparent blur-3xl"
      />
      <Container>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Capabilities</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-4 text-balance text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[40px]">
              Four capabilities,
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent"> one accountable team.</span>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-relaxed text-ink/65">
                Design, EPC, operations, and compliance handled in-house — so the proposal you
                approve is the plant we commission and the SLA we run.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-line md:mt-10 md:grid-cols-2">
          {site.services.map((service, i) => (
            <Reveal key={service.slug} delay={0.05 * i}>
              <Link
                href={`/services#${service.slug}`}
                className="group relative flex h-full flex-col bg-paper p-6 transition-colors duration-300 hover:bg-mist md:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100"
                />
                <h3 className="text-[19px] font-semibold leading-[1.2] tracking-tight md:text-[22px]">
                  {service.title}
                </h3>
                <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-ink/65">
                  {service.summary}
                </p>
                <ul className="mt-4 space-y-2 text-[13px] text-ink/70">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span aria-hidden className="mt-2 h-px w-3 bg-ink/30" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-2 text-[13px] font-medium tracking-tight text-ink/55 transition-colors group-hover:text-amber">
                  <span>Read more</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
