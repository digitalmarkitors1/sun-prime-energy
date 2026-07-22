"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Feasibility request — Sunprime Energy Solutions");
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Company: ${data.get("company")}`,
        `Phone: ${data.get("phone")}`,
        `Email: ${data.get("email")}`,
        `Approx. capacity: ${data.get("capacity")}`,
        `Notes: ${data.get("notes")}`,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <Section tone="mist" size="default" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-amber-bright/15 via-sun/10 to-transparent blur-3xl"
      />
      <Container>
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Start a project</Eyebrow>
            </Reveal>
            <Reveal delay={0.05} as="h2" className="mt-5 text-balance text-[40px] font-semibold leading-[1.02] tracking-tight md:text-[60px]">
              Let&apos;s engineer
              <br />
              your solar asset.
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink/65">
                Share a few details about your site. We&apos;ll come back within one business day
                with a feasibility view — yield, BOM, and an honest commissioning timeline.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 space-y-2 text-[14.5px]">
                <a className="block font-medium tracking-tight text-ink hover:text-amber" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
                <a className="block font-medium tracking-tight text-ink hover:text-amber" href={`mailto:${site.contact.gmail}`}>
                  {site.contact.gmail}
                </a>
                <a className="block font-medium tracking-tight text-ink hover:text-amber" href={site.contact.phoneHref}>
                  {site.contact.phone}
                </a>
                <p className="pt-1 text-[13px] text-ink/45">{site.contact.hours}</p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="grain relative grid gap-px overflow-hidden rounded-md bg-ink shadow-[0_30px_60px_-20px_rgba(10,22,40,0.35)]"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent" />
                <div className="grid gap-px md:grid-cols-2">
                  <FieldInput name="name" label="Full name" required />
                  <FieldInput name="company" label="Company" required />
                  <FieldInput name="email" type="email" label="Work email" required />
                  <FieldInput name="phone" label="Phone" />
                </div>
                <FieldInput name="capacity" label="Approx. capacity (kWp)" />
                <FieldTextarea name="notes" label="Project context" />
                <div className="flex items-center justify-between bg-ink-soft p-5 md:p-6">
                  <p className="text-[12px] text-mist/50">
                    {submitted ? "Opening your mail client…" : ""}
                  </p>
                  <Button variant="amber" showArrow>
                    Send request
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FieldInput({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block bg-ink p-5 transition-colors focus-within:bg-ink-soft md:p-6">
      <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-mist/45">
        {label}
        {required && <span className="ml-1 text-amber-bright">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-transparent text-[15px] text-mist placeholder:text-mist/30 focus:outline-none"
      />
    </label>
  );
}

function FieldTextarea({ name, label }: { name: string; label: string }) {
  return (
    <label className="block bg-ink p-5 transition-colors focus-within:bg-ink-soft md:p-6">
      <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-mist/45">
        {label}
      </span>
      <textarea
        name={name}
        rows={3}
        className="mt-2 w-full resize-none bg-transparent text-[15px] text-mist placeholder:text-mist/30 focus:outline-none"
      />
    </label>
  );
}
