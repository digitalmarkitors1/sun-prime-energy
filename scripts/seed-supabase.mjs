// Seed Supabase with the current site content from data/*.ts.
//
// Usage:  npm run seed
//
// Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local,
// then upserts:
//   • content_singletons (key='site')  ← data/site.ts
//   • landing_pages                     ← data/landingPages.ts
//   • seo_meta                          ← data/seoDefaults.ts (standard routes)
//
// Safe to re-run: every write is an upsert on the primary key.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { site } from "../data/site.ts";
import { landingPages } from "../data/landingPages.ts";
import { seoDefaults } from "../data/seoDefaults.ts";
import { blogPosts } from "../data/blog.ts";

const here = dirname(fileURLToPath(import.meta.url));

// --- load .env.local (no dependency on dotenv) -----------------------------
function loadEnv() {
  try {
    const raw = readFileSync(join(here, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local — rely on ambient env */
  }
}
loadEnv();

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL || !SERVICE_KEY) {
  console.error(
    "\n✗ Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local\n",
  );
  process.exit(1);
}

const sb = createClient(URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const SHORT_NAME = site.shortName;
function fullTitle(def) {
  // Mirror the layout title template: relative titles get " — Sunprime …".
  return def.absoluteTitle ? def.title : `${def.title} — ${SHORT_NAME}`;
}

async function run() {
  // 1. global site content
  {
    const { error } = await sb
      .from("sunprime_content_singletons")
      .upsert({ key: "site", data: site }, { onConflict: "key" });
    if (error) throw new Error(`content_singletons: ${error.message}`);
    console.log("✓ content_singletons (site)");
  }

  // 2. landing pages
  {
    const rows = Object.values(landingPages).map((p, i) => ({
      slug: p.slug,
      nav_label: p.navLabel,
      eyebrow: p.eyebrow,
      meta_title: p.metaTitle,
      meta_description: p.metaDescription,
      h1_lead: p.h1Lead,
      h1_highlight: p.h1Highlight,
      lead: p.lead,
      intro: p.intro,
      benefits_heading: p.benefitsHeading,
      benefits: p.benefits,
      sector: p.sector ?? null,
      faq_heading: p.faqHeading ?? null,
      faqs: p.faqs,
      related: p.related,
      published: true,
      sort_order: i,
    }));
    const { error } = await sb
      .from("sunprime_landing_pages")
      .upsert(rows, { onConflict: "slug" });
    if (error) throw new Error(`landing_pages: ${error.message}`);
    console.log(`✓ landing_pages (${rows.length})`);
  }

  // 3. standard-route SEO meta
  {
    const rows = Object.values(seoDefaults).map((d) => ({
      path: d.path,
      title: fullTitle(d),
      description: d.description,
      canonical: `${site.url}${d.path === "/" ? "" : d.path}`,
      og_image: site.heroImage,
      noindex: false,
    }));
    const { error } = await sb
      .from("sunprime_seo_meta")
      .upsert(rows, { onConflict: "path" });
    if (error) throw new Error(`seo_meta: ${error.message}`);
    console.log(`✓ seo_meta (${rows.length})`);
  }

  // 4. blog posts
  {
    const rows = blogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      category: p.category,
      read_time: p.readTime,
      author: p.author,
      cover_image: p.coverImage,
      meta_title: p.metaTitle ?? null,
      meta_description: p.metaDescription ?? null,
      og_image: p.ogImage ?? null,
      published: p.published,
      featured: p.featured,
      published_at: p.publishedAt,
      sort_order: p.sortOrder,
    }));
    const { error } = await sb
      .from("sunprime_blog_posts")
      .upsert(rows, { onConflict: "slug" });
    if (error) throw new Error(`blog_posts: ${error.message}`);
    console.log(`✓ blog_posts (${rows.length})`);
  }

  console.log("\n✔ Seed complete.\n");
}

run().catch((e) => {
  console.error("\n✗ Seed failed:", e.message, "\n");
  process.exit(1);
});
