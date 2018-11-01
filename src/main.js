// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import axios from 'axios';

// import store from './vuex/store.js'
// import * as filters from './util/filter'

// Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

// import VueX from 'vuex';
// Vue.use(VueX);
// import Mint from 'mint-ui';
// Vue.use(Mint);

// Vue.prototype.province={};
// Vue.prototype.cities={};
// Vue.prototype.dists={};


// Vue.prototype.$axios = axios;
// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>',
// })



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './vuex/store'
import * as filters from './util/filter'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})

