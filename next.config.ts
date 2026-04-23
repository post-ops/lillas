import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lilaas.no", pathname: "/wp-content/**" },
    ],
  },
};

export default nextConfig;
