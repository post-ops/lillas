import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lilaas.no", pathname: "/wp-content/**" },
    ],
  },
};

export default nextConfig;
