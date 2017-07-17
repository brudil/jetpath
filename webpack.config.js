const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction ? require('./webpack.prod.config.js') : require('./webpack.base.config.js');

module.exports = config;
