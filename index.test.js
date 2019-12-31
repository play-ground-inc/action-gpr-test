const { add, multiply } = require('./index');

it('should add', function() {
  expect(add(1, 2)).toBe(3);
});

it('should multiply', function() {
  expect(multiply(1)(2)).toBe(2);
})
