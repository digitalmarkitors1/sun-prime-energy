import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
};

export function PageHero({ eyebrow, title, lead, meta }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-sky via-paper to-leaf pt-28 pb-12 md:pt-32 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[420px] w-[420px] -translate-y-24 translate-x-24 rounded-full bg-gradient-to-br from-sun/40 via-amber-bright/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-[360px] w-[360px] translate-y-24 rounded-full bg-gradient-to-tr from-blue-bright/25 via-green-bright/10 to-transparent blur-3xl"
      />
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h1" className="mt-6 text-balance text-[40px] font-semibold leading-[1.04] tracking-tight md:text-[68px]">
              {title}
            </Reveal>
            {lead && (
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-2xl text-pretty text-[17px] leading-relaxed text-ink/65">
                  {lead}
                </p>
              </Reveal>
            )}
          </div>
          {meta && (
            <div className="md:col-span-4">
              <Reveal delay={0.15}>{meta}</Reveal>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
