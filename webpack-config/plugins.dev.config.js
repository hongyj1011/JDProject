var pluginsConfig = require('./inherit/plugins.config.js');
var webpack = require('webpack');
var pathManager = require('../src/Tools/pathManager.js');

pluginsConfig.push(new webpack.DefinePlugin({//判断是否生产环境
  IS_PRODUCTION: false,
}));
pluginsConfig.push(
  // new webpack.HotModuleReplacementPlugin()//热加载插件
)
module.exports = pluginsConfig;