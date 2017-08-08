import auth from '../../api/auth'
import router from '../../router/index'
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
    login({ commit }, credentials) {
        auth.login(credentials, response => {
            localStorage.setItem('token', response.data.access_token);
            commit(types.LOGIN_SUCCESS)
            router.push(credentials.redirect)
        }, error => {
            commit(types.ERROR, { errorMessage: error.response.data.error_description })
        })
    },
    register({ commit }, userData) {
        auth.register(userData).then(response => {
            //commit(types.REGISTER_SUCCESS)
            console.log('you register successfullyd')
            router.push('/login')
        }, error => {
            console.log('your registration failed')
            commit(types.ERROR, { errorMessage: error.response.data.errorMessage })
        })
    },
    logout({ commit }) {
        localStorage.removeItem("token");
        commit(types.LOGOUT)
    },
    externalLogin(promise, commit) {
        promise.then(response => {
            localStorage.setItem('token', response.data.access_token);
            commit(types.LOGIN_SUCCESS)
            router.push("/")
        }, error => {
            commit(types.ERROR, { errorMessage: error.response.data.error_description })
        });
    },
    googleLogin({ commit }, googleToken) {
        actions.externalLogin(auth.googleLogin(googleToken), commit)
    },
    facebookLogin({ commit }, facebookToken) {
        actions.externalLogin(auth.facebookLogin(facebookToken), commit)
    }
}

// mutations
const mutations = {
    [types.LOGIN_SUCCESS](state) {
        state.isLoggedIn = true;
        state.errorMessage = ''; //not sure if this is the best place to clear the error message
    },
    [types.LOGOUT](state) {
        state.isLoggedIn = false;
    },
    [types.ERROR](state, { errorMessage }) {
        state.errorMessage = errorMessage
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}