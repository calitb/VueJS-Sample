import { createLocalVue as clv } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import Vuex, { Store } from 'vuex';
import getters from '@/store/getters';
import { Actions } from '@/store/actions';
import initialState, { State } from '@/store/state';

export function createStore(state: State = initialState, actions?: Actions): Store<State> {
  return new Vuex.Store<State>({
    state: state,
    actions: actions || {
      ['FETCH_ITEMS_ACTION']: jest.fn()
    },
    getters: {
      getItemById: (state: State) => (id: string): ReturnType<ReturnType<typeof getters.getItemById>> => {
        if (id === '4') {
          return { id: '4', name: 'Charmander' };
        } else {
          return undefined;
        }
      }
    }
  });
}

export function createLocalVue() {
  const localVue = clv();
  localVue.use(BootstrapVue);
  localVue.use(IconsPlugin);
  localVue.use(Vuex);
  return localVue;
}
