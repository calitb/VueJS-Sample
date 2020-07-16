import { createLocalVue as clv } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

export function createLocalVue() {
  const localVue = clv();
  localVue.use(BootstrapVue);
  localVue.use(IconsPlugin);
  return localVue;
}
