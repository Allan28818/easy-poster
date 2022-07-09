const path = require("path");
const withPwa = require("next-pwa");

module.exports = withPwa({
  pwa: {
    dest: "public",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    formats: [
      "image/avif",
      "image/webp",
      "image/png",
      "image/gif",
      "image/jpg",
    ],
  },
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
});
