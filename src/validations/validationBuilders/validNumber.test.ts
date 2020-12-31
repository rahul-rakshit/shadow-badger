import { validNumber } from './validNumber';

describe('validNumber returns a function that', () => {
  it('passes validation if a valid number is passed', () => {
    const number = '42';

    const validate = validNumber();
    const validation = validate(number);

    expect(validation).toHaveSucceeded();
  });

  it('passes validation when undefined', () => {
    const validate = validNumber();
    const validation = validate(undefined);

    expect(validation).toHaveSucceeded();
  });

  it("otherwise fails validation if value isn't a valid number", () => {
    const string = 'hello';

    const validate = validNumber();
    const validation = validate(string);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('Value must be a valid number.');
  });
});
