"use client";

// Per-route SEO editor for the standard pages (/, /about, /services, …).
// Each row of seo_meta → title, description, canonical, OG overrides, noindex.

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/tables";
import { Btn, Field, Input, Textarea, SaveBar, Spinner, useUnsavedGuard } from "./kit";
import { SeoMeters } from "./SeoMeters";
import { Plus, Trash2 } from "lucide-react";

type Row = {
  path: string;
  title: string;
  description: string;
  canonical: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  noindex: boolean;
};

const KNOWN_PATHS = ["/", "/about", "/services", "/why-solar", "/careers", "/contact", "/projects", "/blog"];

function blank(path = ""): Row {
  return {
    path,
    title: "",
    description: "",
    canonical: null,
    og_title: null,
    og_description: null,
    og_image: null,
    noindex: false,
  };
}

export function SeoTab() {
  const [rows, setRows] = useState<Row[]>([]);
  const [sel, setSel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  useUnsavedGuard(dirty);

  useEffect(() => {
    (async () => {
      const sb = getSupabase();
      if (!sb) return;
      const { data, error } = await sb.from(TABLES.seo).select("*").order("path");
      if (error) setStatus(`Load error: ${error.message}`);
      setRows((data as Row[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const current = rows[sel];
  const patch = (p: Partial<Row>) => {
    setRows((rs) => rs.map((r, i) => (i === sel ? { ...r, ...p } : r)));
    setDirty(true);
    setStatus(null);
  };

  const existingPaths = rows.map((r) => r.path);
  const missing = KNOWN_PATHS.filter((p) => !existingPaths.includes(p));

  const addRow = (path: string) => {
    setRows((rs) => [...rs, blank(path)]);
    setSel(rows.length);
    setIsNew(true);
    setDirty(true);
  };

  const save = async () => {
    const sb = getSupabase();
    if (!sb || !current) return;
    if (!current.path.trim()) {
      setStatus("Path is required (e.g. /about).");
      return;
    }
    setSaving(true);
    const { error } = await sb.from(TABLES.seo).upsert(current, { onConflict: "path" });
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
    if (!confirm(`Delete SEO row for "${current.path}"?`)) return;
    if (current.path) await sb.from(TABLES.seo).delete().eq("path", current.path);
    setRows((rs) => rs.filter((_, i) => i !== sel));
    setSel(0);
    setStatus("Deleted.");
  };

  if (loading) return <Spinner label="Loading SEO settings…" />;

  return (
    <div className="flex gap-6">
      <aside className="w-56 shrink-0">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Pages
        </span>
        <div className="space-y-1">
          {rows.map((r, i) => (
            <button
              key={r.path || i}
              onClick={() => {
                setSel(i);
                setStatus(null);
              }}
              className={`block w-full truncate rounded-md px-3 py-2 text-left text-sm ${
                i === sel ? "bg-amber-50 font-medium text-amber-800" : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {r.path || "(new)"}
            </button>
          ))}
        </div>
        {missing.length > 0 && (
          <div className="mt-4">
            <span className="mb-1 block text-xs text-neutral-400">Add missing route:</span>
            {missing.map((p) => (
              <button
                key={p}
                onClick={() => addRow(p)}
                className="mr-1 mb-1 inline-flex items-center gap-1 rounded border border-dashed border-neutral-300 px-2 py-1 text-xs text-neutral-600 hover:border-amber-400"
              >
                <Plus size={11} /> {p}
              </button>
            ))}
          </div>
        )}
      </aside>

      <div className="min-w-0 flex-1">
        {!current ? (
          <p className="text-sm text-neutral-500">Select a page to edit its SEO.</p>
        ) : (
          <>
            <div className="space-y-4">
              <Field label="Route path" hint="e.g. / or /about">
                <Input value={current.path} disabled={!isNew} onChange={(e) => patch({ path: e.target.value.trim() })} />
              </Field>
              <Field label="Title tag" hint="Exactly what shows in the browser tab / search result.">
                <Input value={current.title} onChange={(e) => patch({ title: e.target.value })} />
              </Field>
              <Field label="Meta description">
                <Textarea rows={3} value={current.description} onChange={(e) => patch({ description: e.target.value })} />
              </Field>
              <SeoMeters title={current.title} description={current.description} path={current.path} />
              <Field label="Canonical URL" hint="Leave blank to auto-use the site URL + path.">
                <Input value={current.canonical ?? ""} onChange={(e) => patch({ canonical: e.target.value || null })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="OG title (optional)">
                  <Input value={current.og_title ?? ""} onChange={(e) => patch({ og_title: e.target.value || null })} />
                </Field>
                <Field label="OG image (optional)" hint="Path like /photos/x.jpg or full URL.">
                  <Input value={current.og_image ?? ""} onChange={(e) => patch({ og_image: e.target.value || null })} />
                </Field>
              </div>
              <Field label="OG description (optional)">
                <Textarea rows={2} value={current.og_description ?? ""} onChange={(e) => patch({ og_description: e.target.value || null })} />
              </Field>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={current.noindex}
                  onChange={(e) => patch({ noindex: e.target.checked })}
                  className="h-4 w-4 rounded border-neutral-300 text-amber-600"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Hide from search engines (noindex)
                </span>
              </label>
              <div>
                <Btn variant="danger" size="sm" onClick={del}>
                  <Trash2 size={13} /> Delete
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
