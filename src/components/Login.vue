<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="password" placeholder="password" type="password"></label><br>
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('going to dispatch event')
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push("/success")
    });
  }
}
}
</script>