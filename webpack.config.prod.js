const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'browserslist',
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
  },

  entry: {
    'assets/scripts/vendor': './src/scripts/vendor.js',
    'assets/scripts/app': './src/scripts/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundel.js',
    clean: true,
  },
  devServer: {
    compress: true,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { useBuiltIns: 'usage', corejs: { version: 3 } },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/dist/',
            },
          },
          'css-loader',
          'postcss-loader',
          'resolve-url-loader', // add this before sass-loader
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        include: [/fonts/],
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(gif|svg|png|jpe?g)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/url/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      // excludeChunks: ['assets/js/vendor'],
    }),

    new MiniCssExtractPlugin({
      filename: 'assets/styles/[contenthash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyPlugin({
      patterns: [{ from: './src/assets/media', to: 'assets/' }],
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
  ],
};

function multipleHtmlPage() {
  let htmlPageNames = [
    'account-address',
    'account-info',
    'account-orderList',
    'account-resetPassword',
    'account-userEdit',
    'account-userFactors',
    'account-wallet',
    'account',
    'index',
    'login',
    'product-details',
    'product-list',
    'product-list2',
    'shoppingCart',
    'signup',
  ];
  let multipleHtmlPlugins = htmlPageNames.map((name) => {
    return new HtmlWebpackPlugin({
      template: `./src/${name}.html`,
      filename: `${name}.html`,
      chunks: ['assets/scripts/app', 'assets/scripts/vendor'],
      hash: true,
    });
  });

  return multipleHtmlPage;
}
