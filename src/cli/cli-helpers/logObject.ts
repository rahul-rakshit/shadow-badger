import colors from 'colors';

export function logObject(modelObject: object, collectionName: string) {
  console.log(colors.bold.blue(`Found the following ${collectionName}:`));

  for (const [key, value] of Object.entries(modelObject)) {
    console.log(colors.bold(key) + ':', value);
  }
}
