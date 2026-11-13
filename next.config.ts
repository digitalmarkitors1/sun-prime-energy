import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → produces an `out/` folder of plain files for
  // upload to Hostinger (or any static host). No Node.js server needed.
  output: "export",
  // Directory-style URLs (/about/ → about/index.html) so clean links work on Apache.
  trailingSlash: true,
  images: {
    // Static export can't run Vercel's on-the-fly image optimizer.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
