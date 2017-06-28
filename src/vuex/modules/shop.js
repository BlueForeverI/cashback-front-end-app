import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  shops: []
}

// getters
const getters = {
  allShops: state => state.shops
}

// actions
const actions = {
  getShops ({ commit }) {
    // just example
    shop.getShops(response => {
      commit(types.RECEIVE_SHOPS, {shops: response.data})
    })
  },
  addShop  ({ commit }) {
    commit('ADD_SHOP')
  }
}

// mutations
const mutations = {
  [types.RECEIVE_SHOPS] (state, { shops }) {
    state.shops = shops
  },
  [types.ADD_SHOP] (state) {
    const newShop = {
      text: 'New shop',
      favorite: false
    }
    state.shops.push(newShop)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
