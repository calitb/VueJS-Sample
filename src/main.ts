import "./assets/styles/index.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { itemImageURL } from "./items";

Vue.config.productionTip = false;

Vue.filter("imageSRC", itemImageURL);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
