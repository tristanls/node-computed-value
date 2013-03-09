/*
 * personobject2.js: More Ember-ish style example with sugar all over the place
 *
 * (C) 2013 Tristan Slominski
 */
"use strict";

var computedValue = require('../index.js');

function Person(firstName, lastName) {
  this._firstName = computedValue(firstName);
  this._lastName = computedValue(lastName);
  this._fullName = computedValue(this._firstName, this._lastName, 
      function(firstName, lastName) {
    return firstName + ' ' + lastName;
  });

  this.__defineGetter__('firstName', function() {
    return this._firstName.value;
  });

  this.__defineGetter__('lastName', function() {
    return this._lastName.value;
  });

  this.__defineGetter__('fullName', function() {
    return this._fullName.value;
  });

  this.__defineSetter__('firstName', function(value) {
    this._firstName.write(value);
  });

  this.__defineSetter__('lastName', function(value) {
    this._lastName.write(value);
  });
};

Person.prototype.watch = function watch(propertyName, callback) {
  this['_' + propertyName].on('update', callback);
};

var tom = new Person("Tom", "Dale");

console.log(tom.fullName);

tom.firstName = "Bob";

console.log(tom.fullName);

tom.watch('fullName', function(updatedValue) {
  console.log('update:', updatedValue);
});

tom.lastName = "Johnson";

// outputs:
// Tom Dale
// Bob Dale
// update: Bob Johnson