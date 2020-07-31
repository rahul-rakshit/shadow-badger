import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitHasDependingEntry(
  verbPresentTense: string,
  modelName: string,
  id: string,
  dependentModelName: string,
  dependentId: string
) {
  console.error(
    colors.bold.red(
      `Can't ${verbPresentTense} ${modelName} with id ${id} because ` +
        `${dependentModelName} with id ${dependentId} depends on it.`
    )
  );
  process.exit(errorCodes.hasDependingEntry);
}
