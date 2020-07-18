import { State } from './state';
import { Item } from '@/items';

export default {
  getItemById: (state: State) => (id: string): Item | undefined => {
    return state.items.find((item: Item) => parseInt(item.id, 10) === parseInt(id, 10));
  }
};
