import { withSentryConfig } from "@sentry/nextjs";
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
  // experimental: {
  //   optimizeCss: false,
  //   webpackMemoryOptimizations: true,
  // },
  // webpack: (config) => {
  //   config.cache = false;
  //   return config;
  // },
  // productionBrowserSourceMaps: false,
};

const withNextIntl = createNectIntlPlugin();

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "naveen-raj-oy",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    disable: true,
  },
});
