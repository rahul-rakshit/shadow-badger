import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction, Field } from '../validations-d';

export function allCaps(): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    if (!val) return asSuccess(true);
    if (typeof val !== 'string') return asFailure('Value must be a string.');

    if (val !== val.toUpperCase()) {
      return asFailure('Please enter an all caps value.');
    }

    return asSuccess(true);
  };
}
