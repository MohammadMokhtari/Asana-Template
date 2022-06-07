const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    'assets/scripts/vendor': './src/scripts/vendor.js',
    'assets/scripts/app': './src/scripts/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundel.js',
    clean: true,
  },
  devServer: {
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  devtool: 'source-map',
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
          { loader: 'css-loader' },
          {
            loader: 'resolve-url-loader',
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
          },
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
      inject: 'head',
      scriptLoading: 'defer',
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
