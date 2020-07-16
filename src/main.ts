import Vue from 'vue';
import App from './App.vue';
import router from './router';

import items, { itemImageURL } from './items';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.filter('imageSRC', itemImageURL);

new Vue({
  router,
  data: { items },
  render: (h) => h(App)
}).$mount('#app');
