import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction } from '../validations-d';

export function allCaps(): ValidationFunction {
  return function (val?: string): Either<string, true> {
    if (!val) return asSuccess(true);

    if (val !== val.toUpperCase()) {
      return asFailure('Please enter an all caps value.');
    }

    return asSuccess(true);
  };
}
