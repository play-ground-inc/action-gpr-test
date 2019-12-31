const { add, multiply, pow, divide } = require('./index');

it('should add', function() {
  expect(add(1, 2)).toBe(3);
});

it('should multiply', function() {
  expect(multiply(1)(2)).toBe(2);
})

it('should power', function() {
  expect(pow(3, 3)).toBe(27);
})

it('should divide', function() {
  function testme() {
    divide(2, 0);
  }
  expect(testme).toThrowError('Seriously! 0?');
})