import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction, Field } from '../validations-d';

export function exactLength(length: number): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    if (!val) return asSuccess(true);
    if (typeof val !== 'string') return asFailure('Value must be a string.');
    if (val.length !== length) {
      return asFailure(`Length must be exactly ${length}.`);
    }

    return asSuccess(true);
  };
}
