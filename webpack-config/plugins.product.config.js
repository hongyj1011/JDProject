var webpack = require('webpack');
var pluginsConfig = require('./inherit/plugins.config.js');

pluginsConfig.push(new webpack.DefinePlugin({//判断是否生产环境
  IS_PRODUCTION: true,
}));
pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
}));
module.exports = pluginsConfig;