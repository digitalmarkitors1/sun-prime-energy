// Pull published content from Supabase and regenerate the data/*.ts files that
// the static build consumes. This is the "make edits go live" step.
//
// Usage:  npm run pull        (also runs automatically inside `npm run publish`)
//
// Regenerates, type-safe (JSON.stringify(...) as const):
//   • data/site.ts          ← content_singletons (key='site')
//   • data/landingPages.ts  ← landing_pages (published, ordered)
//   • data/seoDefaults.ts   ← seo_meta
//
// If Supabase isn't configured, or a table is empty, the committed file is left
// untouched — so the build always has valid content to fall back to.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "data");

function loadEnv() {
  try {
    const raw = readFileSync(join(here, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local */
  }
}
loadEnv();

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!URL || !ANON) {
  console.log("• Supabase not configured — keeping committed data/*.ts files.");
  process.exit(0);
}

// Plain REST reads (no supabase-js → no realtime/WebSocket dependency in Node).
async function rest(query) {
  const res = await fetch(`${URL}/rest/v1/${query}`, {
    headers: { apikey: ANON, Authorization: `Bearer ${ANON}` },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

const HEADER =
  "// AUTO-GENERATED from Supabase by `npm run pull`. Do NOT edit by hand —\n" +
  "// edit content in /admin, then run `npm run publish`. Committed version = fallback.\n\n";

const LANDING_TYPES = `export type LandingBenefit = { title: string; body: string };
export type LandingFAQ = { q: string; a: string };
export type LandingSector = "Commercial" | "Industrial" | "Institutional" | "Residential";

export type LandingPageData = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1Lead: string;
  h1Highlight: string;
  lead: string;
  intro: string[];
  benefitsHeading: string;
  benefits: LandingBenefit[];
  sector?: LandingSector;
  faqHeading?: string;
  faqs: LandingFAQ[];
  related: string[];
};

`;

const SEO_TYPES = `export type SeoDefault = {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
};

`;

const BLOG_TYPES = `export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  readTime: string;
  author: string;
  coverImage: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  published: boolean;
  featured: boolean;
  publishedAt: string;
  sortOrder: number;
};

`;

const BLOG_HELPER = `
/** Published posts, featured first, then newest by date. */
export function sortedPosts(posts: BlogPost[] = blogPosts): BlogPost[] {
  return [...posts]
    .filter((p) => p.published)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return b.publishedAt.localeCompare(a.publishedAt);
    });
}
`;

const json = (v) => JSON.stringify(v, null, 2);

async function pullSite() {
  const rows = await rest("sunprime_content_singletons?select=data&key=eq.site");
  const data = rows[0]?.data;
  if (!data) {
    console.log("• content_singletons empty — keeping data/site.ts");
    return;
  }
  const out =
    HEADER + `export const site = ${json(data)} as const;\n\nexport type SiteData = typeof site;\n`;
  writeFileSync(join(dataDir, "site.ts"), out);
  console.log("✓ data/site.ts");
}

async function pullLanding() {
  const data = await rest(
    "sunprime_landing_pages?select=*&published=eq.true&order=sort_order.asc",
  );
  if (!data || data.length === 0) {
    console.log("• landing_pages empty — keeping data/landingPages.ts");
    return;
  }
  const map = {};
  for (const r of data) {
    const entry = {
      slug: r.slug,
      navLabel: r.nav_label,
      eyebrow: r.eyebrow,
      metaTitle: r.meta_title,
      metaDescription: r.meta_description,
      h1Lead: r.h1_lead,
      h1Highlight: r.h1_highlight,
      lead: r.lead,
      intro: r.intro ?? [],
      benefitsHeading: r.benefits_heading,
      benefits: r.benefits ?? [],
      ...(r.sector ? { sector: r.sector } : {}),
      ...(r.faq_heading ? { faqHeading: r.faq_heading } : {}),
      faqs: r.faqs ?? [],
      related: r.related ?? [],
    };
    map[r.slug] = entry;
  }
  const out =
    HEADER + LANDING_TYPES + `export const landingPages: Record<string, LandingPageData> = ${json(map)};\n`;
  writeFileSync(join(dataDir, "landingPages.ts"), out);
  console.log(`✓ data/landingPages.ts (${data.length})`);
}

async function pullSeo() {
  const data = await rest("sunprime_seo_meta?select=*");
  if (!data || data.length === 0) {
    console.log("• seo_meta empty — keeping data/seoDefaults.ts");
    return;
  }
  const map = {};
  for (const r of data) {
    const entry = {
      path: r.path,
      title: r.title,
      description: r.description,
      // DB titles are stored verbatim (what you typed = the <title>).
      absoluteTitle: true,
      ...(r.canonical ? { canonical: r.canonical } : {}),
      ...(r.og_title ? { ogTitle: r.og_title } : {}),
      ...(r.og_description ? { ogDescription: r.og_description } : {}),
      ...(r.og_image ? { ogImage: r.og_image } : {}),
      ...(r.noindex ? { noindex: true } : {}),
    };
    map[r.path] = entry;
  }
  const out =
    HEADER + SEO_TYPES + `export const seoDefaults: Record<string, SeoDefault> = ${json(map)};\n`;
  writeFileSync(join(dataDir, "seoDefaults.ts"), out);
  console.log(`✓ data/seoDefaults.ts (${data.length})`);
}

async function pullBlog() {
  const data = await rest("sunprime_blog_posts?select=*&order=sort_order.asc");
  if (!data || data.length === 0) {
    console.log("• blog_posts empty — keeping data/blog.ts");
    return;
  }
  const posts = data.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body,
    category: r.category,
    readTime: r.read_time,
    author: r.author,
    coverImage: r.cover_image,
    ...(r.meta_title ? { metaTitle: r.meta_title } : {}),
    ...(r.meta_description ? { metaDescription: r.meta_description } : {}),
    ...(r.og_image ? { ogImage: r.og_image } : {}),
    published: r.published,
    featured: r.featured,
    publishedAt:
      typeof r.published_at === "string"
        ? r.published_at.slice(0, 10)
        : String(r.published_at),
    sortOrder: r.sort_order,
  }));
  const out =
    HEADER +
    BLOG_TYPES +
    `export const blogPosts: BlogPost[] = ${json(posts)};\n` +
    BLOG_HELPER;
  writeFileSync(join(dataDir, "blog.ts"), out);
  console.log(`✓ data/blog.ts (${posts.length})`);
}

async function run() {
  console.log("Pulling content from Supabase…");
  await pullSite();
  await pullLanding();
  await pullSeo();
  await pullBlog();
  console.log("\n✔ Content pulled. Next step runs the build.\n");
}

run().catch((e) => {
  console.error("\n✗ Pull failed:", e.message);
  console.error("  Keeping committed data/*.ts so the build can still proceed.\n");
  process.exit(1);
});
