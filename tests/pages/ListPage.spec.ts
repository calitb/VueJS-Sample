import { RouterLinkStub, mount, shallowMount } from "@vue/test-utils";

import ListPage from "@/pages/ListPage.vue";
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import itemsFixture from "../fixtures/items";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("List Page", () => {
  describe("Default", () => {
    const store = new Vuex.Store({
      state: {
        items: itemsFixture
      }
    });

    const wrapper = shallowMount(ListPage, {
      localVue,
      store,
      stubs: {
        "router-link": true
      }
    });

    it("should render the component", () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it("should render 3 items ", () => {
      const items = wrapper.findAll("router-link-stub");
      expect(items).toHaveLength(3);
    });

    it("should render the images", () => {
      const items = wrapper.findAll("router-link-stub");
      const image = items.at(0).find("img");
      expect(image.attributes().src).toBe("charmander_image");
    });

    it("should render the name", () => {
      const items = wrapper.findAll("router-link-stub");
      expect(items.at(1).text()).toBe("Charmeleon");
    });
  });

  describe("Links", () => {
    const store = new Vuex.Store({
      state: {
        items: itemsFixture
      }
    });
    const wrapper = mount(ListPage, {
      localVue,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    it("should render the link", () => {
      expect(
        wrapper
          .findAllComponents(RouterLinkStub)
          .at(2)
          .props().to
      ).toEqual({ name: "detail", params: { detailId: "6" } });
    });
  });
});
