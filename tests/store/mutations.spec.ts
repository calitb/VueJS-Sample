import mutations, { setCurrentItemiD, setItems } from "@/store/mutations";

import { State } from "@/store/state";
import itemsFixture from "../fixtures/items";

describe("mutations", () => {
  describe("SET_ITEMS_MUTATION", () => {
    it("should build mutation object", () => {
      expect(setItems(itemsFixture)).toStrictEqual({
        type: "SET_ITEMS_MUTATION",
        items: itemsFixture
      });
    });

    it("should update the state", () => {
      const state: State = { items: [] };
      mutations.SET_ITEMS_MUTATION(state, setItems(itemsFixture));

      expect(state.items).toBe(itemsFixture);
    });
  });

  describe("SET_CURRENT_ITEM_ID_MUTATION", () => {
    it("should build mutation object", () => {
      expect(setCurrentItemiD("004")).toStrictEqual({
        type: "SET_CURRENT_ITEM_ID_MUTATION",
        id: "004"
      });
    });

    it("should update the state", () => {
      const state: State = { items: [], currentItemId: undefined };
      mutations.SET_CURRENT_ITEM_ID_MUTATION(state, setCurrentItemiD("004"));

      expect(state.currentItemId).toBe("004");
    });
  });
});
