import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Cap the ladder at 1920. Nothing on this page renders wider than ~1440
    // CSS pixels, so 2560/3840 variants only ask the optimiser to upscale
    // source files it already has at native size — slow, and no sharper.
    deviceSizes: [420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [160, 240, 320, 400, 512],
  },
};

export default nextConfig;
