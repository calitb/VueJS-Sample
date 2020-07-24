import getters from '@/store/getters';
import { State } from '@/store/state';
import itemsFixture from '../fixtures/items';

describe('getters', () => {
  describe('SET_ITEMS_MUTATION', () => {
    it('should return the right value if available', () => {
      const state: State = { items: itemsFixture, currentItemId: '005' };
      expect(getters.currentItem(state)?.name).toBe('Charmeleon');
    });

    it('should return undefined when unavailable', () => {
      const state: State = { items: itemsFixture };
      expect(getters.currentItem(state)).toBe(undefined);
    });
  });
});
