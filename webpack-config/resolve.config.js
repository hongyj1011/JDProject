var path = require('path');
var pathManager = require("../src/Tools/pathManager.js");
module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    /* 各种目录 */
    iconfontDir: path.resolve(pathManager.assetsDir, 'iconfont/'),
    configDir: pathManager.configDir,
    vendorDir: pathManager.vendorDir,
    srcRootDir : pathManager.srcRootDir,
    imagesDir : pathManager.imagesDir,
    assetsDir :pathManager.assetsDir,
    componentsDir: pathManager.componentsDir,
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['.js', '.css', '.less'],
};
