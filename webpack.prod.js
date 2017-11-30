// Imports
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Copy Files
const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: './examples/index.html',
    to: 'index.html'
  }
]);

// SASS
const extractSass = new ExtractTextPlugin({
  filename: "bundle.css"
});

// Export
module.exports = merge(common, {
  entry: {
    app: './examples/index.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
              outputStyle: "compressed"
            }
        }]
      })
   }]
 },
 plugins: [
   new CleanWebpackPlugin(['docs']),
   new webpack.EnvironmentPlugin({
     NODE_ENV: 'production'
   }),
   new UglifyJSPlugin(),
   extractSass,
   copyWebpackPlugin
 ],
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'docs')
 }
});
