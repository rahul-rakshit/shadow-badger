import { required } from './required';

describe('required returns a function that', () => {
  it('passes validation if it is truthy', () => {
    const user = 'dummywoman';

    const validate = required();
    const validation = validate(user);

    expect(validation).toHaveSucceeded();
  });

  it('otherwise fails validation with expected error message', () => {
    const validate = required();
    // @ts-ignore
    const validation = validate();

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('This field is required.');
  });
});
