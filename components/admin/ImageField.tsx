"use client";

// Reusable image input: upload a file straight to Supabase storage (and get the
// public URL), with a live preview + remove, plus a fallback field to paste an
// existing URL/path. Used for blog cover images, OG images, etc.

import { useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { BUCKET } from "@/lib/tables";
import { Btn } from "./kit";
import { Upload, X, Loader2 } from "lucide-react";

export function ImageField({
  value,
  onChange,
  folder = "uploads",
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const upload = async (file: File) => {
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    setErr(null);
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `${folder}/${Date.now()}-${safe}`;
    const { error } = await sb.storage.from(BUCKET).upload(key, file, {
      cacheControl: "3600",
      upsert: false,
    });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    onChange(sb.storage.from(BUCKET).getPublicUrl(key).data.publicUrl);
  };

  return (
    <div className="flex items-start gap-3">
      {value ? (
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-24 w-32 rounded-md border border-neutral-200 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            title="Remove image"
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-white hover:bg-red-600"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-md border border-dashed border-neutral-300 text-xs text-neutral-400">
          No image
        </div>
      )}

      <div className="min-w-0 flex-1 space-y-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
        <Btn onClick={() => fileRef.current?.click()} disabled={busy}>
          {busy ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
          {busy ? "Uploading…" : "Upload image"}
        </Btn>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL / path"
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        {err && <p className="text-xs text-red-600">Upload failed: {err}</p>}
      </div>
    </div>
  );
}
