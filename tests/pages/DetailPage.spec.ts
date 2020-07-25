import { shallowMount } from "@vue/test-utils";
import DetailPage from "@/pages/DetailPage.vue";
import Vuex from "vuex";

import { createLocalVue } from "../utils";
const localVue = createLocalVue();

describe("Detail Page", () => {
  describe("Default", () => {
    const store = new Vuex.Store({
      getters: {
        currentItem() {
          return { id: "4", name: "Charmander" };
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
      ).toBe("https://img.pokemondb.net/artwork/charmander.jpg");
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
