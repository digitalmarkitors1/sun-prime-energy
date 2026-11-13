"use client";

// Global site content editor — the whole `site` object (content_singletons,
// key='site'), edited through the recursive JsonValueEditor so every field is
// reachable. Top-level sections are collapsible for navigation.

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/tables";
import { JsonValueEditor } from "./JsonValueEditor";
import { Btn, SaveBar, Spinner, useUnsavedGuard } from "./kit";
import { ChevronDown, ChevronRight } from "lucide-react";

type SiteObj = Record<string, unknown>;

function humanize(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function ContentTab() {
  const [data, setData] = useState<SiteObj | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  useUnsavedGuard(dirty);

  useEffect(() => {
    (async () => {
      const sb = getSupabase();
      if (!sb) return;
      const { data: row, error } = await sb
        .from(TABLES.content)
        .select("data")
        .eq("key", "site")
        .maybeSingle();
      if (error) setStatus(`Load error: ${error.message}`);
      setData((row?.data as SiteObj) ?? {});
      setLoading(false);
    })();
  }, []);

  const setSection = (key: string, value: unknown) => {
    setData((d) => ({ ...(d as SiteObj), [key]: value }));
    setDirty(true);
    setStatus(null);
  };

  const save = async () => {
    const sb = getSupabase();
    if (!sb || !data) return;
    setSaving(true);
    setStatus(null);
    const { error } = await sb
      .from(TABLES.content)
      .upsert({ key: "site", data }, { onConflict: "key" });
    setSaving(false);
    if (error) setStatus(`Save failed: ${error.message}`);
    else {
      setDirty(false);
      setStatus("Saved to database. Hit Publish to push live.");
    }
  };

  if (loading) return <Spinner label="Loading site content…" />;
  if (!data) return null;

  const keys = Object.keys(data);

  return (
    <div>
      <p className="mb-4 text-sm text-neutral-500">
        Every section of the website&rsquo;s content. Edit any field, then{" "}
        <strong>Save changes</strong>. Changes go live after you run{" "}
        <code className="rounded bg-neutral-100 px-1">Publish</code>.
      </p>

      <div className="space-y-2">
        {keys.map((key) => {
          const isOpen = openKey === key;
          return (
            <div key={key} className="rounded-lg border border-neutral-200 bg-white">
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                className="flex w-full items-center gap-2 px-4 py-3 text-left"
              >
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="font-semibold text-neutral-800">{humanize(key)}</span>
              </button>
              {isOpen && (
                <div className="border-t border-neutral-100 px-4 py-4">
                  <JsonValueEditor
                    value={data[key]}
                    onChange={(v) => setSection(key, v)}
                    depth={0}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SaveBar onSave={save} saving={saving} status={status} dirty={dirty} />
      <div className="mt-2">
        <Btn
          variant="ghost"
          size="sm"
          onClick={() => {
            if (openKey) setOpenKey(null);
          }}
        >
          Collapse section
        </Btn>
      </div>
    </div>
  );
}
