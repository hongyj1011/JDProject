var path = require('path');
var pathManager = require('../src/Tools/pathManager.js');
var pageArr = require('./Base/page-entries.config.js');
var configEntry = {};

pageArr.forEach((page) => {
   configEntry[page] = path.resolve(pathManager.pagesDir, page + '/page');
});

module.exports = configEntry;
