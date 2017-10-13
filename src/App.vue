<template>
  <div id="app" class="container">
    <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/"  class="navbar-brand">YMCMB</router-link>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <router-link to="/dashboard" tag="li" v-if="isLoggedIn"><a>Dashboard</a></router-link>
          <router-link to="/about" tag="li"><a>About</a></router-link>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#">Bitcoin</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <router-link to="/register"  tag="li" v-if="!isLoggedIn"><a>Sign up</a></router-link>
          <router-link to="/login"  tag="li" v-if="!isLoggedIn"><a>Sign in</a></router-link>
          <li @click="logout" v-if="isLoggedIn"><a>Logout</a></li>
        </ul>
      </div>
    </div>
</nav>
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

<style lang="scss">
$icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
@import 'styles/bootswatch/_variables';
@import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';
@import 'styles/bootswatch/_bootswatch';
</style>
