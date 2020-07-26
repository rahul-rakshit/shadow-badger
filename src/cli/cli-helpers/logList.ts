import colors from 'colors';

export function logList(
  list: any[],
  modelNamePlural: string,
  condition?: string
) {
  const mainString = colors.bold.blue(`Listing all ${modelNamePlural}`);
  const conditionString = condition ? colors.blue(` ${condition}`) : '';
  const countString = colors.gray(` (${list.length} entries):`);

  console.log(mainString + conditionString + countString);
  console.table(list);
}
