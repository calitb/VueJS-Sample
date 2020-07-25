import Vuex, { createLogger } from "vuex";
import initialState, { State } from "./state";

import Vue from "vue";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);
export default new Vuex.Store<State>({
  plugins: [createLogger()],
  state: initialState,
  mutations,
  actions,
  getters,
  modules: {}
});
