var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pathManager = require('../../src/Tools/pathManager.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../Tools/base.config.js');

var configPlugins = [

/* 抽取出所有通用的部分 */
new webpack.optimize.CommonsChunkPlugin({
  name: config.commonsChunkName,      // 需要注意的是，chunk的name不能相同！！！
  filename: config.assetsSubDirectory + '/js/commons/[name].[hash].js',
  minChunks: 2,
}),

/* 抽取出webpack的runtime代码()，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */
// new webpack.optimize.CommonsChunkPlugin({
//   name: 'webpack-runtime',
//   filename: config.assetsSubDirectory + '/js/commons/webpack-runtime.[hash].js',
// }),

new ExtractTextPlugin({
  filename: config.assetsSubDirectory + '/css/[name].[contenthash:9].css',
  allChunks: true
}),

new CopyWebpackPlugin([{
  from: pathManager.assetsDir,
  to:config.assetsSubDirectory
}]),

/* HashedModuleIdsPlugin 这个插件，他是根据模块的相对路径生成一个长度只有四位的字符串作为模块的 module id ，
这样就算引入了新的模块，也不会影响 module id 的值，只要模块的路径不改变的话。 */
new webpack.HashedModuleIdsPlugin({}),


];

config.entries.forEach(function (entry) {
  var chunksArr = config.commonsChunkName.concat(entry.entryName);
  var options = {
    filename: entry.filename,
    template: entry.template,
    
    // chunks: ['commonCss','webpack-runtime','vendor',entry.entryName],
    chunks: chunksArr,
    env: process.env.NODE_ENV === 'development'
      ? JSON.parse(config.dev.env.NODE_ENV)
      : JSON.parse(config.build.env.NODE_ENV)
  }

  // if (process.env.NODE_ENV === 'production') {
  //   options.minify = htmlMinify
  // }

  // https://github.com/jantimon/html-webpack-plugin
  configPlugins.push(new HtmlWebpackPlugin(options))
});

module.exports = configPlugins;