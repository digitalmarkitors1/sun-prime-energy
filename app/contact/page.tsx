import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Sun Prime Energy Solutions | Solar EPC New Delhi",
  description:
    "Talk to Sun Prime Energy Solutions's engineering team in New Delhi. Feasibility studies, solar EPC proposals, and O&M onboarding for commercial, industrial, and institutional sites across India.",
  alternates: { canonical: `${site.url}/contact` },
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.contact.phone,
    href: site.contact.phoneHref,
  },
  {
    icon: MapPin,
    label: "Office",
    value: `${site.contact.addressLine1}, ${site.contact.addressLine2}, New Delhi ${site.contact.postalCode}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: site.contact.hours,
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: site.url }, { name: "Contact", url: `${site.url}/contact` }]} />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to engineering.
            <br />
            <span className="text-ink/55">Not a sales funnel.</span>
          </>
        }
        lead="Tell us about your site — we'll come back within one business day with a feasibility view, and route you to whoever on the team can answer fastest."
      />

      <Section tone="paper" size="default" className="border-t border-line">
        <Container>
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <Reveal><Eyebrow>Direct channels</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                Reach the team directly.
              </Reveal>
              <ul className="mt-10 divide-y divide-line">
                {channels.map((c, i) => (
                  <Reveal key={c.label} delay={0.05 * i} as="li" className="block py-5 first:pt-0">
                    <div className="flex items-start gap-5">
                      <c.icon size={18} className="mt-1 text-ink/45" />
                      <div className="flex-1">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-ink/45">{c.label}</div>
                        {c.href ? (
                          <a href={c.href} className="mt-1 block text-[15.5px] font-medium tracking-tight text-ink hover:text-amber">
                            {c.value}
                          </a>
                        ) : (
                          <div className="mt-1 text-[15.5px] font-medium tracking-tight text-ink">{c.value}</div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="md:col-span-7">
              <Reveal><Eyebrow>Project enquiry</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                Send us your site details.
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="mist" size="default">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="mt-5 text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[36px]">
                Common questions, answered straight.
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-line">
                {site.faqs.map((f, i) => (
                  <Reveal key={f.q} delay={0.05 * i} as="li" className="block py-7 first:pt-0">
                    <h3 className="text-[17px] font-semibold tracking-tight">{f.q}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{f.a}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
