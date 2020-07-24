import { createLocalVue as clv } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { itemImageURL } from '@/items';

import Vuex from 'vuex';

export function createLocalVue() {
  const localVue = clv();
  localVue.use(BootstrapVue);
  localVue.use(IconsPlugin);
  localVue.use(Vuex);
  localVue.filter('imageSRC', itemImageURL);
  return localVue;
}
