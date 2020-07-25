import { ActionContext } from "vuex";
import { State } from "./state";
import getItems from "@/api/getItems";
import { setItems } from "./mutations";

export type FETCH_ITEMS_ACTION = { type: "FETCH_ITEMS_ACTION" };

export function fetchItems(): FETCH_ITEMS_ACTION {
  return { type: "FETCH_ITEMS_ACTION" };
}

export default {
  ["FETCH_ITEMS_ACTION"](context: ActionContext<State, State>) {
    getItems((error, data) => {
      if (!error && data) {
        context.commit(setItems(data));
      }
    });
  }
};
