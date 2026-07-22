import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function SEOContent() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-mist">
      {/* Full-bleed solar photo */}
      <Image
        src="/photos/aerial-utility-farm.jpg"
        alt="Aerial view of utility-scale solar PV plant engineered by Sunprime Energy Solutions across India"
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      {/* Multi-layer overlays — readability + depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-ink/95 via-ink/85 to-ink/95"
      />
      <div
        aria-hidden
        className="absolute inset-0 grain"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-gradient-to-bl from-amber/25 via-sun/10 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-green-bright/15 via-green/10 to-transparent blur-3xl"
      />

      <div className="relative">
        <Container>
          <div className="grid gap-12 py-20 md:grid-cols-12 md:gap-16 md:py-28">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow tone="amber">Solar EPC across India</Eyebrow>
              </Reveal>
              <Reveal delay={0.05} as="h2" className="mt-6 text-balance text-[34px] font-semibold leading-[1.05] tracking-tight md:text-[56px]">
                Solar built like
                <br />
                <span className="bg-gradient-to-r from-amber-bright via-sun to-amber-bright bg-clip-text text-transparent">
                  infrastructure.
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist/55">
                  Because that is what it is. Twenty-five years of yield, written into the BOM
                  before kickoff and operated until the warranty expires.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7 space-y-5 text-[15.5px] leading-relaxed text-mist/75">
              <Reveal delay={0.1}>
                <p>
                  <strong className="font-semibold text-mist">Sunprime Energy Solutions</strong> is a Delhi-based
                  solar EPC company delivering{" "}
                  <Link href="/services#rooftop-solar" className="underline-offset-4 transition-colors hover:text-amber-bright hover:underline">commercial &amp; industrial rooftop solar</Link>,{" "}
                  <Link href="/services#epc" className="underline-offset-4 transition-colors hover:text-amber-bright hover:underline">turnkey solar EPC</Link>,{" "}
                  <Link href="/services#om" className="underline-offset-4 transition-colors hover:text-amber-bright hover:underline">25-year solar O&amp;M</Link>, and{" "}
                  <Link href="/services#advisory" className="underline-offset-4 transition-colors hover:text-amber-bright hover:underline">solar advisory</Link>{" "}
                  services across India. With more than 15,000 kWp of solar PV capacity engineered, built, and
                  operated for clients spanning manufacturing, education, healthcare, hospitality, warehousing,
                  and agrivoltaic sectors, we deliver bankable solar assets that earn for their owners across
                  decades — not quarters.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p>
                  As an <strong className="font-semibold text-mist">ISO 9001:2015 certified solar company</strong>, we
                  own every step of the project lifecycle — site survey, yield modelling, structural and
                  electrical engineering, BOQ specification, DISCOM net-metering, subsidy facilitation,
                  EPC execution, and performance-rated O&amp;M with remote monitoring. We work directly with
                  Tier-1 component manufacturers, so the BOM in your proposal is the BOM commissioned
                  on your roof.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
