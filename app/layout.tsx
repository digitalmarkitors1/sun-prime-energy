import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Solar EPC Company in Delhi | Rooftop & Industrial Solar — ${site.shortName}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "solar EPC company India",
    "solar EPC Delhi",
    "rooftop solar India",
    "commercial solar EPC",
    "industrial solar power plant",
    "ISO 9001 solar company",
    "solar O&M services",
    "solar consultancy India",
    "net metering solar",
    "ground mount solar EPC",
    "agrivoltaic India",
    "Sunprime Energy Solutions",
    "solar installation Delhi NCR",
    "solar Haryana",
    "solar Rajasthan",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Engineered solar, end to end`,
    description: site.description,
    locale: "en_IN",
    images: [{ url: site.heroImage, width: 1350, height: 1800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.heroImage],
  },
  alternates: {
    canonical: site.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-mist text-ink">
        <ScrollProgress />
        <Header />
        <main className="pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
