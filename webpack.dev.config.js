require('./npm-scripts/before-build.script');
module.exports = {
	devtool: 'eval-source-map', //开发阶段使用，生产不要用
	
	entry: require('./webpack-config/entry.config.js'),

	output: require('./webpack-config/output.config.js'),

	module: require('./webpack-config/module.dev.config.js'),

	resolve: require('./webpack-config/resolve.config.js'),

	plugins: require('./webpack-config/plugins.dev.config.js'),

	externals: require('./webpack-config/externals.config.js'),

	devServer: require('./webpack-config/devServer.config.js'),
};