export interface Item {
  id: string;
  name: string;
  image: string;
}

export interface State {
  items: Item[];
  currentItemId?: string;
}

const initialState: State = {
  items: [] as Item[],
  currentItemId: undefined
};

export default initialState;
