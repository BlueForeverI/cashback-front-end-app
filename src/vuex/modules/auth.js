import auth from '../../api/auth'
import * as types from '../mutation-types'

// initial state
const state = {
  isLoggedIn: !!localStorage.getItem("token")
}

// getters
const getters = {
  isLoggedIn: state => state.isLoggedIn
}

// actions
const actions = {
  login ({ commit }, credentials) {
    // just example
    auth.login(response => {
      localStorage.setItem('token', 'OAUTH2-Token');
      commit(types.LOGIN_SUCCESS)
    })
  },
  logout  ({ commit }) {
    commit(types.LOGOUT)
  }
}

// mutations
const mutations = {
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true;
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
