import Vue from 'vue'
import Vuex from 'vuex'

import movimento from './module-movimento'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    movimento
  }
})

export default store
