import store from '@/vuex/store'

export default {
    guest (to, from, next) {
        next(!store.getters.isLoggedIn)
    },
 
    auth (to, from, next) {
    	console.log('to route', to)
        next(store.getters.isLoggedIn ? true : {
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    }
}