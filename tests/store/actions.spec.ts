import { ActionContext } from 'vuex';
import actions, { fetchItems } from '@/store/actions';
import { setItems } from '@/store/mutations';
import { State } from '@/store/state';

import itemsFixture from '../fixtures/items';
import * as getItems from '@/api/getItems';

describe('actions', () => {
  describe('FETCH_ITEMS_ACTION', () => {
    it('should build action object', () => {
      expect(fetchItems()).toStrictEqual({ type: 'FETCH_ITEMS_ACTION' });
    });

    it('should setItems on success', () => {
      let spyGetItems = jest.spyOn(getItems, 'default').mockImplementation(async (handler) => {
        handler(undefined, itemsFixture, undefined);
      });

      const commit = jest.fn();
      const context: ActionContext<State, State> = ({ commit } as unknown) as ActionContext<State, State>;

      actions.FETCH_ITEMS_ACTION(context, fetchItems());

      expect(commit).toBeCalledTimes(1);
      expect(commit).toBeCalledWith(setItems(itemsFixture));

      spyGetItems.mockRestore();
    });

    it('should not call setItems on fail', () => {
      let spyGetItems = jest.spyOn(getItems, 'default').mockImplementation(async (handler) => {
        handler(new Error('Network Error'), undefined, undefined);
      });

      const commit = jest.fn();
      const context: ActionContext<State, State> = ({ commit } as unknown) as ActionContext<State, State>;

      const payload = fetchItems();
      actions.FETCH_ITEMS_ACTION(context, payload);

      expect(commit).toBeCalledTimes(0);

      spyGetItems.mockRestore();
    });
  });
});
