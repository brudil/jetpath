module.exports = {
  webpackConfig: require('./webpack.dev.config.js'),
  require: ['babel-polyfill'],
  components: 'src/components/**/*.tsx',
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
};
