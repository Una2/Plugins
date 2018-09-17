// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';


import store from './components/store/index.js'
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'a8fe94076e7563b79dd6f4235338ef85',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// });
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
