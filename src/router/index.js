import Vue from 'vue'
import Router from 'vue-router'
import Resources from '@/components/Resources'
import About from '@/components/About'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Guard from '../middleware'
import Vuelidate from 'vuelidate'

Vue.use(Router)
Vue.use(Vuelidate)

export default new Router({
  routes: [
    { path: '/resources', name: 'Resources', component: Resources },
    { path: '/about', name: 'About', component: About },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard , beforeEnter: Guard.auth},
    { path: '/login', name: 'Login', component: Login , beforeEnter: Guard.guest},
    { path: '/register', name: 'Register', component: Register , beforeEnter: Guard.guest}
  ]
})
