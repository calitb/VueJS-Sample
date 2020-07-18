import getters from '@/store/getters';
import { State } from '@/store/state';
import { itemsFixture } from '@/items';

describe('getters', () => {
  describe('SET_ITEMS_MUTATION', () => {
    it('should return the right value if available', () => {
      const state: State = { items: itemsFixture };
      expect(getters.getItemById(state)('005')?.name).toBe('Charmeleon');
    });

    it('should return undefined when unavailable', () => {
      const state: State = { items: itemsFixture };
      expect(getters.getItemById(state)('abc')).toBe(undefined);
    });
  });
});
