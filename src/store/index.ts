import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import initialState from './state';

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createLogger()],
  state: initialState,
  mutations,
  actions,
  getters,
  modules: {}
});
