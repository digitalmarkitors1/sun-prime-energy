"use client";

// Browser Supabase client for the /admin dashboard. Persists the auth session
// in localStorage so the editor stays logged in across reloads. Safe for a
// static site: all admin reads/writes go straight from the browser to Supabase,
// gated by Row Level Security + an authenticated session.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anon);

let client: SupabaseClient | null = null;

/** Returns the singleton browser client, or null if env isn't configured. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url as string, anon as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}
