export function removeTag(tags: string[], tagToRemove: string) {
  const trimmedTagToRemove = tagToRemove.trim();
  return tags.filter((tag) => tag !== trimmedTagToRemove);
}
