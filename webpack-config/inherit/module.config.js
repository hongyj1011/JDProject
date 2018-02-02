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
					name: config.assetsSubDirectory + '/images/[name].[hash:9].[ext]',
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
					name: config.assetsSubDirectory + '/iconFonts/[name].[hash:9].[ext]',
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
	}

	]
};
