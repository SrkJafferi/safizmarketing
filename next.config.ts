import type { NextConfig } from "next";

/**
 * Every image in this project is a local file under `public/images`, imported
 * through a literal path — no remote hosts, no query strings, no custom loader.
 * So the image configuration stays deliberately empty rather than carrying
 * remote patterns that are not used.
 *
 * Two notes for whoever deploys this (Next 16 behaviour):
 *   - `images.domains` is deprecated; use `images.remotePatterns` if remote
 *     imagery is ever added.
 *   - `images.qualities` now defaults to `[75]` only. The components here never
 *     pass a `quality` prop, so the default is what renders everywhere.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Modern formats first; the source JPEGs are already correctly sized.
    formats: ["image/avif", "image/webp"],

    // Kept explicit so the breakpoints are reviewable rather than implicit.
    deviceSizes: [360, 430, 640, 828, 1080, 1280, 1440, 1920, 2560],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
