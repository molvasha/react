const path = require("path");
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    app: './main.jsx',
  },
  context: path.resolve(__dirname, "static_src"),
  output: {
    path: path.resolve(__dirname, "static", "build"),
    filename: 'app.js',
    publicPath: '/static/build/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'static/build'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "static_src"),
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/env', '@babel/react'],
        }
      },
    ],
  },
};