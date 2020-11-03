import { findLongestKeyLength } from './findLongestKeyLength';

describe('findLongestKeyLength', () => {
  it('tells you the key length of the longest key', () => {
    const inputObject = {
      a: 'whatever',
      abcd: "something else that doesn't matter",
      b: 'dummy'
    };

    const longestKeyLength = findLongestKeyLength(inputObject);

    expect(longestKeyLength).toEqual(4);
  });

  it('is fine with multiple keys with the same length', () => {
    const inputObject = {
      a: 'whatever',
      abc: "something else that doesn't matter",
      b: 'dummy',
      xyz: 'another dummy string'
    };

    const longestKeyLength = findLongestKeyLength(inputObject);

    expect(longestKeyLength).toEqual(3);
  });

  it('returns 0 for an empty object', () => {
    const inputObject = {};

    const longestKeyLength = findLongestKeyLength(inputObject);

    expect(longestKeyLength).toEqual(0);
  });
});
