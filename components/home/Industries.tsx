import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Industries() {
  return (
    <Section tone="paper" size="default" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cream via-paper to-warm/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-gradient-to-bl from-amber-bright/15 via-peach/30 to-transparent blur-3xl"
      />
      <Container>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Industries we serve</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[36px] font-semibold leading-[1.1] tracking-tight md:text-[52px]">
              Solar engineered for the way <span className="bg-gradient-to-r from-green via-green-bright to-amber-bright bg-clip-text text-transparent">your business actually runs.</span>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-[16px] leading-relaxed text-ink/65">
                From manufacturing plants and warehouses to schools, hospitals, and dairy farms — Sunprime Energy Solutions
                designs solar plants around the load profile, roof type, and operating reality of each sector.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-line md:mt-16 md:grid-cols-3">
          {site.industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 0.05} as="li" className="block">
              <article className="group relative flex h-full flex-col overflow-hidden bg-paper transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(10,22,40,0.18)]">
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 z-10 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                    ind.slug === "agri" ? "bg-green-bright" : "bg-amber-bright"
                  }`}
                />
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-ink/5">
                  <Image
                    src={ind.img}
                    alt={ind.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    ind.slug === "agri"
                      ? "bg-gradient-to-tr from-green-bright/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                      : "bg-gradient-to-tr from-amber-bright/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  }`} />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-[19px] font-semibold leading-tight tracking-tight">{ind.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">{ind.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
