import { errorCodes } from './errorCodes';
import colors from 'colors';
import { ModelValidationMessageMap } from '../../validations/validations-d';
import { table, getBorderCharacters } from 'table';
import { isEmptyCondition } from './isEmptyCondition';
import { transformListForLogging } from './transformListForLogging';
import { findLongestKeyLength } from '../../utils/findLongestKeyLength';

export const processUtil = {
  logAndExitHasDependingEntry(
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
  },
  logAndExitNoFilterCriteria() {
    console.error(
      colors.bold.red('Please provide at least one filter criterion.')
    );
    process.exit(errorCodes.invalidCliUsage);
  },
  logAndExitNotFoundMessage(modelName: string, idString?: string) {
    const mainString = colors.bold.red(`No ${modelName}`);
    const idMessage = idString ? colors.bold.red(` with id ${idString}`) : '';
    const suffixString = colors.bold.red(' found.');
    console.error(mainString + idMessage + suffixString);
    process.exit(errorCodes.notFound);
  },
  logAndExitOnValidationFailure<M>(
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
  },
  logAndExitOnSqlEngineError(
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
  },
  logList(list: any[], modelNamePlural: string, findConditions: object) {
    const mainString = colors.bold.blue(`Listing all ${modelNamePlural}`);
    const conditionString = isEmptyCondition(findConditions)
      ? ''
      : colors.bold.blue(` given passed find conditions`);
    const countString = colors.gray(
      ` (${list.length} ${list.length === 1 ? 'entry' : 'entries'}):`
    );

    console.log(mainString + conditionString + countString);
    !isEmptyCondition(findConditions) &&
      console.log(colors.gray('Find conditions:'), findConditions);
    console.log(
      table(transformListForLogging(list), {
        border: getBorderCharacters('norc')
      })
    );
  },
  logObject(modelObject: object, collectionName: string) {
    console.log(colors.bold.blue(`Found the following ${collectionName}:`));

    const keyColumnWidth = findLongestKeyLength(modelObject) + 1;

    for (const [key, value] of Object.entries(modelObject)) {
      const formattedKey = `${key}:`.padEnd(keyColumnWidth);
      console.log(colors.bold(formattedKey), value);
    }
  },
  logSuccess(
    verbPastTense: string,
    modelName: string,
    additionalText?: string
  ) {
    const mainString = colors.bold.green(
      `Successfully ${verbPastTense} ${modelName}`
    );
    const additionalTextString = additionalText
      ? colors.bold.green(` ${additionalText}.`)
      : colors.bold.green('.');

    console.log(mainString + additionalTextString);
  }
};
