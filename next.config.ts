import type { NextConfig } from "next";
import createNectIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: false,
  },
};

const withNextIntl = createNectIntlPlugin();

export default withNextIntl(nextConfig);
