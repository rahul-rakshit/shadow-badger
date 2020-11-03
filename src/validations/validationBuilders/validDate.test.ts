import { validDate } from './validDate';

describe('validDate returns a function that', () => {
  it('passes validation if its epoch time is not NaN', () => {
    const goodDate = new Date(Date.parse('2020/08/17'));

    const validate = validDate();
    const validation = validate(goodDate);

    expect(validation).toHaveSucceeded();
  });

  it('passes validation if passed value is nullish', () => {
    const validate = validDate();
    const validation = validate(null as any);

    expect(validation).toHaveSucceeded();
  });

  it('fails validation if a non-null, non-Date object is passed', () => {
    const badlyTypedDate = "Hello, I'm pretending to be a date.";

    const validate = validDate();
    const validation = validate(badlyTypedDate as any);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(
      'Value must be a valid date, eg. 2020/08/17 or 2020-08-17T00:00:00.000Z'
    );
  });

  it("fails validation if the date's epoch time is NaN", () => {
    const invalidDate = new Date(Date.parse("I'm not a date, but a 🍌"));

    const validate = validDate();
    const validation = validate(invalidDate);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(
      'Value must be a valid date, eg. 2020/08/17 or 2020-08-17T00:00:00.000Z'
    );
  });
});
