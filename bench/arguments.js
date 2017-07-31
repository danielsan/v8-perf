'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function leakyArguments () {
  return other(arguments)
}

function copyArgs() {
  var array = new Array(arguments.length)

  for (var i = 0; i < array.length; i++) {
    array[i] = arguments[i]
  }

  return other(array)
}
console.log('copyArgs()', copyArgs(1, 2, 3));

function copyArgs2() {
  const len   = arguments.length;
  const array = new Array(len)

  for (var i = 0; i < len; i++)
    array[i] = arguments[i];

  return other(array)
}
console.log('copyArgs2()', copyArgs2(1, 2, 3));

function copyArgs3() {
  var len   = arguments.length;
  var array = new Array(len)

  for (var i=len; i--;) {
    array[i] = arguments[i]
  }

  return other(array)
}
console.log('copyArgs3()', copyArgs3(1, 2, 3));


function sliceArguments () {
  var array = Array.prototype.slice.apply(arguments)
  return other(array)
}

function arrayFrom () {
  var array = Array.from(arguments)
  return other(array)
}

function spreadOp(...args) {
  return other(args)
}

const spreadOp2 = (...args) => other(args);

function other (toSum) {
  var total = 0
  for (var i = 0; i < toSum.length; i++) {
    total += toSum[i]
  }
  return total
}

// suite.add('leaky arguments', () => {leakyArguments(1, 2, 3);});

// suite.add('Array.prototype.slice arguments', () => {sliceArguments(1, 2, 3)})
// suite.add('Array.from arguments',            () => {sliceArguments(1, 2, 3)})

suite.add('for loop copy 1 arguments', () => {copyArgs(1, 2, 3)})
suite.add('for loop copy 2 arguments', () => {copyArgs2(1, 2, 3)})
suite.add('for loop copy 3 arguments', () => {copyArgs3(1, 2, 3)})

suite.add('spread operator 1', () => {spreadOp(1, 2, 3);});
suite.add('spread operator 2', () => {spreadOp2(1, 2, 3);});

suite.on('complete', require('./print'))

suite.run()
