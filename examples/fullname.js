/*
 * fullname.js: Simple computed value example
 *
 * (C) 2013 Tristan Slominski
 */
"use strict";

var computedValue = require('../index.js');

var first = computedValue('Tom');
var last = computedValue('Dale');
var fullName = computedValue(first, last, function(first, last) {
  return first + ' ' + last;
});

console.log(fullName.value);

first.write('Bob');
console.log(fullName.value);

fullName.on('update', function(updatedValue) {
  console.log('update:', updatedValue);
});

last.write('Johnson');