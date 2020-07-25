import DetailPage from "@/pages/DetailPage.vue";
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import itemsFixture from "../fixtures/items";
import { shallowMount } from "@vue/test-utils";

describe("Detail Page", () => {
  describe("Default", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      getters: {
        currentItem() {
          return itemsFixture[0];
        }
      }
    });

    const wrapper = shallowMount(DetailPage, {
      store,
      localVue
    });

    it("should render the component", () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it("should render the image", () => {
      expect(
        wrapper
          .find("article")
          .find("img")
          .attributes().src
      ).toBe("charmander_image");
    });

    it("should render the name", () => {
      expect(
        wrapper
          .find("article")
          .find("p")
          .text()
      ).toBe("Charmander");
    });
  });

  describe("Wrong route", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      getters: {
        currentItem() {
          return undefined;
        }
      }
    });

    const wrapper = shallowMount(DetailPage, {
      store,
      localVue
    });

    it("should render the component", () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it("should render an error message", () => {
      const content = wrapper.find("div");
      expect(content.text()).toBe("NO EXISTE");
    });
  });
});
