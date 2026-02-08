import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 🔥 FIX: Make cookies(), headers(), nextUrl synchronous
  experimental: {
    syncCookies: true,
    // (Optional) Prevent automatic async promotion of layout
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;
