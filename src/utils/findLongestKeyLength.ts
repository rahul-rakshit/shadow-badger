export function findLongestKeyLength(modelObject: object) {
  return Object.keys(modelObject).reduce((accumulator, fieldKey) => {
    if (fieldKey.length < accumulator) return accumulator;
    return fieldKey.length;
  }, 0);
}
