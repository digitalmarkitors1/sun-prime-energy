import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Services } from "@/components/home/Services";
import { Industries } from "@/components/home/Industries";
import { WhyUs } from "@/components/home/WhyUs";
import { Projects } from "@/components/home/Projects";
import { Process } from "@/components/home/Process";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { SEOContent } from "@/components/home/SEOContent";
import { FinalCTA } from "@/components/home/FinalCTA";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  FAQJsonLd,
  ServicesJsonLd,
} from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <FAQJsonLd />
      <ServicesJsonLd />
      <Hero />
      <TrustStrip />
      <Services />
      <Industries />
      <WhyUs />
      <Projects />
      <Process />
      <HomeFAQ />
      <SEOContent />
      <FinalCTA />
    </>
  );
}
