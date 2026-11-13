// Metadata builder for the standard (non-landing) routes.
//
// Reads from data/seoDefaults.ts — which is editable in /admin and regenerated
// from Supabase by `npm run pull` (part of `npm run publish`). OG/Twitter/
// canonical tags are derived here so each route stays a one-liner.

import type { Metadata } from "next";
import { site } from "@/data/site";
import { seoDefaults, type SeoDefault } from "@/data/seoDefaults";

export function metaFrom(def: SeoDefault): Metadata {
  const description = def.description;
  const canonical =
    def.canonical || `${site.url}${def.path === "/" ? "" : def.path}`;
  const ogImage = def.ogImage || site.heroImage;
  const ogTitle = def.ogTitle || def.title;
  const ogDescription = def.ogDescription || description;

  const meta: Metadata = {
    title: def.absoluteTitle ? { absolute: def.title } : def.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      locale: "en_IN",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };

  if (def.noindex) {
    meta.robots = { index: false, follow: false };
  }

  return meta;
}

/** Convenience: build metadata for a route by its path. */
export function metaForPath(path: string): Metadata {
  const def = seoDefaults[path];
  if (!def) return {};
  return metaFrom(def);
}
