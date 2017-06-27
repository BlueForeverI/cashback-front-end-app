<template>
  <div id="app">
    <p>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/resources">Resources</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
      <a href="#" v-if="isLoggedIn" @click="logout">Logout</a> 
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'isLoggedIn',
    ])
  },
  methods: {
    logout() {
     this.$store.dispatch('logout');
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
