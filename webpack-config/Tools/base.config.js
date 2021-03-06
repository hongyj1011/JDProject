var path = require('path');
var fs = require('fs');
var entries = require('./entries.js');
var pathManager = require('../../src/Tools/pathManager.js');
var dirSrc = path.resolve(__dirname, '../../src/Pages')

// 单独处理项目首页
// 因为它的结构与其它页面不同
var entriesConfig = [
  {
    entryName: 'index/index',
    entry: path.resolve(pathManager.pagesDir, 'index/index.js'),
    filename: 'index.html',
    template: path.resolve(pathManager.srcRootDir, 'index.html')
  }
];

var excludeDirs = ['index'];
var dirPages = fs.readdirSync(dirSrc).filter(function (dirName) {
  return excludeDirs.indexOf(dirName) === -1 && fs.statSync(dirSrc + '/' + dirName).isDirectory()
})
dirPages.forEach(pageWalk)

function pageWalk (pageName) {
  var filemark = 'index'
  var entriesLength = entries.length

  for (var i = 0; i < entriesLength; i++) {
    if (pageName === entries[i].dir) {
      filemark = entries[i].name
      break
    }
  }

  var pagePath = path.resolve(dirSrc, pageName)
  var files = fs.readdirSync(pagePath)
  var fileHTML = filemark + '.html'
  var fileJS = filemark + '.js'

  if (files.indexOf(fileHTML) === -1 || files.indexOf(fileJS) === -1) return

  var filename = 'Pages/' + pageName + '/' + fileHTML;
  entriesConfig.push({
    entryName: pageName + '/' + filemark,
    entry: path.resolve(dirSrc, pageName, fileJS),
    filename: filename,
    template: path.resolve(pathManager.srcRootDir, filename)
  })

  var subDirs = files.filter(function (file) {
    return fs.statSync(pagePath + '/' + file).isDirectory()
  }).map(function (dirName) {
    return pageName + '/' + dirName
  })

  if (subDirs.length) {
    subDirs.forEach(pageWalk)
  }
}

module.exports = {
  entries: entriesConfig,
  assetsRoot : pathManager.buildDir,
  assetsSubDirectory: 'Assets',
  commonsChunkName: ['commons','vendor', 'manifest'],
  dev: {
    assetsPublicPath: '/Build/'
    // assetsPublicPath: '/'
  },
  build: {
    // 可配置 CDN
    // assetsPublicPath: 'https://monine.github.io/webpack-multi-page/dist/'
    assetsPublicPath: '/Build/'
  }
}
