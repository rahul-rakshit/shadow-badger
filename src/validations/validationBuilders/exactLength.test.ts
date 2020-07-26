import { exactLength } from './exactLength';

describe('exactLength returns a validation function that', () => {
  it('passes validation if length matches exactly', () => {
    const number = '0123456789';

    const validate = exactLength(10);
    const validation = validate(number);

    expect(validation).toHaveSucceeded();
  });

  it('passes validation when undefined', () => {
    const validate = exactLength(10);
    const validation = validate();

    expect(validation).toHaveSucceeded();
  });

  it('otherwise fails validation with expected error message', () => {
    const number = '01234';

    const validate = exactLength(10);
    const validation = validate(number);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('Length must be exactly 10.');
  });

  it("also fails validation if value isn't a string", () => {
    const number = 1234;

    const validate = exactLength(10);
    const validation = validate(number);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('Value must be a string.');
  });
});
