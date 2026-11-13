import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { landingPages } from "@/data/landingPages";
import { site } from "@/data/site";

const data = landingPages["rooftop-solar-installation-delhi"];

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: `${site.url}/${data.slug}` },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: data.metaTitle,
    description: data.metaDescription,
    url: `${site.url}/${data.slug}`,
    locale: "en_IN",
    images: [{ url: site.heroImage, width: 1350, height: 1800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: data.metaTitle,
    description: data.metaDescription,
    images: [site.heroImage],
  },
};

export default function Page() {
  return <LandingPage slug="rooftop-solar-installation-delhi" />;
}
