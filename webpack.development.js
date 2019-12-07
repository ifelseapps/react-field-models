const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const distFolder = path.resolve(__dirname, './demo');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: distFolder,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
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
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, './node_modules/bootstrap/dist/css/bootstrap.min.css'), to: distFolder }
    ])
  ]
};
