import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {titleName, data} from './data';
import send from './send';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

send(titleName);
send(data.message);
