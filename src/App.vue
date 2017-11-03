<template>
  <div id="app" class="container">
    <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">{{ labels.toggleNavigation }}</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/"  class="navbar-brand">Keshback</router-link>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <router-link to="/dashboard" tag="li" v-if="isLoggedIn"><a>{{ labels.dashboard }}</a></router-link>
          <router-link to="/about" tag="li"><a>{{ labels.about }}</a></router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <router-link to="/register"  tag="li" v-if="!isLoggedIn"><a>{{ labels.signUp }}</a></router-link>
          <router-link to="/login"  tag="li" v-if="!isLoggedIn"><a>{{ labels.signIn }}</a></router-link>
          <li @click="logout" v-if="isLoggedIn"><a href="#">{{ labels.logout }}</a></li>
        </ul>
      </div>
    </div>
</nav>
  <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { labels } from './labels/App.labels.json'

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
  data: () => { 
    return {
      labels: labels[process.env.LANG]
    }
  }
}
</script>

<style lang="scss">
  $icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
  @import 'styles/bootswatch/_variables';
  @import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';
  @import 'styles/bootswatch/_bootswatch';
</style>
