import colors from 'colors';
import { errorCodes } from './errorCodes';

export function logAndExitNoFilterCriteria() {
  console.error(
    colors.bold.red('Please provide at least one filter criterion.')
  );
  process.exit(errorCodes.invalidCliUsage);
}
