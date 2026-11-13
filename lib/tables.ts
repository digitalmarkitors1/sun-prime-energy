// Table + bucket names. Prefixed with `sunprime_` so the CMS can share a
// Supabase project with other apps (it lives inside the dm-portal project)
// without any chance of colliding with their tables.

export const TABLES = {
  content: "sunprime_content_singletons",
  landing: "sunprime_landing_pages",
  seo: "sunprime_seo_meta",
  blog: "sunprime_blog_posts",
} as const;

export const BUCKET = "sunprime-media";
