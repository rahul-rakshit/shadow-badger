import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitNotFoundMessage(
  modelName: string,
  idString?: string
) {
  const mainString = colors.bold.red(`No ${modelName}`);
  const idMessage = idString ? colors.bold.red(` with id ${idString}`) : '';
  const suffixString = colors.bold.red(' found.');
  console.error(mainString + idMessage + suffixString);
  process.exit(errorCodes.notFound);
}
