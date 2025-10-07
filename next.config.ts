import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import webpack from "webpack";

const nextConfig: NextConfig = {
  /* config options here */
  // webpack: (config: Configuration, { isServer }) => {
  //   if (isServer) {
  //     config.plugins = config.plugins || [];
  //     config.plugins.push(
  //       new webpack.BannerPlugin({
  //         banner: "import "reflect-metadata";",
  //         raw: true,
  //         entryOnly: true,
  //       })
  //     );
  //   }
  //   return config;
  // },
};

export default nextConfig;
