import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Solar Insights | Engineering, Policy & Operations",
  description:
    "Field notes on solar EPC engineering, net-metering, Tier-1 BOM, and O&M — written by Sunprime Energy Solutions for asset owners, CFOs, and procurement teams.",
  alternates: { canonical: `${site.url}/insights` },
};

export default function InsightsPage() {
  const [featured, ...rest] = site.insights;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: site.url }, { name: "Insights", url: `${site.url}/insights` }]} />
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Field notes from
            <br />
            <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">solar engineering.</span>
          </>
        }
        lead="Short, useful pieces written for the people actually evaluating, buying, or operating solar assets — not for SEO."
      />

      {/* Featured */}
      <Section tone="paper" size="default" className="border-t border-line">
        <Container>
          <Reveal>
            <Link href="#" className="group grid gap-10 md:grid-cols-12 md:gap-14">
              <div className="md:col-span-7">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-ink/5">
                  <Image
                    src={featured.img}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 768px) 60vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="md:col-span-5 md:py-4">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/45">
                  <span>Featured</span>
                  <span aria-hidden className="h-px w-6 bg-ink/25" />
                  <span>{featured.category}</span>
                </div>
                <h2 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-tight md:text-[40px]">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink/65">
                  {featured.excerpt}
                </p>
                <div className="mt-7 flex items-center gap-3 text-[13px] text-ink/55">
                  <span>{featured.readTime}</span>
                  <ArrowUpRight
                    size={15}
                    className="text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* Article grid */}
      <Section tone="mist" size="default">
        <Container>
          <ul className="grid gap-y-12 gap-x-6 md:grid-cols-2 md:gap-y-14 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.05} as="li" className="block">
                <Link href="#" className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-ink/5">
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink/45">
                    <span>{a.category}</span>
                    <span aria-hidden className="h-px w-4 bg-ink/25" />
                    <span>{a.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-balance text-[20px] font-semibold leading-snug tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65 line-clamp-2">
                    {a.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
