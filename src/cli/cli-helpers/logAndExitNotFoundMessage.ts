import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitNotFoundMessage(modelName: string) {
  const mainString = colors.bold.red(`No ${modelName} found.`);
  console.error(mainString);
  process.exit(errorCodes.notFound);
}
