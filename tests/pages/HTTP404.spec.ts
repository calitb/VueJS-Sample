import { shallowMount } from "@vue/test-utils";
import HTTP404 from "@/pages/HTTP404.vue";

describe("HTTP404 page", () => {
  describe("Default", () => {
    const wrapper = shallowMount(HTTP404);

    it("should render the component", () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
