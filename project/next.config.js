const path = require("path");
// const withPwa = require("next-pwa");

module.exports = {
  // pwa: {
  //   dest: "public",
  // },
  resolve: {
    fallback: {
      fs: false,
    },
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
