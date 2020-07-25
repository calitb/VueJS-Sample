import { mount } from "@vue/test-utils";
import App from "@/App.vue";

import Vuex from "vuex";
import { createLocalVue } from "./utils";

describe("App", () => {
  describe("Default", () => {
    const fetchItemsAction = jest.fn();
    const localVue = createLocalVue();
    const store = new Vuex.Store({
      actions: {
        ["FETCH_ITEMS_ACTION"]: fetchItemsAction
      }
    });

    const wrapper = mount(App, {
      localVue,
      store,
      stubs: {
        "router-view": true
      }
    });

    it("should render the component", () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it("should call fetchItems on load", () => {
      expect(fetchItemsAction).toBeCalled();
    });
  });
});
