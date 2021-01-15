import { isArray } from './isArray';

describe('isArray returns a function that', () => {
  it('passes validation if passed value is an array', () => {
    const array = ['1', '5', '2'];

    const validate = isArray();
    const validation = validate(array);

    expect(validation).toHaveSucceeded();
  });

  it("fails validation if value isn't an array", () => {
    const array = '🍌';

    const validate = isArray();
    const validation = validate(array);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('This field needs to be an array');
  });
});
