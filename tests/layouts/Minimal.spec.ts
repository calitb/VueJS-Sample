import * as Storage from "@/utils/Storage";

import { RouterLinkStub, Wrapper, mount, shallowMount } from "@vue/test-utils";

import Minimal from "@/layouts/Minimal.vue";
import VueRouter from "vue-router";
import { createLocalVue } from "@vue/test-utils";

describe("Minimal Layout", () => {
  describe("Not logged", () => {
    let spyGetItem: jest.SpyInstance<string | null, [string]>;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    let wrapper: Wrapper<any>;
    /* eslint-enable  @typescript-eslint/no-explicit-any */

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    beforeAll(() => {
      spyGetItem = jest
        .spyOn(Storage, "getItem")
        .mockImplementation((key: string) => {
          if (key === "SESSION") {
            return null;
          }
          return "error";
        });
      wrapper = shallowMount(Minimal, { localVue });
    });

    afterAll(() => {
      spyGetItem.mockRestore();
    });

    it("should get the session status", () => {
      expect(spyGetItem).toBeCalledTimes(2);
      expect(spyGetItem).toHaveBeenNthCalledWith(1, "SESSION");
      expect(spyGetItem).toHaveBeenNthCalledWith(2, "SESSION");
    });

    it("should render the component", () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it("should not have a logout button", () => {
      const button = wrapper.find("b-button-stub");
      expect(button.exists()).toBeFalsy();
    });
  });

  describe("Logged", () => {
    let spyGetItem: jest.SpyInstance<string | null, [string]>;
    let spyRemoveItem: jest.SpyInstance<void, [string]>;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    let wrapper: Wrapper<any>;
    /* eslint-enable  @typescript-eslint/no-explicit-any */

    const localVue = createLocalVue();

    const pushHandler = jest.fn();
    const $router = {
      push: pushHandler
    };

    beforeAll(() => {
      spyGetItem = jest
        .spyOn(Storage, "getItem")
        .mockImplementation((key: string) => {
          if (key === "SESSION") {
            return "true";
          }
          return null;
        });
      spyRemoveItem = jest
        .spyOn(Storage, "removeItem")
        .mockImplementation(() => {
          return;
        });

      wrapper = mount(Minimal, {
        localVue,
        stubs: {
          "router-view": true,
          RouterLink: RouterLinkStub
        },
        mocks: {
          $router
        }
      });
    });

    afterAll(() => {
      spyGetItem.mockRestore();
      spyRemoveItem.mockRestore();
    });

    it("should get the session status", () => {
      expect(spyGetItem).toBeCalledTimes(2);
      expect(spyGetItem).toHaveBeenNthCalledWith(1, "SESSION");
      expect(spyGetItem).toHaveBeenNthCalledWith(2, "SESSION");
    });

    it("should render the component", () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it("should perform the logout when button is clicked", () => {
      const buttons = wrapper.findAll("button");
      expect(buttons).toHaveLength(2);

      buttons.at(1).trigger("click");

      expect(spyRemoveItem).toBeCalledTimes(1);
      expect(spyRemoveItem).toBeCalledWith("SESSION");

      expect(pushHandler).toBeCalledTimes(1);
      expect(pushHandler).toBeCalledWith({ name: "login" });
    });

    it("should open the navigation when menu button is clicked", () => {
      const buttons = wrapper.findAll("button");
      expect(buttons).toHaveLength(2);

      expect(
        wrapper
          .find("#menu")
          .classes()
          .includes("hidden")
      ).toBeTruthy();
      buttons.at(0).trigger("click");

      expect(
        wrapper
          .find("#menu")
          .classes()
          .includes("hidden")
      ).toBeTruthy();
    });

    it("should render the link to home", () => {
      expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
        name: "list"
      });
    });
  });
});
