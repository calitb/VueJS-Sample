import mutations, { setItems } from '@/store/mutations';
import { State } from '@/store/state';
import { itemsFixture } from '@/items';

describe('mutations', () => {
  describe('SET_ITEMS_MUTATION', () => {
    it('should build mutation object', () => {
      expect(setItems(itemsFixture)).toStrictEqual({ type: 'SET_ITEMS_MUTATION', items: itemsFixture });
    });

    it('should update the state', () => {
      const state: State = { items: [] };
      mutations.SET_ITEMS_MUTATION(state, setItems(itemsFixture));

      expect(state.items).toBe(itemsFixture);
    });
  });
});
