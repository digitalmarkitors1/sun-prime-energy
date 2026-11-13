import { metaForPath } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

export const metadata = metaForPath("/projects");

const sectorClass: Record<string, string> = {
  Industrial: "bg-amber/10 text-amber",
  Institutional: "bg-green/10 text-green",
  Commercial: "bg-ink/[0.06] text-ink/70",
  Residential: "bg-ink/[0.06] text-ink/55",
};

export default function ProjectsPage() {
  const totalKWp = site.allProjects.reduce((sum, p) => sum + p.capacity, 0);
  const count = site.allProjects.length;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: site.url }, { name: "Projects", url: `${site.url}/projects` }]} />
      <PageHero
        eyebrow="Projects"
        title={
          <>
            A portfolio of
            <br />
            <span className="bg-gradient-to-r from-amber via-amber-bright to-sun bg-clip-text text-transparent">bankable solar assets.</span>
          </>
        }
        lead="Every plant Sunprime Energy Solutions has engineered, built, and commissioned — across industrial, commercial, and institutional sites, including Delhi University colleges, Havells, HPCL, and IGL."
        meta={
          <div className="flex flex-col gap-6 border-l border-line pl-6 text-[13.5px]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Projects commissioned</div>
              <div className="mt-1 text-[24px] font-semibold tracking-tight">{count}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Aggregate capacity</div>
              <div className="mt-1 text-[24px] font-semibold tracking-tight">
                {Math.round(totalKWp).toLocaleString("en-IN")} kWp
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Geography</div>
              <div className="mt-1 text-[15px] font-medium tracking-tight">Delhi NCR &amp; Rajasthan</div>
            </div>
          </div>
        }
      />

      <Section tone="sky" size="default">
        <Container>
          <Reveal>
            <div className="overflow-x-auto rounded-sm border border-line">
              <table className="w-full min-w-[760px] border-collapse text-left text-[14px]">
                <thead>
                  <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-ink/45">
                    <th className="px-5 py-4 font-medium">Client</th>
                    <th className="px-5 py-4 font-medium">Sector</th>
                    <th className="px-5 py-4 font-medium text-right">Capacity (kWp)</th>
                    <th className="px-5 py-4 font-medium">Location</th>
                    <th className="px-5 py-4 font-medium">System</th>
                    <th className="px-5 py-4 font-medium">Commissioned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {site.allProjects.map((p, i) => (
                    <tr key={`${p.name}-${i}`} className="transition-colors hover:bg-paper">
                      <td className="px-5 py-3.5 font-medium text-ink">{p.name}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight",
                            sectorClass[p.sector] ?? "bg-ink/[0.06] text-ink/60",
                          )}
                        >
                          {p.sector}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold tabular-nums tracking-tight text-ink">
                        {p.capacity.toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-3.5 text-ink/70">{p.location}</td>
                      <td className="px-5 py-3.5 text-ink/70">{p.system}</td>
                      <td className="px-5 py-3.5 text-ink/70">{p.commissioned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-6 text-[13px] leading-relaxed text-ink/55">
            {count} projects · {Math.round(totalKWp).toLocaleString("en-IN")} kWp commissioned across Delhi NCR and Rajasthan.
          </p>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
