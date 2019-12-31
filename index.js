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

module.exports = {
  add,
  multiply,
  pow,
  totest
}
