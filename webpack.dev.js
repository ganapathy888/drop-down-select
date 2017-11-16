// Imports
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Export
module.exports = merge(common, {
 entry: {
  app: './examples/index.js'
 },
 devtool: 'inline-source-map',
 devServer: {
   contentBase: './dist'
 },
 module: {
     rules: [{
         test: /\.scss$/,
         use: [{
             loader: "style-loader" // creates style nodes from JS strings
         }, {
             loader: "css-loader" // translates CSS into CommonJS
         }, {
             loader: "sass-loader" // compiles Sass to CSS
         }]
     }]
 },
 plugins: [
   new CopyWebpackPlugin(
   [
     {
       from: './examples/index.html',
       to: 'index.html'
     }
   ])
 ]
});
