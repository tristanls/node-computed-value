/*
 * personobject.js: Computed value as could be used by classes
 *
 * (C) 2013 Tristan Slominski
 */
"use strict";

var computedValue = require('../index.js');

function Person(firstName, lastName) {
  this.firstName = computedValue(firstName);
  this.lastName = computedValue(lastName);
  this.fullName = computedValue(this.firstName, this.lastName, 
      function(firstName, lastName) {
    return firstName + ' ' + lastName;
  });
};

var tom = new Person("Tom", "Dale");

console.log( tom.fullName.value );

tom.firstName.write("Bob");

console.log( tom.fullName.value );

tom.fullName.on('update', function(updatedValue) {
  console.log('update:', updatedValue);
});

tom.lastName.write("Johnson");