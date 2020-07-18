import { Either, asSuccess, asFailure } from '../types-d';
import { ValidationFunction } from './validations-d';
import { combine } from './combine';

describe('combine', () => {
  const isLowerCase: ValidationFunction = (
    val?: string
  ): Either<string, true> => {
    if (!val) return asFailure('Must be defined');
    return val === val.toLowerCase()
      ? asSuccess(true)
      : asFailure('Must be lowercase');
  };
  const isShort: ValidationFunction = (val?: string) => {
    if (!val) return asFailure('Must be defined');
    return val.length < 5 ? asSuccess(true) : asFailure('Must be short');
  };

  const validateCombined = combine(isLowerCase, isShort);

  it('is used to combine multiple validation functions to one', () => {
    const word = 'test';

    const validation = validateCombined(word);

    expect(validation).toHaveSucceeded();
  });

  it('fails validation with message of first failure', () => {
    const word = 'testWord';

    const validation = validateCombined(word);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('Must be lowercase');
  });

  it('validates validation functions in the order passed', () => {
    const word = 'TEST MESSAGE';

    const validation = validateCombined(word);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual('Must be lowercase');
  });
});
