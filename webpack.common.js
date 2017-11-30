// Imports
const path = require('path');

// Export
module.exports = {
 module: {
  rules: [
   { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
 },
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'build')
 }
};
