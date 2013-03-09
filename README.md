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