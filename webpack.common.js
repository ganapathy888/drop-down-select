// Imports
const path = require('path');

// Export
module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'dropdown-select': path.resolve(__dirname, 'src/index'),
    },
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};
