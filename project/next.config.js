const path = require("path");
// const withPwa = require("next-pwa");

module.exports = {
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
};
