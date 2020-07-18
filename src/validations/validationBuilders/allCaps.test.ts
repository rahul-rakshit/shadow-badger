import { allCaps } from './allCaps';

describe('allCaps returns a function that', () => {
  it('passes validation if all letters are capitalized', () => {
    const allCapsWord = 'HELLO';

    const validate = allCaps();
    const validation = validate(allCapsWord);

    expect(validation).toHaveSucceeded();
  });

  it('passes validation when undefined', () => {
    const validate = allCaps();
    const validation = validate(undefined as any);

    expect(validation).toHaveSucceeded();
  });

  it('otherwise fails validation with expected error message', () => {
    const lowerCaseWord = 'hello';

    const validate = allCaps();
    const validation = validate(lowerCaseWord);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('Please enter an all caps value.');
  });
});
