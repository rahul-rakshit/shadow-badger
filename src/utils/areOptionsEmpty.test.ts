import { areOptionsEmpty } from './areOptionsEmpty';

describe('areOptionsEmpty', () => {
  it('tells you when the passed object of options is empty', () => {
    const inputOptions = {};

    const isEmpty = areOptionsEmpty(inputOptions);

    expect(isEmpty).toBe(true);
  });

  it('tells you when the passed object of options is not empty', () => {
    const inputOptions = { a: 1, b: new Date(), c: [1, 'a'] };

    const isEmpty = areOptionsEmpty(inputOptions);

    expect(isEmpty).toBe(false);
  });

  it('treats nullish values as empty', () => {
    const inputOptions = { a: null, b: undefined };

    const isEmpty = areOptionsEmpty(inputOptions);

    expect(isEmpty).toBe(true);
  });
});
