const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const path = require('path');
const _ = require('lodash');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = process.env.NODE_ENV === 'production';

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};

_.assign(env, {
  build: (env.production || env.staging),
});

module.exports = {
  target: 'web',

  entry: './src/application.js',

  output: {
    path: path.join(__dirname),
    publicPath: '/',
    filename: 'application.js',
  },

  resolve: {
    modules: [
      'web_modules',
      'node_modules',
      './src/images',
    ],
    moduleExtensions: ['js', 'svg'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${NODE_ENV}'`,
      },
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: `\\${NODE_ENV}\\`,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
      title: 'Loading - Jetpath',
      template: './src/entry.ejs',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Loading - Jetpath',
      template: './src/entry.ejs',
      inject: false,
      filename: '200.html',
    }),
    // new FaviconsWebpackPlugin({
    //   logo: './src/images/favicon-2048-black.png',
    //   icons: {
    //     favicons: true,
    //     android: isProduction,
    //     appleIcon: isProduction,
    //     windows: isProduction,
    //     firefox: isProduction,
    //     opengraph: false,
    //     yandex: false,
    //     coast: false,
    //     appleStartup: false,
    //   },
    // }),
  ],

  module: {
    loaders: [
      // { test: /react\-select\.css$/, loader: 'style!css' },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader', exclude: /node_modules/ },
      { test: /\.svg$/, loader: 'file-loader' },
    ],

    noParse: /\.min\.js/,
  },
};
