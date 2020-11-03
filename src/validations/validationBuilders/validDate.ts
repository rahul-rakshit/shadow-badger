import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction, Field } from '../validations-d';

const errorMessage =
  'Value must be a valid date, eg. 2020/08/17 or 2020-08-17T00:00:00.000Z';

export function validDate(): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    if (val === undefined || val === null) return asSuccess(true);
    if (!(val instanceof Date)) return asFailure(errorMessage);
    if (isNaN(Number(val as Date))) return asFailure(errorMessage);

    return asSuccess(true);
  };
}
