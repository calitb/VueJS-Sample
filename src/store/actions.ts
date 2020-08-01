import { ActionContext } from "vuex";
import { State } from "./state";
import getItems from "@/api/getItems";
import { setItems } from "./mutations";

export type FETCH_ITEMS_ACTION = { type: "FETCH_ITEMS_ACTION" };

export function fetchItems(): FETCH_ITEMS_ACTION {
  return { type: "FETCH_ITEMS_ACTION" };
}

export default {
  async ["FETCH_ITEMS_ACTION"](context: ActionContext<State, State>) {
    try {
      const data = await getItems();
      context.commit(setItems(data));
    } catch (ex) {
      return;
    }
  }
};
