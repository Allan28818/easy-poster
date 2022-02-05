const path = require("path");
const withPwa = require("next-pwa");

module.exports = withPwa({
  pwa: {
    dest: "out",
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
