var pathManager = require('../../src/Tools/pathManager.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('../Tools/base.config.js');
module.exports = {
	rules: [{
		test: /(\.jsx|\.js)$/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					"env", "react"
				]
			}
		},
		exclude: /node_modules/
	},
	{
		test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: config.assetsSubDirectory + '/img/[name].[hash:9].[ext]',
					publicPath: process.env.NODE_ENV === 'development'
						? config.dev.assetsPublicPath
						: config.build.assetsPublicPath
				}
			}
		]
	},
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: config.assetsSubDirectory + '/font/[name].[hash:9].[ext]',
					publicPath: process.env.NODE_ENV === 'development'
						? config.dev.assetsPublicPath
						: config.build.assetsPublicPath
				}
			}
		]
	},
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [
				{
					loader: 'css-loader',
					options: {
					  minimize: process.env.NODE_ENV === 'production',
					  importLoaders: 1
					},
				}
			]
		})
	},
	{
		test: /\.art$/,
		loader: "art-template-loader",
		options: {
			// art-template options (if necessary)
			// @see https://github.com/aui/art-template
		}
	}
		//			{
		//				test: require.resolve('jquery'), // 此loader配置项的目标是NPM中的jquery
		//				loader: 'expose-load?$!expose-load?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
		//			},
	]
};
