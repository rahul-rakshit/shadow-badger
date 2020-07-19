import {
  ModelValidatorMap,
  ValidationFunction,
  ModelValidation,
  ModelValidationMessageMap
} from './validations-d';
import { failed, Failure, asSuccess, Either, asFailure } from '../types-d';

export function validateModelObject<M extends object>(
  modelObject: M,
  modelValidatorMap: ModelValidatorMap<M>
): ModelValidation<M> {
  const modelFieldValidationsMap = Object.entries(modelValidatorMap).reduce<
    { [key in keyof M]?: Either<string, true> }
  >((accumulator, [fieldKey, validateField]) => {
    const fieldValue =
      fieldKey === '__doc' ? modelObject : modelObject[fieldKey as keyof M];
    const fieldValidation = (validateField as ValidationFunction)(
      fieldValue as any
    );
    return { ...accumulator, [fieldKey]: fieldValidation };
  }, {});

  if (someValidationsFailed(modelFieldValidationsMap)) {
    const modelValidationMessageMap = Object.entries(modelFieldValidationsMap)
      .filter(([, fieldValidation]) => failed(fieldValidation))
      .map(([fieldKey, fieldValidation]) => [
        fieldKey,
        (fieldValidation as Failure<string>).value
      ])
      .reduce<ModelValidationMessageMap<M>>(
        (accumulator, [fieldKey, validationMessage]) => {
          return {
            ...accumulator,
            [fieldKey]: validationMessage
          };
        },
        {}
      );
    return asFailure<ModelValidationMessageMap<M>>(modelValidationMessageMap);
  }

  return asSuccess(true);
}

function someValidationsFailed<M>(
  validations: { [key in keyof M]?: Either<string, true> }
) {
  return Object.values(validations).some((validation) => failed(validation));
}
