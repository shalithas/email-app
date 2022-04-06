import { email, textNotEmpty } from './validations';

describe('Validation helper module', function () {
  test('Valid email', () => {
    expect(email('test.user@test.com')).toBe(true);
  });

  test('Invalid email', () => {
    expect(email('test.usertest.com')).toBe(false);
  });

  test('Valid text', () => {
    expect(textNotEmpty('Valid text')).toBe(true);
  });

  test('Invalid text', () => {
    expect(textNotEmpty('')).toBe(false);
  });
});
