import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { landingPages } from "@/data/landingPages";
import { sortedPosts } from "@/data/blog";

// Required for `output: "export"` — emit sitemap.xml as a static file.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "/about", "/services", "/projects", "/why-solar", "/careers", "/contact", "/blog"];
  const coreEntries = core.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  // Keyword-targeted solution landing pages
  const landingEntries = Object.keys(landingPages).map((slug) => ({
    url: `${site.url}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  // Blog articles
  const blogEntries = sortedPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...coreEntries, ...landingEntries, ...blogEntries];
}
