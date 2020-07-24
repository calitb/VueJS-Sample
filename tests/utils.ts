import { createLocalVue as clv } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import Vuex from 'vuex';

export function createLocalVue() {
  const localVue = clv();
  localVue.use(BootstrapVue);
  localVue.use(IconsPlugin);
  localVue.use(Vuex);
  return localVue;
}
