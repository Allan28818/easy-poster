const path = require("path");
const withPwa = require("next-pwa");

module.exports = withPwa({
  pwa: {
    dest: "public",
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "https://firebasestorage.googleapis.com",
      "https://lh3.googleusercontent.com",
    ],
    formats: ["image/webp"],
    loader: "akamai",
    path: "",
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
