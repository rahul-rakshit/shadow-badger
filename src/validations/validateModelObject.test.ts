import { ModelValidatorMap, Field, ValidationFunction } from './validations-d';
import { asSuccess, asFailure } from '../types-d';
import { validateModelObject } from './validateModelObject';
const hasPostCode: ValidationFunction = (val?: Field) => {
  if (!val) return asSuccess(true);
  if (typeof val !== 'string') return asFailure('Value must be a string.');
  if (!/\d{5}/.test(val)) return asFailure('Value must contain a postcode.');
  return asSuccess(true);
};

describe('validateModelObject', () => {
  interface Letter {
    sourceAddress?: string;
    destinationAddress?: string;
    postDateTime?: Date;
    arrivalDateTime?: Date;
    weight?: string;
  }

  const letterValidatorMap: ModelValidatorMap<Letter> = {
    weight: (val?: Field) => {
      const numberVal = Number(val);
      if (isNaN(numberVal)) return asFailure('Value must be a valid number.');
      if (numberVal <= 0) return asFailure('Value must be greater than 0.');
      return asSuccess(true);
    },
    sourceAddress: hasPostCode,
    destinationAddress: hasPostCode,
    __doc: (val?: Letter) => {
      if (!val) return asSuccess(true);
      if (!val.postDateTime || !val.arrivalDateTime) return asSuccess(true);
      if (val.arrivalDateTime < val.postDateTime) {
        return asFailure("The letter can't arrive before it was sent");
      }
      return asSuccess(true);
    }
  };

  it('returns a success if all validations pass', () => {
    const letter: Letter = {
      sourceAddress: 'Mehringdamm 32, 10961 Berlin',
      destinationAddress: 'Platz der Republik 1, 10011 Berlin',
      postDateTime: new Date(2013, 8, 22, 12),
      arrivalDateTime: new Date(2013, 8, 22, 13, 30),
      weight: '750'
    };

    const validation = validateModelObject<Letter>(letter, letterValidatorMap);

    expect(validation).toHaveSucceeded();
    expect(validation.value).toBe(true);
  });

  it('returns a failure-encapsulated map of error messages', () => {
    const letter: Letter = {
      sourceAddress: 'Mehringdamm 32, 10961 Berlin',
      destinationAddress: 'Platz der Republik 1, Berlin',
      postDateTime: new Date(2013, 8, 22, 12),
      arrivalDateTime: new Date(2013, 8, 22, 13, 30),
      weight: '750 g'
    };

    const validation = validateModelObject<Letter>(letter, letterValidatorMap);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual({
      destinationAddress: 'Value must contain a postcode.',
      weight: 'Value must be a valid number.'
    });
  });

  it('can perform validation on the entire document', () => {
    const letter: Letter = {
      sourceAddress: 'Mehringdamm 32, 10961 Berlin',
      destinationAddress: 'Platz der Republik 1, 10011 Berlin',
      postDateTime: new Date(2013, 8, 22, 13),
      arrivalDateTime: new Date(2013, 8, 22, 12),
      weight: '750'
    };

    const validation = validateModelObject<Letter>(letter, letterValidatorMap);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual({
      __doc: "The letter can't arrive before it was sent"
    });
  });
});
