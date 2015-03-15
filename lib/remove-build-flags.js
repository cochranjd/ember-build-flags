/* global require, process, module */
var Filter = require('broccoli-filter');

function removeBuildFlags(inputTree, options) {

  if(!(this instanceof removeBuildFlags)) {
    return new removeBuildFlags(inputTree, options);
  }

  this.options = options || {};
  this.inputTree = inputTree;
  // Get the marker for the current environment
  var marker = 'REMOVE_' + process.env.EMBER_ENV.toUpperCase();

  this.startReg = new RegExp("#" + marker);
  this.endReg = new RegExp("#END_" + marker);
}

removeBuildFlags.prototype = Object.create(Filter.prototype);
removeBuildFlags.prototype.constructor = removeBuildFlags;

removeBuildFlags.prototype.extensions = ['js'];

removeBuildFlags.prototype.processString = function(str, file) {
  var lines = str.split('\n');
  var output = '';
  var removing = false;

  lines.forEach(function(line) {
    if (!removing && this.startReg.test(line)) {
      removing = true;
      return;
    }

    if (removing && this.endReg.test(line)) {
      removing = false;
      return;
    }

    if (!removing) {
      output += line + '\n';
    }
  }.bind(this));
  return output;
};

module.exports = removeBuildFlags;
