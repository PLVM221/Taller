import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  typedRoutes: false,
  outputFileTracingRoot: process.cwd(),
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/Taller",
        assetPrefix: "/Taller/",
        trailingSlash: true,
        images: { unoptimized: true },
        env: { NEXT_PUBLIC_BASE_PATH: "/Taller" }
      }
    : {})
};

export default nextConfig;
