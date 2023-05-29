const { resolve } = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
};
