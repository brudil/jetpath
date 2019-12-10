const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./webpack.base.config.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = 'source-map';

config.output = {
  path: path.resolve(path.join(__dirname, 'dist')),
  publicPath: '/',
  filename: 'Jetpath.[name].[hash].min.js',
  chunkFilename: '[name].[hash].[id].min.js',
};

config.plugins = config.plugins.concat([
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json',
  }),
  new CopyWebpackPlugin([{ from: './src/root', to: './' }]),
]);

config.module.rules = config.module.rules.concat([
  { test: /\.js?$/, use: ['babel-loader'], exclude: /node_modules/ },
]);

module.exports = config;
