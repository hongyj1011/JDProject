const webpack = require('webpack');
var pathManager = require("./src/Tools/pathManager.js");
module.exports = {
  output: {
    path: pathManager.dllDir,
    filename: '[name].js',
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    /*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */
    dll: [
      'jquery',
      './Vendor/mock-min.js', './Vendor/swiper.min.js',
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: pathManager.staticRootDir, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    /* 跟业务代码一样，该兼容的还是得兼容 */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  module: require('./webpack-config/module.product.config.js'), // 沿用业务代码的module配置
  resolve: require('./webpack-config/resolve.config.js'), // 沿用业务代码的resolve配置
};