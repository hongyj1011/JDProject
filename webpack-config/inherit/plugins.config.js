var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pathManager = require('../../src/Tools/pathManager.js');
// var pageArr = require('../Base/page-entries.config.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../Tools/base.config.js');

var configPlugins = [
/* 抽取出所有通用的部分 */
// new webpack.optimize.CommonsChunkPlugin({
//   names: config.commonsChunkName,
//   filename: config.assetsSubDirectory + '/js/[name].js',
//   minChunks: 3
// }),
new ExtractTextPlugin({
  filename: config.assetsSubDirectory + '/css/[name].[contenthash:9].css',
  allChunks: true
}),
new CopyWebpackPlugin([{
  from: pathManager.publicDir,
  to:config.assetsSubDirectory
}])

];
config.entries.forEach(function (entry) {
  var options = {
    filename: entry.filename,
    template: entry.template,
    chunks: [entry.entryName],
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