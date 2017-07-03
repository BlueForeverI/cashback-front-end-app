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
            router.push('credentials.redirect')
        }, error => {
            commit(types.LOGIN_ERROR, { errorMessage: error.response.data.error_description })
        })
    },
    logout({ commit }) {
        localStorage.removeItem("token");
        commit(types.LOGOUT)
    },
    googleLogin({ commit }, googleToken) {
        auth.googleLogin(googleToken)
            .then(response => {
                localStorage.setItem('token', response.data.access_token);
                commit(types.LOGIN_SUCCESS)
                router.push('/')
            }, error => {
                commit(types.LOGIN_ERROR, { errorMessage: error.response.data.error_description })
            })
    },
    register({ commit }, userData) {
        return new Promise((resolve, reject) => {
            auth.register(userData)
                .then(response => {
                    commit(types.REGISTER_SUCCESS)
                    resolve(response);
                }, error => {
                    commit(types.REGISTER_ERROR, { errorMessage: error })
                    reject(error);
                })
        });
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
    [types.LOGIN_ERROR](state, { errorMessage }) {
        state.errorMessage = errorMessage
    },
    [types.REGISTER_SUCCESS](state) {
        state.errorMessage = '';
    },
    [types.REGISTER_ERROR](state, { errorMessage }) {
        state.errorMessage = errorMessage;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}