const helpers = require('./helpers.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const excludeRegex = /node_modules\/(?!(normalize\.css)\/).*/;
module.exports.config = function(babelOptions) {
  return [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: babelOptions,
      },
    },
    {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        transpileOnly: true,
        appendTsSuffixTo: [
          /\.vue$/,
        ],
      },
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      exclude: excludeRegex,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: helpers.isProduction ? 'img/[name].[contenthash].[ext]' : 'img/[name].[ext]',
        esModule: false,
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      exclude: excludeRegex,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: helpers.isProduction ? 'fonts/[name].[contenthash].[ext]' : 'fonts/[name].[ext]',
      },
    },
    {
      test: /\.(scss|css)(\?.*)?$/,
      exclude: excludeRegex,

      use: [
        helpers.isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                postcssPresetEnv({
                  browsers: 'last 2 versions',
                }),
              ],
            },
          },
        },

        'sass-loader',
      ],
    },
  ];
};
