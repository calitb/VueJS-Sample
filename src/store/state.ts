import { Item } from "@/items";

export interface State {
  items: Item[];
  currentItemId?: string;
}

const initialState: State = {
  items: [] as Item[],
  currentItemId: undefined
};

export default initialState;
