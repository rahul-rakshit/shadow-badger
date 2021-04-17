export function untag(tags: string[], tagsToRemoveString: string) {
  const tagsToRemove = tagsToRemoveString.split(',').map((tag) => tag.trim());
  return tags.filter((tag) => !tagsToRemove.includes(tag));
}
