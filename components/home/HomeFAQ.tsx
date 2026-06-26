"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="mist" size="default" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-bluemist/60 via-mist to-transparent blur-3xl"
      />
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow>Frequently asked</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[32px] font-semibold leading-[1.1] tracking-tight md:text-[44px]">
              What CFOs and procurement teams ask us.
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink/65">
                Short answers to the questions we get most often on rooftop solar capex,
                payback, MNRE subsidies, and O&amp;M.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {site.homeFaqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-amber"
                    >
                      <h3 className="text-balance text-[17px] font-semibold leading-snug tracking-tight md:text-[19px]">
                        {f.q}
                      </h3>
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-colors",
                          isOpen ? "bg-ink text-mist" : "bg-paper text-ink/60",
                        )}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid overflow-hidden transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]",
                      )}
                    >
                      <p className="min-h-0 max-w-2xl text-[15px] leading-relaxed text-ink/70">
                        {f.a}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
