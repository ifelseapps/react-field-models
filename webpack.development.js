const path = require('path');

const distFolder = path.resolve(__dirname, './demo/dist');

module.exports = {
  entry: './demo/index.tsx',
  output: {
    path: distFolder,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: distFolder,
    port: 4000,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /(node_modules)/,
      }
    ]
  }
};
