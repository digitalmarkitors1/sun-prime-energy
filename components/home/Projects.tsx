import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function Projects() {
  return (
    <Section tone="mist" size="default">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Selected projects</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[36px] font-semibold leading-[1.1] tracking-tight md:text-[52px]">
              Real plants. Real yield.
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button href="/projects" variant="secondary" showArrow>
              All projects
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-5">
          {site.projects.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * i}>
              <Link
                href="/projects"
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink/5">
                  <Image
                    src={p.img}
                    alt={`${p.title}, ${p.location}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent transition-colors duration-700 group-hover:from-amber/10 group-hover:via-transparent group-hover:to-amber-bright/15" />
                  <div className="absolute left-5 top-5">
                    <span className="inline-flex items-center rounded-full bg-mist/95 px-3 py-1 text-[11px] font-medium tracking-tight text-ink shadow-sm backdrop-blur-sm">
                      {p.type}
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[18px] font-semibold leading-tight tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-ink/55">{p.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold tracking-tight text-ink">
                      {p.capacity}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
