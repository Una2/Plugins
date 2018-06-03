// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';


import store from './components/store/index.js'



import VueX from 'vuex';
Vue.use(VueX);
import Mint from 'mint-ui';
Vue.use(Mint);

Vue.prototype.province={};
Vue.prototype.cities={};
Vue.prototype.dists={};


Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
