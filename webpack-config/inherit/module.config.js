var pathManager = require('../../src/Tools/pathManager.js');
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
	{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192&name=./images/[hash:8].[name].[ext]'},
	// {
	// 	// 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
	// 	// 如下配置，将小于8192byte的图片转成base64码
	// 	test: /\.(png|jpg|gif|webp|svg)$/,
	// 	// include: pathManager.srcRootDir,
	// 	// loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
	// 	loader: 'url-loader',
	// 	options: {
	// 		limit: 8192,
	// 		name: './PublicResource/img/[hash].[ext]',
	// 	}
	// },

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
