import { createLocalVue as clv } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import Vuex, { Store } from 'vuex';
import getters, { Getters } from '@/store/getters';
import { Actions } from '@/store/actions';
import initialState, { State } from '@/store/state';

export function createStore(state: State = initialState, _actions?: Actions, _getters?: Getters): Store<State> {
  const actions: Actions = _actions || {
    ['FETCH_ITEMS_ACTION']: jest.fn()
  };

  return new Vuex.Store<State>({
    state: state,
    actions,
    getters: _getters || getters
  });
}

export function createLocalVue() {
  const localVue = clv();
  localVue.use(BootstrapVue);
  localVue.use(IconsPlugin);
  localVue.use(Vuex);
  return localVue;
}
