function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function multiply(firstNumber) {
  return function(secondNumber) {
    return firstNumber * secondNumber;
  }
}

module.exports = {
  add,
  multiply
}
