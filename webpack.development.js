const path = require('path');

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
  }
};
