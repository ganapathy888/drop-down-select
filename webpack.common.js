// Imports
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Export
module.exports = {
 module: {
  rules: [
   { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
 },
 plugins: [
   new CleanWebpackPlugin(['dist']),
 ],
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist')
 }
};
