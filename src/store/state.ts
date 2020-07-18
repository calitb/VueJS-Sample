import { Item } from '@/items';

export interface State {
  items: Item[];
}

const initialState: State = {
  items: [] as Item[]
};

export default initialState;
