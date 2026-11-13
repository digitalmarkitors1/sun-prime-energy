"use client";

// Blog editor. List / create / edit / delete posts. Body is written in Markdown
// (rendered to HTML at build time). Per-post SEO + cover image + publish toggle.

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/tables";
import { Btn, Field, Input, Textarea, SaveBar, Spinner } from "./kit";
import { RichTextEditor } from "./RichTextEditor";
import { ImageField } from "./ImageField";
import { SeoMeters } from "./SeoMeters";
import { Plus, Trash2, Eye, X, Wand2 } from "lucide-react";

/** Estimate reading time from an HTML body (~200 words/min). */
function readingTime(html: string): string {
  const text = (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

type Row = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  read_time: string;
  author: string;
  cover_image: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  published: boolean;
  featured: boolean;
  published_at: string;
  sort_order: number;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function blank(order: number): Row {
  return {
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    category: "",
    read_time: "",
    author: "Sunprime Energy Solutions",
    cover_image: "",
    meta_title: null,
    meta_description: null,
    og_image: null,
    published: true,
    featured: false,
    published_at: "",
    sort_order: order,
  };
}

export function BlogTab() {
  const [rows, setRows] = useState<Row[]>([]);
  const [sel, setSel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [preview, setPreview] = useState(false);

  // Warn before leaving the page with unsaved changes.
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const load = async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data, error } = await sb
      .from(TABLES.blog)
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) setStatus(`Load error: ${error.message}`);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const current = rows[sel];
  const patch = (p: Partial<Row>) => {
    setRows((rs) => rs.map((r, i) => (i === sel ? { ...r, ...p } : r)));
    setDirty(true);
    setStatus(null);
  };

  const addNew = () => {
    const r = blank(rows.length);
    setRows((rs) => [...rs, r]);
    setSel(rows.length);
    setIsNew(true);
    setDirty(true);
    setStatus(null);
  };

  const save = async () => {
    const sb = getSupabase();
    if (!sb || !current) return;
    if (!current.slug.trim()) {
      setStatus("Slug is required.");
      return;
    }
    // Default the date on first save if left empty.
    const toSave = {
      ...current,
      published_at: current.published_at || new Date().toISOString().slice(0, 10),
    };
    setSaving(true);
    const { error } = await sb.from(TABLES.blog).upsert(toSave, { onConflict: "slug" });
    setSaving(false);
    if (error) setStatus(`Save failed: ${error.message}`);
    else {
      setRows((rs) => rs.map((r, i) => (i === sel ? toSave : r)));
      setDirty(false);
      setIsNew(false);
      setStatus("Saved. Run Publish to push live.");
    }
  };

  const del = async () => {
    const sb = getSupabase();
    if (!sb || !current) return;
    if (!confirm(`Delete post "${current.title || current.slug}"? This cannot be undone.`)) return;
    if (current.slug) {
      const { error } = await sb.from(TABLES.blog).delete().eq("slug", current.slug);
      if (error) {
        setStatus(`Delete failed: ${error.message}`);
        return;
      }
    }
    setRows((rs) => rs.filter((_, i) => i !== sel));
    setSel(0);
    setDirty(false);
    setStatus("Deleted.");
  };

  if (loading) return <Spinner label="Loading blog posts…" />;

  return (
    <div className="flex gap-6">
      <aside className="w-60 shrink-0">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {rows.length} posts
          </span>
          <Btn size="sm" variant="ghost" onClick={addNew}>
            <Plus size={13} /> New
          </Btn>
        </div>
        <div className="space-y-1">
          {rows.map((r, i) => (
            <button
              key={r.slug || `new-${i}`}
              onClick={() => {
                setSel(i);
                setStatus(null);
              }}
              className={`block w-full truncate rounded-md px-3 py-2 text-left text-sm ${
                i === sel ? "bg-amber-50 font-medium text-amber-800" : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {r.title || r.slug || "(untitled)"}
              {r.featured && <span className="ml-1 text-xs text-amber-500">★</span>}
              {!r.published && <span className="ml-1 text-xs text-neutral-400">· draft</span>}
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {!current ? (
          <p className="text-sm text-neutral-500">Select a post, or create a new one.</p>
        ) : (
          <>
            <div className="space-y-4">
              <Field label="Title">
                <Input
                  value={current.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    // Auto-fill slug from title only for a brand-new post.
                    if (isNew) patch({ title, slug: slugify(title) });
                    else patch({ title });
                  }}
                />
              </Field>
              <Field label="URL slug" hint={`Lives at /blog/${current.slug || "…"}/ — only editable when creating.`}>
                <Input value={current.slug} disabled={!isNew} onChange={(e) => patch({ slug: slugify(e.target.value) })} />
              </Field>
              <Field label="Excerpt" hint="One or two sentences shown on the listing and used as the fallback meta description.">
                <Textarea rows={2} value={current.excerpt} onChange={(e) => patch({ excerpt: e.target.value })} />
              </Field>

              <Field label="Article content" hint="Use the toolbar for headings, bold/italic, lists, quotes, links and images. Select words and click the link button to link them (internal e.g. /services/ or a full URL).">
                {/* key={sel} remounts the editor only when switching to another
                    post, so it loads that post's content without re-syncing
                    (and flipping) while you type in the current one. */}
                <RichTextEditor key={sel} value={current.body} onChange={(html) => patch({ body: html })} />
              </Field>

              <div className="grid grid-cols-3 gap-4">
                <Field label="Category" hint="Pick an existing one or type a new.">
                  <Input list="blog-categories" value={current.category} onChange={(e) => patch({ category: e.target.value })} />
                  <datalist id="blog-categories">
                    {[...new Set(rows.map((r) => r.category).filter(Boolean))].map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
                <Field label="Read time">
                  <div className="flex gap-1">
                    <Input value={current.read_time} onChange={(e) => patch({ read_time: e.target.value })} />
                    <Btn size="sm" variant="ghost" title="Auto-calculate from the article" onClick={() => patch({ read_time: readingTime(current.body) })}>
                      <Wand2 size={13} />
                    </Btn>
                  </div>
                </Field>
                <Field label="Author">
                  <Input value={current.author} onChange={(e) => patch({ author: e.target.value })} />
                </Field>
              </div>

              <Field label="Cover image" hint="Upload a picture, or paste an image URL/path.">
                <ImageField value={current.cover_image} onChange={(url) => patch({ cover_image: url })} folder="blog" />
              </Field>

              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-700">SEO (optional)</p>
                <div className="space-y-3">
                  <Field label="Meta title" hint="Blank → uses the post title.">
                    <Input value={current.meta_title ?? ""} onChange={(e) => patch({ meta_title: e.target.value || null })} />
                  </Field>
                  <Field label="Meta description" hint="Blank → uses the excerpt.">
                    <Textarea rows={2} value={current.meta_description ?? ""} onChange={(e) => patch({ meta_description: e.target.value || null })} />
                  </Field>
                  <SeoMeters
                    title={current.meta_title || current.title}
                    description={current.meta_description || current.excerpt}
                    path={`/blog/${current.slug}`}
                  />
                  <Field label="Social share image (OG)" hint="Blank → uses the cover image.">
                    <ImageField value={current.og_image ?? ""} onChange={(url) => patch({ og_image: url || null })} folder="blog" />
                  </Field>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Field label="Publish date">
                  <Input
                    type="date"
                    value={current.published_at}
                    onChange={(e) => patch({ published_at: e.target.value })}
                  />
                </Field>
                <Field label="Sort order">
                  <Input type="number" value={current.sort_order} onChange={(e) => patch({ sort_order: Number(e.target.value) })} />
                </Field>
                <div className="flex items-end gap-5 pb-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={current.published} onChange={(e) => patch({ published: e.target.checked })} className="h-4 w-4 rounded border-neutral-300 text-amber-600" />
                    <span className="text-sm font-medium text-neutral-700">Published</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={current.featured} onChange={(e) => patch({ featured: e.target.checked })} className="h-4 w-4 rounded border-neutral-300 text-amber-600" />
                    <span className="text-sm font-medium text-neutral-700">Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Btn variant="ghost" size="sm" onClick={() => setPreview(true)}>
                  <Eye size={13} /> Preview
                </Btn>
                <Btn variant="danger" size="sm" onClick={del}>
                  <Trash2 size={13} /> Delete post
                </Btn>
              </div>
            </div>
            <SaveBar onSave={save} saving={saving} status={status} dirty={dirty} />
          </>
        )}
      </div>

      {preview && current && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-6"
          onClick={() => setPreview(false)}
        >
          <div
            className="my-8 w-full max-w-[860px] rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3">
              <span className="text-sm font-medium text-neutral-600">Preview — how the article will look</span>
              <button onClick={() => setPreview(false)} className="rounded p-1 text-neutral-500 hover:bg-neutral-100">
                <X size={18} />
              </button>
            </div>
            <div className="px-8 py-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                {current.category}{current.category && current.read_time ? " · " : ""}{current.read_time}
              </p>
              <h1 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight text-ink">{current.title || "(untitled)"}</h1>
              {current.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.cover_image} alt="" className="mt-6 aspect-[16/9] w-full rounded-lg object-cover" />
              )}
              <div
                className="article-body mt-8 text-[17px] leading-[1.75] text-ink/80"
                dangerouslySetInnerHTML={{ __html: current.body || "<p class='text-neutral-400'>No content yet.</p>" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
