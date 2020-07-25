import { createLocalVue as clv } from "@vue/test-utils";
import { itemImageURL } from "@/items";

import Vuex from "vuex";

export function createLocalVue() {
  const localVue = clv();
  localVue.use(Vuex);
  localVue.filter("imageSRC", itemImageURL);
  return localVue;
}
