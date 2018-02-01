var pathManager = require("./src/Tools/pathManager.js");
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	devtool: 'eval-source-map',//开发阶段使用，生产不要用
	entry: __dirname + "/js/index/index.js", //已多次提及的唯一入口文件
	output: {
		path: __dirname, //打包后的文件存放的地方
		filename: "bundle.[chunkhash].js" //打包后输出文件的文件名
	},
	resolve: require('./webpack-config/resolve.config.js'),
	module: {
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
				test: /\.jpg$/,
				loader: "file-loader"
			}, {
				test: /\.png$/,
				loader: "url-loader?mimetype=image/png"
			}, {
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
	},
	plugins: [
		new HtmlWebpackPlugin({ //自动生成HTML文件
			filename: 'index.html',
			template: 'indexArt.html',
			inject: true
		}),
		new CleanWebpackPlugin(
			['bundle.*.js'], 　 //匹配删除的文件
			{
				root: __dirname,
				　　　　　　　　　　 //根目录
				verbose: true,
				　　　　　　　　　　 //开启在控制台输出信息
				dry: false　　　　　　　　　　 //启用删除文件
			}
		)
	]
}