import colors from 'colors';
import { ModelValidationMessageMap } from '../../validations/validations-d';
import { errorCodes } from './errorCodes';

export function logAndExitOnValidationFailure<M>(
  verbPresentTense: string,
  modelName: string,
  modelValidation: ModelValidationMessageMap<M>
) {
  const mainString = colors.bold.red(
    `Failed to ${verbPresentTense} ${modelName} because it failed validation on the following fields:`
  );

  console.error(mainString);

  Object.entries(modelValidation).forEach(([key, message]) => {
    console.error(colors.bold(`${key}: `) + message);
  });

  process.exit(errorCodes.validation);
}
