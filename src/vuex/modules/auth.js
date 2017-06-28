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
    auth.login(credentials, response => {
      localStorage.setItem('token', response.data.access_token);
      commit(types.LOGIN_SUCCESS)
    })
  },
  logout  ({ commit }) {
    localStorage.removeItem("token");
    commit(types.LOGOUT)
  }
}

// mutations
const mutations = {
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true;
    console.log('here baby')
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
