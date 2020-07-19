import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction, Field } from '../validations-d';

export function length(min: number, maxInclusive: number): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    if (!val) return asSuccess(true);
    if (typeof val !== 'string') return asFailure('Value must be a string.');
    if (val.length < min || val.length > maxInclusive) {
      return asFailure(
        `Please enter a value of length between ${min.toString()} and ${maxInclusive.toString()} characters.`
      );
    }

    return asSuccess(true);
  };
}
