import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Disable all Next.js DevTools injections
 

  experimental: {
   
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;
