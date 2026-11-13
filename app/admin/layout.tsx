import type { Metadata } from "next";

// The admin dashboard must never be indexed.
export const metadata: Metadata = {
  title: "Admin — Sunprime CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
