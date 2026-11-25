// Push the local `site` object (data/site.ts) up to Supabase, so the database
// (the source of truth that the build pulls from) matches local edits. Use this
// after editing home/site content in data/site.ts directly.
//
//   ADMIN_EMAIL=… ADMIN_PASSWORD=… npx tsx scripts/push-site.mjs
//
// Authenticates as the admin user (RLS allows that user to write), so no
// service/secret key is needed.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { site } from "../data/site.ts";

const here = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const raw = readFileSync(join(here, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}
loadEnv();

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!URL || !ANON || !EMAIL || !PASSWORD) {
  console.error("✗ Need NEXT_PUBLIC_SUPABASE_URL/ANON_KEY (.env.local) + ADMIN_EMAIL + ADMIN_PASSWORD env vars.");
  process.exit(1);
}

async function run() {
  const auth = await fetch(`${URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: ANON, "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const authJson = await auth.json();
  if (!authJson.access_token) throw new Error(`login failed: ${JSON.stringify(authJson)}`);

  const res = await fetch(`${URL}/rest/v1/sunprime_content_singletons`, {
    method: "POST",
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${authJson.access_token}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ key: "site", data: site }),
  });
  if (!res.ok) throw new Error(`upsert failed: ${res.status} ${await res.text()}`);
  console.log("✓ Pushed site content to Supabase.");
}

run().catch((e) => {
  console.error("✗", e.message);
  process.exit(1);
});
