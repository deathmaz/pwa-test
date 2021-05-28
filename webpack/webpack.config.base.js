const helpers = require('./helpers.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const rules = require('./rules.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: helpers.isProduction ? 'production' : 'development',
  devtool: helpers.isProduction ? 'source-map' : 'eval-source-map',
  entry: {
    app: [
      helpers.getSrcPath('/js/app.ts'),
    ],
    offline: [
      helpers.getSrcPath('/js/offline.ts'),
    ],
  },
  performance: {
    hints: false,
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
  ],
};
