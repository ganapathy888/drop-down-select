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
