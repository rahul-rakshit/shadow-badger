import { mergeQueryTypesAndOptions } from './mergeQueryTypesAndOptions';

describe('mergeQueryTypesAndOptions', () => {
  interface Fruit {
    name: string;
    productNumber: number;
    color: string;
  }

  const ILike = (inputString: string) => {
    return inputString + '42';
  };

  const operators = {
    ilike: ILike
  };

  it('merges query types with options', () => {
    const banana: Fruit = {
      name: 'banana',
      productNumber: 155371,
      color: 'yellow'
    };
    const bananaTypes = {
      name: 'ilike'
    };

    const mergeResult = mergeQueryTypesAndOptions<Fruit>(
      banana,
      bananaTypes,
      operators
    );

    expect(mergeResult).toEqual({
      name: 'banana42',
      productNumber: 155371,
      color: 'yellow'
    });
  });
});
