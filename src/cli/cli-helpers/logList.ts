import colors from 'colors';
import { table, getBorderCharacters } from 'table';

export function logList(
  list: any[],
  modelNamePlural: string,
  findConditions: object
) {
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
}

function transformListForLogging(list: any[]) {
  if (list.length === 0) return list;

  const headers = Object.keys(list[0]).map(boldify);
  const data = list.map((row) => Object.values(row));

  return [headers, ...data];
}

function isEmptyCondition(object: object) {
  return Object.values(object).every((val: any) => val === undefined);
}

function boldify(inputString: string) {
  return colors.bold(inputString);
}
