import * as getItems from "@/api/getPokemonItems";

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

    it("should setItems on success", async () => {
      const spyGetItems = jest
        .spyOn(getItems, "default")
        .mockResolvedValueOnce(itemsFixture);

      const commit = jest.fn();
      const context: ActionContext<State, State> = ({
        commit
      } as unknown) as ActionContext<State, State>;

      await actions.FETCH_ITEMS_ACTION(context);

      expect(commit).toBeCalledTimes(1);
      expect(commit).toBeCalledWith(setItems(itemsFixture));

      spyGetItems.mockRestore();
    });

    it("should not call setItems on fail", async () => {
      const spyGetItems = jest
        .spyOn(getItems, "default")
        .mockRejectedValueOnce(new Error("Network Error"));

      const commit = jest.fn();
      const context: ActionContext<State, State> = ({
        commit
      } as unknown) as ActionContext<State, State>;

      await actions.FETCH_ITEMS_ACTION(context);

      expect(commit).toBeCalledTimes(0);

      spyGetItems.mockRestore();
    });
  });
});
