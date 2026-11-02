import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  async redirects() {
    return [
      {
        source: "/categoria/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
