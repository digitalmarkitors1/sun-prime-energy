"use client";

// Sunprime CMS — single-page admin dashboard.
//
// Static-export friendly: this is a client component that talks straight to
// Supabase from the browser (auth + RLS). No server required, so it ships in
// the same static bundle uploaded to Hostinger.

import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { ContentTab } from "@/components/admin/ContentTab";
import { LandingTab } from "@/components/admin/LandingTab";
import { BlogTab } from "@/components/admin/BlogTab";
import { SeoTab } from "@/components/admin/SeoTab";
import { MediaTab } from "@/components/admin/MediaTab";
import { PublishTab } from "@/components/admin/PublishTab";
import { Btn, Field, Input, Spinner } from "@/components/admin/kit";
import { FileText, Globe, Newspaper, Search, Image as ImageIcon, Rocket, LogOut, Sun } from "lucide-react";

type TabId = "content" | "landing" | "blog" | "seo" | "media" | "publish";

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "content", label: "Site content", icon: FileText },
  { id: "landing", label: "Landing pages", icon: Globe },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "seo", label: "SEO", icon: Search },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "publish", label: "Publish", icon: Rocket },
];

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<TabId>("content");

  useEffect(() => {
    setMounted(true);
    const sb = getSupabase();
    if (!sb) {
      setChecking(false);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Avoid hydration mismatch — this page is entirely client-driven.
  if (!mounted) return null;

  if (!isSupabaseConfigured) return <NotConfigured />;
  if (checking)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner label="Checking session…" />
      </div>
    );
  if (!session) return <Login />;

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Sun className="text-amber-600" size={20} />
            <span className="font-semibold">Sunprime CMS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-neutral-400 sm:inline">
              {session.user.email}
            </span>
            <Btn variant="ghost" size="sm" onClick={() => getSupabase()?.auth.signOut()}>
              <LogOut size={13} /> Sign out
            </Btn>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                  tab === t.id
                    ? "border-amber-600 text-amber-700"
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {tab === "content" && <ContentTab />}
        {tab === "landing" && <LandingTab />}
        {tab === "blog" && <BlogTab />}
        {tab === "seo" && <SeoTab />}
        {tab === "media" && <MediaTab />}
        {tab === "publish" && <PublishTab />}
      </main>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) return;
    setBusy(true);
    setErr(null);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-6 flex items-center gap-2">
          <Sun className="text-amber-600" size={22} />
          <h1 className="text-lg font-semibold">Sunprime CMS</h1>
        </div>
        <div className="space-y-4">
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </Field>
          <Field label="Password">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <Btn type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Btn>
        </div>
      </form>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-3 text-xl font-semibold">Supabase not configured</h1>
      <p className="mb-4 text-sm text-neutral-600">
        Set your Supabase credentials in <code className="rounded bg-neutral-100 px-1">.env.local</code>,
        then restart the dev server:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-xs text-neutral-100">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # for seeding only`}
      </pre>
      <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-neutral-600">
        <li>Run the SQL in <code className="rounded bg-neutral-100 px-1">supabase/migrations/0001_init.sql</code></li>
        <li>Create an admin user in Supabase → Authentication → Users</li>
        <li>Run <code className="rounded bg-neutral-100 px-1">npm run seed</code> to load current content</li>
      </ol>
    </div>
  );
}
