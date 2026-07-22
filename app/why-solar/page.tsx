import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Why Solar? | The Case for Commercial & Industrial Solar",
  description:
    "Why commercial, industrial, and institutional buyers go solar — 3–5 year payback against a 25-year asset, accelerated depreciation, predictable energy cost, and an auditable ESG story. The economics, made plain.",
  alternates: { canonical: `${site.url}/why-solar` },
};

export default function WhySolarPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: site.url }, { name: "Why Solar?", url: `${site.url}/why-solar` }]} />
      <PageHero
        eyebrow="Why solar?"
        title={
          <>
            A balance-sheet decision,
            <br />
            <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">with returns you can model.</span>
          </>
        }
        lead="For commercial and industrial buyers, solar is one of the few capex decisions that pays for itself and keeps paying. Here's the case — economics first, sentiment second."
      />

      {/* Reasons */}
      <Section tone="paper" size="loose">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal><Eyebrow>The case</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                Six reasons it adds up.
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/65">
                  None of them require you to care about the planet — though the planet benefits
                  either way.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
                {site.whySolar.reasons.map((r, i) => (
                  <Reveal key={r.title} delay={0.05 * i} as="li" className="block bg-paper p-6 md:p-8">
                    <h3 className="text-[18px] font-semibold tracking-tight">{r.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{r.body}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Myths / pushback */}
      <Section tone="mist" size="default">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal><Eyebrow>Common pushback</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                The objections, answered straight.
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-line">
                {site.whySolar.myths.map((m, i) => (
                  <Reveal key={m.q} delay={0.05 * i} as="li" className="block py-7 first:pt-0">
                    <h3 className="text-[17px] font-semibold tracking-tight">{m.q}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{m.a}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
