import * as getItems from "@/api/getItems";

import actions, { fetchItems } from "@/store/actions";

import { ActionContext } from "vuex";
import { State } from "@/store/state";
import itemsFixture from "../fixtures/items";
import { setItems } from "@/store/mutations";

describe("actions", () => {
  describe("FETCH_ITEMS_ACTION", () => {
    it("should build action object", () => {
      expect(fetchItems()).toStrictEqual({ type: "FETCH_ITEMS_ACTION" });
    });

    it("should setItems on success", () => {
      const spyGetItems = jest
        .spyOn(getItems, "default")
        .mockImplementation(async handler => {
          handler(undefined, itemsFixture, undefined);
        });

      const commit = jest.fn();
      const context: ActionContext<State, State> = ({
        commit
      } as unknown) as ActionContext<State, State>;

      actions.FETCH_ITEMS_ACTION(context);

      expect(commit).toBeCalledTimes(1);
      expect(commit).toBeCalledWith(setItems(itemsFixture));

      spyGetItems.mockRestore();
    });

    it("should not call setItems on fail", () => {
      const spyGetItems = jest
        .spyOn(getItems, "default")
        .mockImplementation(async handler => {
          handler(new Error("Network Error"), undefined, undefined);
        });

      const commit = jest.fn();
      const context: ActionContext<State, State> = ({
        commit
      } as unknown) as ActionContext<State, State>;

      actions.FETCH_ITEMS_ACTION(context);

      expect(commit).toBeCalledTimes(0);

      spyGetItems.mockRestore();
    });
  });
});
