function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function multiply(firstNumber) {
  return function(secondNumber) {
    return firstNumber * secondNumber;
  }
}

function echo(msg) {
  return msg;
}

module.exports = {
  add,
  multiply,
  echo
}
