var config = require('./Tools/base.config.js');
var pathManager = require('../src/Tools/pathManager.js');
module.exports = {
  filename: 'Assets/js/[name].[chunkhash:9].js',
  path: pathManager.buildDir,
  publicPath: config.dev.assetsPublicPath
  // publicPath: pathManager.buildDir
};