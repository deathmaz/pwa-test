const helpers = require('./helpers.js');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  merge,
} = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../dist'),
    filename: helpers.isProduction ? '[name].[contenthash].js' : '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: helpers.isProduction ? '[name].[contenthash].css' : '[name].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: helpers.getSrcPath('/templates/app.ejs'),
      filename: helpers.getSrcPath('../dist/index.html'),
      chunks: [
        'app',
      ],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: helpers.getSrcPath('/templates/offline.ejs'),
      filename: helpers.getSrcPath('../dist/offline.html'),
      chunks: [
        'offline',
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: helpers.getSrcPath('/js/service-worker.js'),
      swDest: helpers.getSrcPath('../dist/service-worker.js'),
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
