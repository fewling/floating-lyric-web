import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → cheap, fast hosting (Firebase Hosting `out/`), great SEO.
  output: "export",
  trailingSlash: true,
  // Required for `output: "export"`: no server-side image optimization.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
