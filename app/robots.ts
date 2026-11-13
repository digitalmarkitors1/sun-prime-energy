import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Required for `output: "export"` — emit robots.txt as a static file.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
