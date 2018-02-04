var path = require('path');
var moduleExports = {};

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../'); // 项目根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src'); // 项目业务代码根目录
moduleExports.assetsDir = path.resolve(moduleExports.srcRootDir, './Assets'); // 存放各个页面使用到的公共资源

moduleExports.vendorDir = path.resolve(moduleExports.assetsDir, './Vendor'); // 存放所有不能用npm管理的第三方库
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './Pages'); // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.componentsDir = path.resolve(moduleExports.assetsDir, './components'); // 存放组件，可以是纯HTML，也可以包含js/css/image等，看自己需要

moduleExports.imagesDir = path.resolve(moduleExports.assetsDir, './images');
moduleExports.configDir = path.resolve(moduleExports.assetsDir, './Config'); // 存放各种配置文件

moduleExports.logicDir = path.resolve(moduleExports.assetsDir, './logic'); // 存放公用的业务逻辑
moduleExports.libsDir = path.resolve(moduleExports.assetsDir, './libs');  // 与业务逻辑无关的库都可以放到这里

moduleExports.layoutDir = path.resolve(moduleExports.assetsDir, './layout'); // 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
//
//// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './Build'); // 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
module.exports = moduleExports;
