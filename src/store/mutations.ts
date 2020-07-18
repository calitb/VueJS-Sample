import { State } from './state';
import { Item } from '@/items';

export type SET_ITEMS_MUTATION = { type: 'SET_ITEMS_MUTATION'; items: Item[] };

export function setItems(items: Item[]): SET_ITEMS_MUTATION {
  return { type: 'SET_ITEMS_MUTATION', items };
}

export default {
  ['SET_ITEMS_MUTATION'](state: State, payload: SET_ITEMS_MUTATION) {
    state.items = payload.items;
  }
};
