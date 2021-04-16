import { untag } from './untag';

describe('untag', () => {
  it('removes a tag from a comma-separated string of tags', () => {
    const tagToRemove = 'vegetables';
    const tags = ['fruits', 'vegetables', 'cheeses'];

    const newTags = untag(tags, tagToRemove);

    expect(newTags).toEqual(['fruits', 'cheeses']);
  });

  it('leaves list unmodified if tag to remove has no matches', () => {
    const tagToRemove = 'forklifts';
    const tags = ['fruits', 'vegetables', 'cheeses'];

    const newTags = untag(tags, tagToRemove);

    expect(newTags).toEqual(['fruits', 'vegetables', 'cheeses']);
  });

  it('ignores leading and trailing whitespace in tag to remove', () => {
    const tagToRemove = ' onion \t';
    const tags = ['screw', 'bolt', 'wrench', 'onion', 'pull saw', 'sand paper'];

    const newTags = untag(tags, tagToRemove);

    expect(newTags).toEqual([
      'screw',
      'bolt',
      'wrench',
      'pull saw',
      'sand paper'
    ]);
  });
});
