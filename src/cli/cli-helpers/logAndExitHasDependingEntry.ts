import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitHasDependingEntry(
  verbPresentTense: string,
  modelName: string,
  id: number
) {
  console.error(
    colors.bold.red(
      `Can't ${verbPresentTense} ${modelName} with id ${id} because ` +
        'there are entries depending on it.'
    )
  );
  process.exit(errorCodes.hasDependingEntry);
}
