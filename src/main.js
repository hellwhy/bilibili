import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';

Vue.prototype.$msg = Toast;

import {http} from '@/network/request'

Vue.prototype.$http = http;
Vue.prototype.$bus = new Vue();


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
