var path = require('path');
var config = require('./Tools/base.config.js');
var entries = {};
config.entries.forEach(function (entry) {
  entries[entry.entryName] = entry.entry;
});

module.exports = entries;
