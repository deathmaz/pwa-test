const webpack = require('webpack');
const helpers = require('./helpers.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const portfinder = require('portfinder');

const {
  merge,
} = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = async function() {
  const port = await portfinder.getPortPromise({
    port: 8080,
  });

  return merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      inline: true,
      host: '0.0.0.0',
      port,
      contentBase: helpers.getSrcPath('public'),
      proxy: {
        '/api': process.env.WEBPACK_SERVER_PROXY,
      },
      historyApiFallback: true,
      publicPath: '/',
    },
    output: {
      publicPath: '/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: helpers.getSrcPath('/templates/app.ejs'),
        filename: 'index.html',
        chunks: [
          'app',
        ],
      }),
    ],
  });
};
