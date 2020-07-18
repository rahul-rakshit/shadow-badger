import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction } from '../validations-d';

export function required(): ValidationFunction {
  return function (val?: string): Either<string, true> {
    return val ? asSuccess(true) : asFailure('This field is required.');
  };
}
