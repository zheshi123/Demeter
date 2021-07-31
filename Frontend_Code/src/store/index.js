import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import orderInfo from './modules/order'
import user from './modules/user'

const store = new Vuex.Store({
  modules: {
    orderInfo,
    user,
  }
})

export default store
