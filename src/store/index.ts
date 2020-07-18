import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import initialState, { State } from './state';

Vue.use(Vuex);
export default new Vuex.Store<State>({
  plugins: [createLogger()],
  state: initialState,
  mutations,
  actions,
  getters,
  modules: {}
});
