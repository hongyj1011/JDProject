var path = require('path');
var config = require('./Tools/base.config.js');
var pathManager = require('../src/Tools/pathManager.js');
var entries = {};
config.entries.forEach(function (entry) {
  entries[entry.entryName] = entry.entry;
});
entries["vendor"] = [pathManager.vendorDir+'/jquery.js'];
module.exports = entries;
