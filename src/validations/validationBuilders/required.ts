import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction, Field } from '../validations-d';

export function required(): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    return val ? asSuccess(true) : asFailure('This field is required.');
  };
}
