export function tagify(
  newTagsString?: string,
  previousTags?: string[]
): string[] {
  const tagsList = [
    ...(previousTags ?? []),
    ...(newTagsString ?? '').split(',')
  ];
  const trimmedTagsList = tagsList.map((tag) => tag.trim());
  const tagsListWithoutEmpties = trimmedTagsList.filter((tag) => !!tag);
  const tagsSet = new Set(tagsListWithoutEmpties);

  return [...tagsSet];
}
