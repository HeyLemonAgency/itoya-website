import type { NextConfig } from "next";

/**
 * The pitch preview must stay out of search engines. Set SITE_INDEXABLE=true
 * only when the site goes live on the real domain (see docs/PROJECT_NOTES.md).
 */
const indexable = process.env.SITE_INDEXABLE === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 256, 384],
    qualities: [60, 70, 75, 80],
  },
  // Old Wix URLs → new routes, so existing links and bookmarks keep working.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/buffet-midi", destination: "/formules#midi", permanent: true },
      { source: "/buffet-soir", destination: "/formules#soir", permanent: true },
      { source: "/galerie", destination: "/le-lieu", permanent: true },
      { source: "/reservations", destination: "/reservation", permanent: true },
    ];
  },
  async headers() {
    if (indexable) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
