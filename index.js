/*
 * index.js : Node.js streaming-style computed values
 *
 * (C) 2013 Tristan Slominski
 */
"use strict";

var ComputedValueStream = require('computed-value-stream');

var computedValue = function computedValue() {
  var computedValueStream = new ComputedValueStream();

  if (arguments.length == 0) return computedValueStream;

  if (arguments.length == 1 && typeof arguments[0] != 'function') {
    computedValueStream.write(arguments[0]);
    return computedValueStream;
  }

  // grab the function to calculate dependencies
  var callback = Array.prototype.pop.call(arguments);
  // copy arguments into references
  var observedStreams = Array.prototype.slice.call(arguments);
  // create space to hold latest values in closure
  var values = new Array(observedStreams.length);

  var createUpdateHandler = function createUpdateHandler(index) {
    return function(updatedValue) {
      values[index] = updatedValue;
      computedValueStream.write(callback.apply({}, values));
    };
  };

  for (var i = 0; i < observedStreams.length; i++) {
    var observedStream = observedStreams[i];
    values[i] = observedStream.value;
    observedStream.on('update', createUpdateHandler(i));
  }

  computedValueStream.write(callback.apply({}, values));
  return computedValueStream;
};

module.exports = computedValue;