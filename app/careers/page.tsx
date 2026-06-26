import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Enquiry & Career | Work at Sun Prime Energy Solutions",
  description:
    "Build solar that's engineered for the long view. Open engineering, EPC, O&M, and business development roles at Sun Prime Energy Solutions in New Delhi — plus how to send a general enquiry or apply.",
  alternates: { canonical: `${site.url}/careers` },
};

const applyHref = (role?: string) =>
  `mailto:${site.careers.email}?subject=${encodeURIComponent(
    role ? `Application — ${role}` : "Career enquiry — Sun Prime Energy Solutions",
  )}`;

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: site.url }, { name: "Enquiry & Career", url: `${site.url}/careers` }]} />
      <PageHero
        eyebrow="Enquiry & career"
        title={
          <>
            Build assets that outlast
            <br />
            <span className="text-ink/55">the people who sold them.</span>
          </>
        }
        lead="We hire engineers and operators who'd rather do the work properly than quickly. If that's you — or if you're a partner with an enquiry — start here."
        meta={
          <div className="border-l border-line pl-6 text-[13.5px] text-ink/70">
            <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">General enquiry</div>
            <a
              href={applyHref()}
              className="mt-2 inline-flex items-center gap-2 font-medium text-ink hover:text-amber"
            >
              {site.careers.email}
              <ArrowUpRight size={14} />
            </a>
          </div>
        }
      />

      {/* Culture */}
      <Section tone="paper" size="default" className="border-t border-line">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal><Eyebrow>Why work here</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                A small team, deeply accountable.
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-line">
                {site.careers.culture.map((c, i) => (
                  <Reveal key={c.title} delay={0.05 * i} as="li" className="block py-7 first:pt-0">
                    <div className="grid gap-3 md:grid-cols-12 md:gap-6">
                      <h3 className="md:col-span-5 text-[19px] font-semibold leading-snug tracking-tight">
                        {c.title}
                      </h3>
                      <p className="md:col-span-7 text-[15px] leading-relaxed text-ink/65">{c.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Open roles */}
      <Section tone="mist" size="loose">
        <Container>
          <div className="max-w-2xl">
            <Reveal><Eyebrow>Open positions</Eyebrow></Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
              Roles we&apos;re hiring for.
            </Reveal>
          </div>
          <ul className="mt-12 divide-y divide-line border-t border-line">
            {site.careers.roles.map((r, i) => (
              <Reveal key={r.title} delay={0.04 * i} as="li" className="block">
                <a
                  href={applyHref(r.title)}
                  className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-6"
                >
                  <div className="md:col-span-4">
                    <h3 className="text-[19px] font-semibold tracking-tight text-ink transition-colors group-hover:text-amber">
                      {r.title}
                    </h3>
                    <div className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-ink/45">
                      {r.location} · {r.type}
                    </div>
                  </div>
                  <p className="md:col-span-7 text-[15px] leading-relaxed text-ink/65">{r.body}</p>
                  <div className="md:col-span-1 md:justify-self-end">
                    <ArrowUpRight
                      size={18}
                      className="text-ink/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                    />
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start gap-4 rounded-sm bg-paper p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <h3 className="text-[18px] font-semibold tracking-tight">Don&apos;t see your role?</h3>
                <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-ink/65">
                  We always want to hear from strong engineers and operators. Send us your CV and
                  tell us where you&apos;d add value.
                </p>
              </div>
              <Button href={applyHref()} variant="primary" showArrow external>
                Send an open application
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
