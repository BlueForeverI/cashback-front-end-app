<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="password" placeholder="password" type="password"></label><br>
      <button type="submit">login</button>
    </form>
    <p>{{errorMessage}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters([
      'errorMessage',
    ])
  },
  methods: {
    login() {
      console.log('going to dispatch event')
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      }).then(() => {
        if (this.errorMessage=='') {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      
    });
  }
}
}
</script>