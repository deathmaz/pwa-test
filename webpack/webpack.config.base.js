const helpers = require('./helpers.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const rules = require('./rules.js');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: helpers.isProduction ? 'production' : 'development',
  devtool: helpers.isProduction ? 'source-map' : 'eval-source-map',
  entry: {
    app: [
      helpers.getSrcPath('/js/app.ts'),
    ],
  },
  performance: {
    hints: false,
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../public/dist'),
    filename: helpers.isProduction ? '[name].[contenthash].js' : '[name].js',
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.ts',
      '.vue',
    ],
    alias: {
      ...require('./alias.js'),
    },
  },
  module: {
    rules: [
      ...rules.config(),
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        extensions: {
          vue: true,
          memoryLimit: 4096,
        },
      },
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
