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
			test: /\.(html|art)$/,
			use: {
				loader: 'html-loader'
			}
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						// name: config.assetsSubDirectory + '/images/[name].[hash:9].[ext]',
						name: '[name].[hash:9].[ext]',
						outputPath: config.assetsSubDirectory + '/images/'
					}
				},
				{
					loader: 'image-webpack-loader' //图片压缩
				}
			]
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: config.assetsSubDirectory + '/iconFonts/[name].[hash:9].[ext]',
					publicPath: process.env.NODE_ENV === 'development' ?
						config.dev.assetsPublicPath :
						config.build.assetsPublicPath
				}
			}]
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				// publicPath:'../../../',
				use: [{
						loader: 'css-loader',
						options: {
							minimize: process.env.NODE_ENV === 'production',//css压缩
							importLoaders: 1
						},

					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							config: {
								path: 'postcss.config.js' // 这个得在项目根目录创建此文件
							}
						}
					}
				]
			})
		},
		{
			test: /\.ejs$/,
			loader: "art-template-loader",
		}
		// {
		// 	test: /\.art$/,
		// 	use: [
		// 		{
		// 		  loader: 'art-template-loader'
		// 		}
		// 	]
		//  }

	]
};
