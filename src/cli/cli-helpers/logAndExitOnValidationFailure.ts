import colors from 'colors';
import { ModelValidationMessageMap } from '../../validations/validations-d';

export function logAndExitOnValidationFailure<M>(
  verbPresentTense: string,
  modelName: string,
  modelValidation: ModelValidationMessageMap<M>
) {
  const mainString = colors.bold.red(
    `Failed to ${verbPresentTense} ${modelName} `
  );
  const reasonString = colors.red(
    'because it failed validation on the following fields:'
  );

  console.error(mainString + reasonString);

  Object.entries(modelValidation).forEach(([key, message]) => {
    console.error(colors.bold(`${key}: `) + message);
  });

  process.exit(2);
}
