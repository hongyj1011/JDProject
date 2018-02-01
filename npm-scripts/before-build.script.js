var fs = require('fs');
var rimraf = require('rimraf');
var pathManager = require('../src/Tools/pathManager.js');
rimraf(pathManager.buildDir, fs, function cb() {
  console.log('build目录已清空');
});
