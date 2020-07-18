import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction } from '../validations-d';

export function exactLength(length: number): ValidationFunction {
  return function (val?: string): Either<string, true> {
    if (!val) return asSuccess(true);
    if (val.length !== length) {
      return asFailure(`Please enter a value of exact length ${length}.`);
    }

    return asSuccess(true);
  };
}
