function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function multiply(firstNumber) {
  return function(secondNumber) {
    return firstNumber * secondNumber;
  }
}

function pow(number, power) {
  return Math.pow(number, power);
}

function totest(number) {
  return number;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Seriously! 0?')
  }
  return a/b;
}

module.exports = {
  add,
  multiply,
  pow,
  totest,
  divide
}
