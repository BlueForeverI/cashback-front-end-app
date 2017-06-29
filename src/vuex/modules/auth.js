import auth from '../../api/auth'
import * as types from '../mutation-types'

// initial state
const state = {
  isLoggedIn: !!localStorage.getItem("token"),
  errorMessage: ''
}

// getters
const getters = {
  isLoggedIn: state => state.isLoggedIn,
  errorMessage: state => state.errorMessage
}

// actions
const actions = {
  login ({ commit }, credentials) {
    auth.login(credentials, response => {
      localStorage.setItem('token', response.data.access_token);
      commit(types.LOGIN_SUCCESS)
    }, error => {
      commit(types.LOGIN_ERROR, { errorMessage: error.response.data.error_description})
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
    state.errorMessage ='';
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false;
  },
  [types.LOGIN_ERROR] (state, { errorMessage }){
    state.errorMessage = errorMessage
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
