import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import demo from './modules/demo'
import products from './modules/products'
// import createLogger from '../../plugins/logger.js'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cart,
    demo,
    products
  },
})

