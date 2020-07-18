import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction } from '../validations-d';

export function length(min: number, maxInclusive: number): ValidationFunction {
  return function (val?: string): Either<string, true> {
    if (!val) return asSuccess(true);
    if (val.length < min || val.length > maxInclusive) {
      return asFailure(
        `Please enter a value of length between ${min.toString()} and ${maxInclusive.toString()} characters.`
      );
    }

    return asSuccess(true);
  };
}
