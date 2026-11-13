"use client";

// Recursive content editor. Renders any JSON-shaped value as nested, friendly
// form controls so every field in the site content object is editable without
// hand-coding each one:
//   string   → auto-growing textarea / input
//   number   → number input
//   boolean  → toggle
//   array    → add / remove / reorder list, each item edited recursively
//   object   → labelled, collapsible group of fields

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { ImageField } from "./ImageField";

type Json = unknown;

function humanize(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

// A string field is treated as an image (→ upload widget) when its key looks
// image-y (heroImage, img, logo, cover, photo…) or its value is an image path.
function looksLikeImage(label: string | undefined, value: string): boolean {
  const key = (label ?? "").toLowerCase();
  if (/img|image|photo|logo|cover|avatar|icon|thumb|banner/.test(key)) return true;
  if (/\.(jpe?g|png|webp|avif|gif|svg)(\?.*)?$/i.test(value)) return true;
  if (value.startsWith("/photos/")) return true;
  return false;
}

function emptyLike(sample: Json): Json {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const o: Record<string, Json> = {};
    for (const [k, v] of Object.entries(sample)) o[k] = emptyLike(v);
    return o;
  }
  return "";
}

function StringField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const long = value.length > 60 || value.includes("\n");
  if (long) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(12, Math.max(2, value.split("\n").length + 1))}
        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
    />
  );
}

export function JsonValueEditor({
  value,
  onChange,
  label,
  depth = 0,
  defaultOpen,
}: {
  value: Json;
  onChange: (v: Json) => void;
  label?: string;
  depth?: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? depth < 1);

  // --- primitives ---------------------------------------------------------
  if (typeof value === "string") {
    if (looksLikeImage(label, value)) {
      return (
        <div className="block">
          {label && (
            <span className="mb-1 block text-xs font-medium text-neutral-500">
              {humanize(label)}
            </span>
          )}
          <ImageField value={value} onChange={(v) => onChange(v)} folder="content" />
        </div>
      );
    }
    return (
      <label className="block">
        {label && (
          <span className="mb-1 block text-xs font-medium text-neutral-500">
            {humanize(label)}
          </span>
        )}
        <StringField value={value} onChange={(v) => onChange(v)} />
      </label>
    );
  }
  if (typeof value === "number") {
    return (
      <label className="block">
        {label && (
          <span className="mb-1 block text-xs font-medium text-neutral-500">
            {humanize(label)}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="w-40 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </label>
    );
  }
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
        />
        {label && (
          <span className="text-sm font-medium text-neutral-700">{humanize(label)}</span>
        )}
      </label>
    );
  }

  // --- arrays -------------------------------------------------------------
  if (Array.isArray(value)) {
    const arr = value as Json[];
    const setItem = (i: number, v: Json) => {
      const next = [...arr];
      next[i] = v;
      onChange(next);
    };
    const remove = (i: number) => onChange(arr.filter((_, j) => j !== i));
    const move = (i: number, dir: -1 | 1) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return;
      const next = [...arr];
      [next[i], next[j]] = [next[j], next[i]];
      onChange(next);
    };
    const add = () => onChange([...arr, arr.length ? emptyLike(arr[0]) : ""]);

    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50/60">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-3 py-2 text-left"
        >
          <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-700">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            {label ? humanize(label) : "Items"}
            <span className="ml-1 rounded-full bg-neutral-200 px-1.5 text-xs font-normal text-neutral-600">
              {arr.length}
            </span>
          </span>
        </button>
        {open && (
          <div className="space-y-3 px-3 pb-3">
            {arr.map((item, i) => (
              <div
                key={i}
                className="relative rounded-md border border-neutral-200 bg-white p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-400">#{i + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="rounded p-1 text-neutral-400 hover:bg-neutral-100 disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === arr.length - 1}
                      className="rounded p-1 text-neutral-400 hover:bg-neutral-100 disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="rounded p-1 text-red-400 hover:bg-red-50"
                      title="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <JsonValueEditor
                  value={item}
                  onChange={(v) => setItem(i, v)}
                  depth={depth + 1}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={add}
              className="flex items-center gap-1.5 rounded-md border border-dashed border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:border-amber-400 hover:text-amber-700"
            >
              <Plus size={13} /> Add item
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- objects ------------------------------------------------------------
  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    const entries = Object.entries(obj);
    const setKey = (k: string, v: Json) => onChange({ ...obj, [k]: v });

    const body = (
      <div className="space-y-3">
        {entries.map(([k, v]) => (
          <JsonValueEditor
            key={k}
            label={k}
            value={v}
            onChange={(nv) => setKey(k, nv)}
            depth={depth + 1}
          />
        ))}
      </div>
    );

    if (depth === 0) return body;

    return (
      <div className="rounded-lg border border-neutral-200 bg-white">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-1.5 px-3 py-2 text-left text-sm font-semibold text-neutral-700"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {label ? humanize(label) : "Group"}
        </button>
        {open && <div className="px-3 pb-3">{body}</div>}
      </div>
    );
  }

  // null / undefined
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-xs font-medium text-neutral-500">
          {humanize(label)}
        </span>
      )}
      <StringField
        value={value == null ? "" : String(value)}
        onChange={(v) => onChange(v)}
      />
    </label>
  );
}
