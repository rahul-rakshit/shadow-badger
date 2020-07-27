import colors from 'colors';

export function logSuccess(
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
