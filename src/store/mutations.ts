import { State } from "./state";
import { Item } from "@/items";

export type SET_ITEMS_MUTATION = { type: "SET_ITEMS_MUTATION"; items: Item[] };
export type SET_CURRENT_ITEM_ID_MUTATION = {
  type: "SET_CURRENT_ITEM_ID_MUTATION";
  id?: string;
};

export function setItems(items: Item[]): SET_ITEMS_MUTATION {
  return { type: "SET_ITEMS_MUTATION", items };
}

export function setCurrentItemiD(id?: string): SET_CURRENT_ITEM_ID_MUTATION {
  return { type: "SET_CURRENT_ITEM_ID_MUTATION", id };
}

export default {
  ["SET_ITEMS_MUTATION"](state: State, payload: SET_ITEMS_MUTATION) {
    state.items = payload.items;
  },
  ["SET_CURRENT_ITEM_ID_MUTATION"](
    state: State,
    payload: SET_CURRENT_ITEM_ID_MUTATION
  ) {
    state.currentItemId = payload.id;
  }
};
