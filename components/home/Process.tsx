import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Process() {
  return (
    <Section tone="ink" size="default" className="grain">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow tone="mist">Engagement model</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[36px] font-semibold leading-[1.1] tracking-tight md:text-[48px]">
              From feasibility to first kilowatt-hour, on a single contract.
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-2">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-relaxed text-mist/70">
                One sequence. Six gates. Each step is owned by a named lead and signed off before
                the next begins — so commissioning dates hold, and surprises stay out of the
                budget.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden bg-mist/10 md:mt-16 md:grid-cols-3">
          {site.process.map((s, i) => (
            <Reveal key={s.title} delay={0.04 * i} as="li" className="block">
              <div className="group relative h-full overflow-hidden bg-ink p-8 transition-colors duration-300 hover:bg-ink-soft md:p-10">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-amber via-amber-bright to-sun transition-transform duration-700 group-hover:scale-x-100"
                />
                <span
                  aria-hidden
                  className="block h-px w-10 bg-amber-bright transition-all duration-500 group-hover:w-16"
                />
                <h3 className="mt-7 text-[22px] font-semibold leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-mist/70">
                  {s.body}
                </p>
                <span
                  aria-hidden
                  className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-amber/0 to-sun/0 blur-2xl transition-all duration-700 group-hover:from-amber/20 group-hover:to-sun/10"
                />
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
