import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import user from './modules/user'

Vue.use(Vuex)

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
    actions,
    getters,
    modules: {
        auth,
        user
    },
})