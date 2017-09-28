const webpack = require('webpack');
const config = require('./webpack.base.config.js');

config.devServer = {
  historyApiFallback: true,
};

config.devtool = 'inline-source-map';

config.plugins = config.plugins.concat([new webpack.NoEmitOnErrorsPlugin()]);

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.js?$/,
    loaders: ['babel-loader?cacheDirectory'],
    exclude: /node_modules/,
  },
]);

module.exports = config;
