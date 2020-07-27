import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitNotFoundMessage(modelName: string, id?: string) {
  const mainString = colors.bold.red(`No ${modelName}`);
  const idString = id ? colors.bold.red(` with id ${id}`) : '';
  const suffixString = colors.bold.red(' found.');
  console.error(mainString + idString + suffixString);
  process.exit(errorCodes.notFound);
}
