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
  title: "Solar Projects | Industrial, Commercial & Utility-Scale",
  description:
    "Selected solar plants engineered, built, and operated by Sun Prime Energy Solutions across India — industrial rooftop, commercial, institutional, ground-mount, agrivoltaic, and dairy carport projects.",
  alternates: { canonical: `${site.url}/projects` },
};

export default function ProjectsPage() {
  const totalKWp = site.expandedProjects.reduce(
    (sum, p) => sum + parseInt(p.capacity.replace(/[^0-9]/g, ""), 10),
    0,
  );

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: site.url }, { name: "Projects", url: `${site.url}/projects` }]} />
      <PageHero
        eyebrow="Projects"
        title={
          <>
            A portfolio of
            <br />
            <span className="text-ink/55">bankable solar assets.</span>
          </>
        }
        lead="A representative cross-section of plants Sun Prime Energy Solutions has engineered, built, and operates today across commercial, industrial, and institutional sectors."
        meta={
          <div className="flex flex-col gap-6 border-l border-line pl-6 text-[13.5px]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Aggregate capacity</div>
              <div className="mt-1 text-[24px] font-semibold tracking-tight">
                {totalKWp.toLocaleString("en-IN")} kWp
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Geography</div>
              <div className="mt-1 text-[15px] font-medium tracking-tight">Pan-India</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Sectors</div>
              <div className="mt-1 text-[15px] font-medium tracking-tight">Industrial · Commercial · Institutional</div>
            </div>
          </div>
        }
      />

      <Section tone="mist" size="default">
        <Container>
          <ul className="grid gap-y-12 gap-x-6 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {site.expandedProjects.map((p, i) => (
              <Reveal key={`${p.title}-${p.location}`} delay={(i % 3) * 0.05} as="li" className="block">
                <Link href="#" className="group block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink/5">
                    <Image
                      src={p.img}
                      alt={`${p.title}, ${p.location}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/0 to-ink/0" />
                    <div className="absolute left-5 top-5 flex gap-2">
                      <span className="inline-flex items-center rounded-full bg-mist/90 px-3 py-1 text-[11px] font-medium tracking-tight text-ink backdrop-blur-sm">
                        {p.type}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-ink/85 px-3 py-1 text-[11px] font-medium tracking-tight text-mist backdrop-blur-sm">
                        {p.year}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[18px] font-semibold leading-tight tracking-tight">{p.title}</h3>
                      <p className="mt-1 text-[13px] text-ink/55">{p.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold tracking-tight text-ink">{p.capacity}</span>
                      <ArrowUpRight
                        size={15}
                        className="text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="mt-16 max-w-md text-[13.5px] leading-relaxed text-ink/55">
            Project names and clients are anonymised in line with NDA practice. We&apos;re happy
            to share full case studies — including yield modelling and PR data — under a mutual
            non-disclosure.
          </p>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
