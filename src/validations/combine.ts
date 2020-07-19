import { ValidationFunction, Field } from './validations-d';
import { Either, failed, asSuccess } from '../types-d';

export function combine(
  ...validationFunctions: ValidationFunction[]
): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    for (const validate of validationFunctions) {
      const validationResult = validate(val);
      if (failed(validationResult)) return validationResult;
    }

    return asSuccess(true);
  };
}
