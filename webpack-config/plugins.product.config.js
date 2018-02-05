var webpack = require('webpack');
var pluginsConfig = require('./inherit/plugins.config.js');

pluginsConfig.push(new webpack.DefinePlugin({//判断是否生产环境
  IS_PRODUCTION: true,
}));
pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
  comments: false,        //去掉注释
  compress: {//js压缩
    warnings: false,
  },
}));
module.exports = pluginsConfig;