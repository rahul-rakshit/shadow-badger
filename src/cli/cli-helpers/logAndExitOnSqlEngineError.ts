import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitOnSqlEngineError(
  verbPresentTense: string,
  modelName: string,
  sqlError: string
) {
  const mainString = colors.bold.red(
    `Failed to ${verbPresentTense} ${modelName} due to SQL engine error:`
  );

  console.error(mainString);
  console.error(colors.italic(sqlError));

  process.exit(errorCodes.sqlEngineError);
}
