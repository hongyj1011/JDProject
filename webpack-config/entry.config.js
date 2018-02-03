var path = require('path');
var config = require('./Tools/base.config.js');
var pathManager = require('../src/Tools/pathManager.js');
var entries = {};
config.entries.forEach(function (entry) {
  entries[entry.entryName] = entry.entry;
});
entries["vendor"] = ['vendorDir/jquery.js','vendorDir/mock-min.js','vendorDir/swiper.min.js'];
entries["commonCss"] = ['vendorDir/reset.css','vendorDir/swiper.min.css'];
module.exports = entries;
