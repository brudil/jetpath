// var mixins = require('./src/css/mixins');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-ant'),
    require('lost')(),
    require('postcss-cssnext')
  ]
};
