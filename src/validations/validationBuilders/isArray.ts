import { ValidationFunction, Field } from '../validations-d';
import { asFailure, Either, asSuccess } from '../../types-d';

const notArrayError = 'This field needs to be an array';

export function isArray(): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    if (!Array.isArray(val)) return asFailure(notArrayError);
    return asSuccess(true);
  };
}
