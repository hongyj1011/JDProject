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
	};
