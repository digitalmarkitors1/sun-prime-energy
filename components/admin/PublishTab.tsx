"use client";

// "Publish to Live" — records a publish request in the database. A GitHub Action
// polls for it, then builds the site and uploads it to Hostinger (~2–5 min).
// No secret tokens touch the browser: the button just writes an authenticated
// row, exactly like saving content.

import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/tables";
import { Btn, Spinner } from "./kit";
import { Rocket, CheckCircle2, Clock, Loader2 } from "lucide-react";

type PublishData = { requestedAt?: string; publishedAt?: string };

function fmt(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export function PublishTab() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState<PublishData>({});
  const [msg, setMsg] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const read = async (): Promise<PublishData> => {
    const sb = getSupabase();
    if (!sb) return {};
    const { data: row } = await sb
      .from(TABLES.content)
      .select("data")
      .eq("key", "publish")
      .maybeSingle();
    return (row?.data as PublishData) ?? {};
  };

  useEffect(() => {
    read().then((d) => {
      setData(d);
      setLoading(false);
    });
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // Live while a publish is in flight (requested but not yet published).
  const live =
    data.requestedAt && (!data.publishedAt || data.publishedAt < data.requestedAt);

  const requestPublish = async () => {
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    setMsg(null);
    const requestedAt = new Date().toISOString();
    const { error } = await sb
      .from(TABLES.content)
      .upsert({ key: "publish", data: { ...data, requestedAt } }, { onConflict: "key" });
    setBusy(false);
    if (error) {
      setMsg(`Could not request publish: ${error.message}`);
      return;
    }
    setData((d) => ({ ...d, requestedAt }));
    setMsg("Publish requested — your changes will be live in a couple of minutes.");
    // Poll until the Action marks it published.
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const d = await read();
      setData(d);
      if (d.publishedAt && d.requestedAt && d.publishedAt >= d.requestedAt) {
        if (pollRef.current) clearInterval(pollRef.current);
        setMsg("✓ Published — your changes are now live on sunpesolutions.com");
      }
    }, 15000);
  };

  if (loading) return <Spinner label="Loading publish status…" />;

  return (
    <div className="max-w-xl">
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <Rocket size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-neutral-900">Publish to Live</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Pushes everything you&rsquo;ve saved (blog, pages, SEO, images) to the
              live website. It takes a couple of minutes to appear.
            </p>

            <div className="mt-5">
              <Btn onClick={requestPublish} disabled={busy || Boolean(live)}>
                {busy ? <Loader2 className="animate-spin" size={16} /> : <Rocket size={16} />}
                {busy ? "Requesting…" : live ? "Publishing…" : "Publish to Live"}
              </Btn>
            </div>

            {msg && (
              <div className="mt-4 flex items-start gap-2 rounded-md bg-neutral-50 p-3 text-sm text-neutral-700">
                {msg.startsWith("✓") ? (
                  <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={16} />
                ) : live ? (
                  <Loader2 className="mt-0.5 shrink-0 animate-spin text-amber-600" size={16} />
                ) : null}
                <span>{msg}</span>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-4 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Clock size={13} /> Last requested
                </div>
                <div className="mt-1 text-neutral-700">{fmt(data.requestedAt)}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <CheckCircle2 size={13} /> Last published
                </div>
                <div className="mt-1 text-neutral-700">{fmt(data.publishedAt)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        Tip: save your edits in each tab first, then come here and click Publish.
        You can keep working — it publishes in the background.
      </p>
    </div>
  );
}
