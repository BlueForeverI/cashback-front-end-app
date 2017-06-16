<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="pass" placeholder="password" type="password"></label><br>
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: 'yolo@hustler.com',
      pass: ''
    }
  },
  methods: {
    login () {
      console.log('trying to login with ' + this.email + ' and pass ' + this.pass);
    }
  }
}
</script>