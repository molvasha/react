const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './main.js',
  },

  context: path.resolve(__dirname, "static_src"),
  output: {
    path: path.resolve(__dirname, "static", "build"),
    filename: 'app.js',
    publicPath: '/static/build/',
  },
  devtool: 'cheap-inline-module-source-map',
  devServer: {
    port: 9000,
    historyApiFallback: {
      index: 'index.html',
    },
  },


  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults"
              }],
              '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {loader: 'file-loader'},
        ],
      },
    ],
  },
};