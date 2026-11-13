"use client";

// Media manager — upload images to the Supabase "media" bucket and copy their
// public URLs to paste into image fields (hero image, industry cards, etc.).

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { BUCKET } from "@/lib/tables";
import { Btn, Spinner } from "./kit";
import { Upload, Copy, Check, Trash2 } from "lucide-react";

type Item = { name: string; url: string };

export function MediaTab() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data, error } = await sb.storage.from(BUCKET).list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      setStatus(`List error: ${error.message}`);
      setLoading(false);
      return;
    }
    const list = (data ?? [])
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => ({
        name: f.name,
        url: sb.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      }));
    setItems(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (files: FileList | null) => {
    const sb = getSupabase();
    if (!sb || !files || files.length === 0) return;
    setUploading(true);
    setStatus(null);
    for (const file of Array.from(files)) {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const key = `${Date.now()}-${safe}`;
      const { error } = await sb.storage.from(BUCKET).upload(key, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) setStatus(`Upload failed (${file.name}): ${error.message}`);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    await load();
  };

  const copy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  const del = async (name: string) => {
    const sb = getSupabase();
    if (!sb) return;
    if (!confirm(`Delete "${name}"?`)) return;
    const { error } = await sb.storage.from(BUCKET).remove([name]);
    if (error) setStatus(`Delete failed: ${error.message}`);
    await load();
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => onUpload(e.target.files)}
        />
        <Btn onClick={() => fileRef.current?.click()} disabled={uploading}>
          <Upload size={15} /> {uploading ? "Uploading…" : "Upload images"}
        </Btn>
        {status && <span className="text-xs text-neutral-500">{status}</span>}
      </div>
      <p className="mb-4 text-sm text-neutral-500">
        Upload an image, then <strong>Copy URL</strong> and paste it into an image
        field (e.g. Hero image, industry cards) in the Content tab.
      </p>

      {loading ? (
        <Spinner label="Loading media…" />
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-400">No uploads yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((it) => (
            <div key={it.name} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.url} alt={it.name} className="h-32 w-full object-cover" />
              <div className="p-2">
                <p className="truncate text-xs text-neutral-500" title={it.name}>
                  {it.name}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <Btn size="sm" variant="ghost" onClick={() => copy(it.url)}>
                    {copied === it.url ? <Check size={12} /> : <Copy size={12} />}
                    {copied === it.url ? "Copied" : "Copy URL"}
                  </Btn>
                  <Btn size="sm" variant="danger" onClick={() => del(it.name)}>
                    <Trash2 size={12} />
                  </Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
