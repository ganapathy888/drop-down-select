// Imports
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: "./examples/index.html",
    to: "index.html"
  }
]);

// Export
module.exports = merge(common, {
  entry: {
    app: "./examples/index.js"
  },
  devServer: {
    contentBase: "./build"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(["build"]), copyWebpackPlugin]
});
