var webpack = require('webpack');
var pluginsConfig = require('./inherit/plugins.config.js');

pluginsConfig.push(new webpack.DefinePlugin({//判断是否生产环境
  IS_PRODUCTION: true,
}));

module.exports = pluginsConfig;