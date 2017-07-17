// var mixins = require('./src/css/mixins');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('lost')(),
    require('postcss-cssnext')
  ]
};
