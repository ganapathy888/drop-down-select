const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Copy Files
const copyWebpack = new CopyWebpackPlugin(
  [
    {
      from: './examples/index.html',
      to: 'index.html'
    }
  ]
);

// Config
module.exports = {
  entry: './examples/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
     contentBase: './build'
   },
  plugins: [copyWebpack]
};
