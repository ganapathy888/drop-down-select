// Imports
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// SASS
const extractSass = new ExtractTextPlugin({
  filename: "style.css"
});

// Export
module.exports = merge(common, {
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      })
   }]
 },
 plugins: [
   new UglifyJSPlugin(),
   extractSass
 ],
 output: {
   filename: '[name].min.js',
   path: path.resolve(__dirname, 'dist')
 }
});
