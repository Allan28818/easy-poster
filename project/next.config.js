const path = require("path");
// const withPwa = require("next-pwa");

module.exports = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
