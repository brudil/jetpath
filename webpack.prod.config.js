const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = 'source-map';

config.output = {
  path: path.resolve(path.join(__dirname, 'dist')),
  publicPath: '/',
  filename: 'bundle.[hash].min.js',
};

config.plugins = config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json',
  }),
  new BundleAnalyzerPlugin(),
]);

config.module.loaders = config.module.loaders.concat([
  { test: /\.js?$/, loaders: ['babel-loader'], exclude: /node_modules/ },
]);

module.exports = config;
