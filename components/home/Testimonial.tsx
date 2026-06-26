import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Testimonial() {
  return (
    <Section tone="paper" size="loose" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-warm/60 via-cream to-paper"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sun/15 via-amber-bright/5 to-transparent blur-3xl"
      />
      <Container size="narrow">
        <Reveal>
          <span aria-hidden className="block text-[120px] font-serif leading-none text-amber">
            “
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <blockquote className="mt-2 text-balance text-[28px] font-medium leading-[1.32] tracking-tight md:text-[40px]">
            {site.testimonial.quote}
          </blockquote>
        </Reveal>
        <Reveal delay={0.1}>
          <figcaption className="mt-12 flex items-center gap-3 text-[13.5px]">
            <span aria-hidden className="h-px w-10 bg-amber" />
            <span className="font-semibold tracking-tight text-ink">{site.testimonial.name}</span>
            <span className="text-ink/55">— {site.testimonial.company}</span>
          </figcaption>
        </Reveal>
      </Container>
    </Section>
  );
}
