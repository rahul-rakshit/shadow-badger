import { length } from './length';

describe('length returns a function that', () => {
  it('passes validation if length falls in range', () => {
    const number = '123456789';

    const validate = length(7, 15);
    const validation = validate(number);

    expect(validation).toHaveSucceeded();
  });

  it('passes validation when undefined', () => {
    const validate = length(7, 15);
    // @ts-ignore
    const validation = validate();

    expect(validation).toHaveSucceeded();
  });

  it('maxLength parameter is inclusive', () => {
    const number = '123456789';

    const validate = length(7, 9);
    const validation = validate(number);

    expect(validation).toHaveSucceeded();
  });

  it('fails validation when val is too short', () => {
    const number = '1234';

    const validate = length(5, 9);
    const validation = validate(number);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(
      'Please enter a value of length between 5 and 9 characters.'
    );
  });

  it('fails validation when val is too long', () => {
    const number = '12345678';

    const validate = length(5, 7);
    const validation = validate(number);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(
      'Please enter a value of length between 5 and 7 characters.'
    );
  });
});
