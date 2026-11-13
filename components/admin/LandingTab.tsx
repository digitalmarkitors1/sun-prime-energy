"use client";

// SEO landing pages editor. Lists all rows of landing_pages; edit scalar fields
// as inputs and the array fields (intro / benefits / faqs / related) via the
// recursive editor. Supports create, delete, publish toggle, ordering.

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/tables";
import { JsonValueEditor } from "./JsonValueEditor";
import { Btn, Field, Input, Textarea, SaveBar, Spinner, useUnsavedGuard } from "./kit";
import { SeoMeters } from "./SeoMeters";
import { Plus, Trash2 } from "lucide-react";

type Row = {
  slug: string;
  nav_label: string;
  eyebrow: string;
  meta_title: string;
  meta_description: string;
  h1_lead: string;
  h1_highlight: string;
  lead: string;
  intro: string[];
  benefits_heading: string;
  benefits: { title: string; body: string }[];
  sector: string | null;
  faq_heading: string | null;
  faqs: { q: string; a: string }[];
  related: string[];
  published: boolean;
  sort_order: number;
};

const SECTORS = ["", "Commercial", "Industrial", "Institutional", "Residential"];

function blankRow(order: number): Row {
  return {
    slug: "",
    nav_label: "",
    eyebrow: "",
    meta_title: "",
    meta_description: "",
    h1_lead: "",
    h1_highlight: "",
    lead: "",
    intro: [""],
    benefits_heading: "",
    benefits: [{ title: "", body: "" }],
    sector: null,
    faq_heading: null,
    faqs: [{ q: "", a: "" }],
    related: [],
    published: true,
    sort_order: order,
  };
}

export function LandingTab() {
  const [rows, setRows] = useState<Row[]>([]);
  const [sel, setSel] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  useUnsavedGuard(dirty);

  const load = async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data, error } = await sb
      .from(TABLES.landing)
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
    const r = blankRow(rows.length);
    setRows((rs) => [...rs, r]);
    setSel(rows.length);
    setIsNew(true);
    setDirty(true);
  };

  const save = async () => {
    const sb = getSupabase();
    if (!sb || !current) return;
    if (!current.slug.trim()) {
      setStatus("Slug is required.");
      return;
    }
    setSaving(true);
    setStatus(null);
    const { error } = await sb
      .from(TABLES.landing)
      .upsert(current, { onConflict: "slug" });
    setSaving(false);
    if (error) setStatus(`Save failed: ${error.message}`);
    else {
      setDirty(false);
      setIsNew(false);
      setStatus("Saved. Run Publish to push live.");
    }
  };

  const del = async () => {
    const sb = getSupabase();
    if (!sb || !current) return;
    if (!confirm(`Delete landing page "${current.slug}"? This cannot be undone.`)) return;
    if (current.slug) {
      const { error } = await sb.from(TABLES.landing).delete().eq("slug", current.slug);
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

  if (loading) return <Spinner label="Loading landing pages…" />;

  return (
    <div className="flex gap-6">
      {/* list */}
      <aside className="w-60 shrink-0">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {rows.length} pages
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
                i === sel
                  ? "bg-amber-50 font-medium text-amber-800"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {r.nav_label || r.slug || "(untitled)"}
              {!r.published && <span className="ml-1 text-xs text-neutral-400">· draft</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* editor */}
      <div className="min-w-0 flex-1">
        {!current ? (
          <p className="text-sm text-neutral-500">Select a page, or create a new one.</p>
        ) : (
          <>
            <div className="space-y-4">
              <Field label="URL slug" hint={`Lives at /${current.slug || "…"}/ — only editable when creating.`}>
                <Input
                  value={current.slug}
                  disabled={!isNew}
                  onChange={(e) => patch({ slug: e.target.value.trim() })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nav label">
                  <Input value={current.nav_label} onChange={(e) => patch({ nav_label: e.target.value })} />
                </Field>
                <Field label="Eyebrow (chip above H1)">
                  <Input value={current.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
                </Field>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  SEO
                </p>
                <div className="space-y-3">
                  <Field label="Meta title">
                    <Input value={current.meta_title} onChange={(e) => patch({ meta_title: e.target.value })} />
                  </Field>
                  <Field label="Meta description">
                    <Textarea
                      rows={2}
                      value={current.meta_description}
                      onChange={(e) => patch({ meta_description: e.target.value })}
                    />
                  </Field>
                  <SeoMeters title={current.meta_title} description={current.meta_description} path={`/${current.slug}`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="H1 — lead">
                  <Textarea rows={2} value={current.h1_lead} onChange={(e) => patch({ h1_lead: e.target.value })} />
                </Field>
                <Field label="H1 — highlight (gradient part)">
                  <Textarea rows={2} value={current.h1_highlight} onChange={(e) => patch({ h1_highlight: e.target.value })} />
                </Field>
              </div>
              <Field label="Lead paragraph">
                <Textarea rows={3} value={current.lead} onChange={(e) => patch({ lead: e.target.value })} />
              </Field>

              <Field label="Intro paragraphs">
                <JsonValueEditor value={current.intro} onChange={(v) => patch({ intro: v as string[] })} depth={1} defaultOpen />
              </Field>

              <Field label="Benefits heading">
                <Input value={current.benefits_heading} onChange={(e) => patch({ benefits_heading: e.target.value })} />
              </Field>
              <Field label="Benefits">
                <JsonValueEditor
                  value={current.benefits}
                  onChange={(v) => patch({ benefits: v as Row["benefits"] })}
                  depth={1}
                  defaultOpen
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Sector (proof-strip filter)">
                  <select
                    value={current.sector ?? ""}
                    onChange={(e) => patch({ sector: e.target.value || null })}
                    className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
                  >
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s || "— none —"}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="FAQ heading (optional)">
                  <Input value={current.faq_heading ?? ""} onChange={(e) => patch({ faq_heading: e.target.value || null })} />
                </Field>
              </div>

              <Field label="FAQs">
                <JsonValueEditor value={current.faqs} onChange={(v) => patch({ faqs: v as Row["faqs"] })} depth={1} defaultOpen />
              </Field>
              <Field label="Related page slugs (interlinks)">
                <JsonValueEditor value={current.related} onChange={(v) => patch({ related: v as string[] })} depth={1} defaultOpen />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Sort order">
                  <Input
                    type="number"
                    value={current.sort_order}
                    onChange={(e) => patch({ sort_order: Number(e.target.value) })}
                  />
                </Field>
                <label className="flex items-center gap-2 self-end pb-2">
                  <input
                    type="checkbox"
                    checked={current.published}
                    onChange={(e) => patch({ published: e.target.checked })}
                    className="h-4 w-4 rounded border-neutral-300 text-amber-600"
                  />
                  <span className="text-sm font-medium text-neutral-700">Published</span>
                </label>
              </div>

              <div>
                <Btn variant="danger" size="sm" onClick={del}>
                  <Trash2 size={13} /> Delete page
                </Btn>
              </div>
            </div>
            <SaveBar onSave={save} saving={saving} status={status} dirty={dirty} />
          </>
        )}
      </div>
    </div>
  );
}
