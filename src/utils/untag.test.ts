import { untag } from './untag';

describe('untag', () => {
  it('removes a tag from a comma-separated string of tags', () => {
    const tagsToRemove = 'vegetables';
    const tags = ['fruits', 'vegetables', 'cheeses'];

    const newTags = untag(tags, tagsToRemove);

    expect(newTags).toEqual(['fruits', 'cheeses']);
  });

  it('leaves list unmodified if tag to remove has no matches', () => {
    const tagsToRemove = 'forklifts';
    const tags = ['fruits', 'vegetables', 'cheeses'];

    const newTags = untag(tags, tagsToRemove);

    expect(newTags).toEqual(tags);
  });

  it('supports removing multiple comma-separated tags at once', () => {
    const tagsToRemove = 'vegetables,seafood';
    const tags = ['alloids', 'vegetables', 'poultry', 'seafood'];

    const newTags = untag(tags, tagsToRemove);

    expect(newTags).toEqual(['alloids', 'poultry']);
  });

  it('ignores leading and trailing whitespace in tag to remove', () => {
    const tagsToRemove = ' onion \t';
    const tags = ['screw', 'bolt', 'wrench', 'onion', 'pull saw', 'sand paper'];

    const newTags = untag(tags, tagsToRemove);

    expect(newTags).toEqual([
      'screw',
      'bolt',
      'wrench',
      'pull saw',
      'sand paper'
    ]);
  });
});
