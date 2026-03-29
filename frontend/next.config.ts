import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel serverless deployments conflict with 'standalone' output, resulting in 404s.
  // We conditionally set this for Docker builds only.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
