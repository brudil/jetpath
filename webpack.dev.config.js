const webpack = require('webpack');
const config = require('./webpack.base.config.js');

if (process.env.NODE_ENV !== 'test') {
  config.entry = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    config.entry,
  ];
}

config.devServer = {
  historyApiFallback: true,
};

config.devtool = 'eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.NoEmitOnErrorsPlugin(),
]);

config.module.loaders = config.module.loaders.concat([
  { test: /\.js?$/, loaders: ['babel-loader?cacheDirectory'], exclude: /node_modules/ },
]);

module.exports = config;
