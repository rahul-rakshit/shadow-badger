import colors from 'colors';

export function logObject(modelObject: object, collectionName: string) {
  console.log(colors.bold.blue(`Found the following ${collectionName}:`));

  const keyColumnWidth = findLongestKeyLength(modelObject) + 1;

  for (const [key, value] of Object.entries(modelObject)) {
    const formattedKey = `${key}:`.padEnd(keyColumnWidth);
    console.log(colors.bold(formattedKey), value);
  }
}

function findLongestKeyLength(modelObject: object) {
  return Object.keys(modelObject).reduce((accumulator, fieldKey) => {
    if (fieldKey.length < accumulator) return accumulator;
    return fieldKey.length;
  }, 0);
}
