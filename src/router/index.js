import Vue from 'vue'
import Router from 'vue-router'
import Resources from '@/components/Resources'
import About from '@/components/About'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/resources', name: 'Resources', component: Resources },
    { path: '/about', name: 'About', component: About },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/login', name: 'Login', component: Login }
  ]
})
