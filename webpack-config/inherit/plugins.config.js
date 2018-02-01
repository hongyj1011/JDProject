var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pathManager = require('../../src/Tools/pathManager.js');
var pageArr = require('../Base/page-entries.config.js');
var configPlugins = [
/* 抽取出所有通用的部分 */
new webpack.optimize.CommonsChunkPlugin({
    name: 'commons/commons',      // 需要注意的是，chunk的name不能相同！！！
    filename: '[name]/bundle.[chunkhash].js',
    minChunks: 3,
}),
];
pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/page.html`,
    template: path.resolve(pathManager.pagesDir, `./${page}/indexArt.html`),
    chunks: ['commons/commons',page],//指定引入的js文件
//  hash: true, // 为静态资源生成hash值
    xhtml: true,
  });
  configPlugins.push(htmlPlugin);
});
module.exports = configPlugins;