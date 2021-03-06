import { Item, State } from "./state";

export default {
  currentItem: (state: State): Item | undefined => {
    const currentId = state.currentItemId;
    if (currentId) {
      return state.items.find(
        (item: Item) => parseInt(item.id, 10) === parseInt(currentId, 10)
      );
    }
    return undefined;
  }
};
