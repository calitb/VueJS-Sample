import { ActionContext } from 'vuex';
import { State } from './state';

import { setItems } from './mutations';
import getItems from '@/api/getItems';

export type FETCH_ITEMS_ACTION = { type: 'FETCH_ITEMS_ACTION' };

export function fetchItems(): FETCH_ITEMS_ACTION {
  return { type: 'FETCH_ITEMS_ACTION' };
}

const actions = {
  ['FETCH_ITEMS_ACTION'](context: ActionContext<State, State>, payload: FETCH_ITEMS_ACTION) {
    getItems((error, data) => {
      if (!error && data) {
        context.commit(setItems(data));
      }
    });
  }
};

export type Actions = typeof actions;

export default actions;
