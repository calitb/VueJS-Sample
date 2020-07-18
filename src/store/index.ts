import Vue from 'vue';
import Vuex, { Store, CommitOptions, Payload } from 'vuex';
import createLogger from 'vuex/dist/logger';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import initialState, { State } from './state';

export interface TSCommit {
  (type: 'SET_ITEMS_MUTATION', payload?: any, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

export interface TSDispatch {
  (type: 'FETCH_ITEMS_ACTION', payload?: any, options?: DispatchOptions): Promise<any>;
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $tstore: Store<State>;
    $tscommit: TSCommit;
    tsdispatch: TSDispatch;
  }
}
// Set $tstore to be a getter that simply returns $store.
Object.defineProperty(Vue.prototype, '$tstore', {
  get: function() {
    return this.$store as Store<State>;
  },
  enumerable: true
});

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createLogger()],
  state: initialState,
  mutations,
  actions,
  getters,
  modules: {}
});
