import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

// The blog now lives at /blog. This page was the old /insights listing; it is
// kept only so the already-live URL doesn't 404. It points search engines and
// visitors at /blog (canonical + noindex + client redirect + a visible link).
export const metadata: Metadata = {
  title: { absolute: "Solar Blog | Sunprime Energy Solutions" },
  description:
    "Insights on solar EPC engineering, net-metering, Tier-1 BOM, subsidy, and O&M from Sunprime Energy Solutions.",
  alternates: { canonical: `${site.url}/blog` },
  robots: { index: false, follow: true },
};

export default function InsightsRedirect() {
  return (
    <>
      {/* Client-side redirect for visitors (static export can't 301). */}
      <meta httpEquiv="refresh" content="0; url=/blog/" />
      <section className="flex min-h-[60svh] items-center justify-center px-6 pt-32 text-center">
        <div>
          <p className="text-[13px] uppercase tracking-[0.16em] text-ink/45">
            Our insights have moved
          </p>
          <h1 className="mt-4 text-[28px] font-semibold tracking-tight">
            The blog now lives at{" "}
            <Link href="/blog/" className="text-amber underline underline-offset-4">
              /blog
            </Link>
          </h1>
          <p className="mt-4 text-[15px] text-ink/60">
            You&rsquo;ll be redirected automatically.
          </p>
        </div>
      </section>
    </>
  );
}
