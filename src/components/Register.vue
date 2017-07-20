<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>Firstname <input v-model="firstName" placeholder="first name"></label><br/>
      <label>Lastname <input v-model="lastName" placeholder="last name"></label><br/>
      <label>Email <input v-model="email" placeholder="email"></label><br/>
      <label>Password <input v-model="password" placeholder="password" type="password"></label><br>
      <button type="submit">register</button>
    </form>
    <p>{{errorMessage}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
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
    register() {
      this.$store.dispatch("register", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        redirect: this.$route.query.redirect || '/'
      });
  }
}
}
</script>