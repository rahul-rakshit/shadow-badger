import { parseDefinedOpts } from './parseDefinedOpts';

describe('parseDefinedOpts', () => {
  it('removes nullish values', () => {
    const inputObject = {
      a: 1,
      b: 2,
      c: undefined,
      d: null,
      e: 3
    };

    const objOfDefinedOpts = parseDefinedOpts(inputObject);

    expect(objOfDefinedOpts).toEqual({ a: 1, b: 2, e: 3 });
  });

  it('returns an unmodified copy when all values are defined', () => {
    const inputObject = {
      a: 1,
      b: 2,
      c: 3
    };

    const objOfDefinedOpts = parseDefinedOpts(inputObject);

    expect(objOfDefinedOpts).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("doesn't remove 0, '' or NaN", () => {
    const inputObject = {
      a: 0,
      b: 1,
      c: Number('bad number'),
      d: 2,
      e: ''
    };

    const objOfDefinedOpts = parseDefinedOpts(inputObject);

    expect(objOfDefinedOpts).toEqual({
      a: 0,
      b: 1,
      c: Number('bad number'),
      d: 2,
      e: ''
    });
  });
});
