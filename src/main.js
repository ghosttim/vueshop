import Vue from 'vue';
import App from './App.vue';
import store from './store';

import {titleName, data} from './data';
import send from './send';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

