const helpers = require('./helpers.js');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  merge,
} = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
module.exports = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: helpers.isProduction
        ? '[name].[contenthash].css'
        : '[name].css',
      ignoreOrder: true,
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
