var pluginsConfig = require('./inherit/plugins.config.js');
var webpack = require('webpack');
var pathManager = require('../src/Tools/pathManager.js');
pluginsConfig.push(
	new webpack.DllReferencePlugin({
	context: pathManager.staticRootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
	manifest: require('../manifest.json'), // 指定manifest.json
	name: 'dll', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
}));
pluginsConfig.push(new webpack.DefinePlugin({//判断是否生产环境
  IS_PRODUCTION: false,
}));
module.exports = pluginsConfig;