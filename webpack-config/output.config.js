var pathManager = require('../src/Tools/pathManager.js');
module.exports = {
  path: pathManager.buildDir,
  filename: '[name]/entry.[chunkhash].js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
  chunkFilename: '[id].[chunkhash].bundle.js',
};