<template>
  <div id="app" class="container">
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link to="/"  class="navbar-brand" tag="a">Keshback</router-link>
    <div class="collapse navbar-collapse d-flex" id="navbarNavDropdown">
      <ul class="navbar-nav left-nav">
        <router-link to="/dashboard" tag="li" class="nav-item" v-if="isLoggedIn"><a class="nav-link">{{ labels.dashboard }}</a></router-link>
        <router-link to="/about" tag="li" class="nav-item"><a class="nav-link">{{labels.about}}</a></router-link>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav right-nav d-flex justify-content-end align-items-center">
        <profile v-if="isLoggedIn"></profile>
        <router-link to="/register" class="nav-item" tag="li" v-if="!isLoggedIn"><a class="nav-link">{{ labels.signUp }}</a></router-link>
        <router-link to="/login" class="nav-item" tag="li" v-if="!isLoggedIn"><a class="nav-link">{{ labels.signIn }}</a></router-link>
        <li class="nav-item" @click="logout" v-if="isLoggedIn">
          <a href="#" class="nav-link">{{ labels.signOut }}</a>
        </li>
      </ul>
    </div>
  </nav>
  <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { labels } from './labels/App.labels.json'
import Profile from './components/Profile.vue'

export default {
  name: 'app',
  components: {Profile},
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

<style lang="css">
  .left-nav{
    flex:3;
  }

  .right-nav{
    flex:1;
  }
</style>
