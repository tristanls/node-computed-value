# computed-value

    Stability: 1 - Experimental

_Stability as defined by [Node.js](http://nodejs.org/api/documentation.html#documentation_stability_index)_

A module for creating computed value in reactive programming style. 

## Installation

    npm install computed-value

## Usage

Below example can be also found in [examples/fullname.js](examples/fullname.js).

```javascript
var computedValue = require('computed-value');

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
```

The output of running the above script will be:

    Tom Dale
    Bob Dale
    update: Bob Johnson

## computedValue()

If no arguments are passed to the function, it simply returns the computed value stream. You can read it's `value` (it will be `undefined`), and you can `write` to it to initialize it.

```javascript
var computedValue = require('computed-value');

var name = computedValue();
console.log(name.value);
// -> undefined

name.write('Julia');
console.log(name.value);
// -> 'Julia'
```

## computedValue(initialValue)

If a single, non-function argument is passed, `computedValue` will initialize the underlying computed value stream with the `initialValue`, then return it.

```javascript
var computedValue = require('computed-value');

var name = computedValue('Julia');
console.log(name.value);
// -> 'Julia'

name.write('Julie');
console.log(name.value);
// -> 'Julie'
```

## computedValue(dependency[, dependency...], calculationFunction)

If more than one arguments are passed in, `computedValue` assumes that the last argument is a function that will take as input the values of each `dependency` listed before it, just like in the `Usage` example above. Each `dependency` must be a computed value itself in order for the mechanism to work correctly. (it will attempt to lookup `value` property as well as try to register a listener for an `update` event, see [index.js](index.js) for details).

```javascript
var computedValue = require('computed-value');

var first = computedValue('Tom');
var last = computedValue('Anderson');
var fullName = computedValue(first, last, function(first, last) {
  return first + ' ' + last;
});

console.log(fullName.value);
// -> 'Tom Anderson'

var title = computedValue('Mr.');
var titledFullName = computedValue(title, fullName, function(title, fullName) {
  return title + ' ' + fullName;
});

console.log(titledFullName.value);
// -> 'Mr. Tom Anderson'

first.write('Jake');
console.log(titledFullName.value);
// -> 'Mr. Jake Anderson'
```