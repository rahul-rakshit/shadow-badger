import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction, Field } from '../validations-d';

export function validNumber(): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    if (val === undefined || val === null) return asSuccess(true);
    if (typeof val !== 'number') return asFailure('Value must be a number.');
    if (isNaN(val)) return asFailure('Value must be a valid number.');

    return asSuccess(true);
  };
}
