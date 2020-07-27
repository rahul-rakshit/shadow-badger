import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitOnSqlEngineError(
  verbPresentTense: string,
  modelName: string,
  sqlError: string
) {
  const mainString = colors.bold.red(
    `Failed to ${verbPresentTense} ${modelName}`
  );
  const reasonString = colors.red(' due to SQL engine error:');

  console.error(mainString + reasonString);
  console.error(colors.italic(sqlError));

  process.exit(errorCodes.sqlEngineError);
}
