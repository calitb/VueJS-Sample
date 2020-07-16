import { itemImageURL } from '@/items';

describe('Filters', () => {
  describe('itemImageURL', () => {
    it('should return the correct URL when the object is provided', () => {
      expect(
        itemImageURL({
          name: 'Charmander',
          id: '11'
        })
      ).toBe('https://img.pokemondb.net/artwork/charmander.jpg');
    });

    it('should return an empty string when the name is missing', () => {
      expect(itemImageURL(undefined)).toBe('');
    });
  });
});
