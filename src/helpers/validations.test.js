const validations = require('./validations');

describe('Validation helper module', function () {
  test('Valid email', () => {
    expect(validations.email('test.user@test.com')).toBe(true);
  });

  test('Invalid email', () => {
    expect(validations.email('test.usertest.com')).toBe(false);
  });

  test('Valid text', () => {
    expect(validations.textNotEmpty('Valid text')).toBe(true);
  });

  test('Invalid text', () => {
    expect(validations.textNotEmpty('')).toBe(false);
  });
});
