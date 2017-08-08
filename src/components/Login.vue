<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="password" placeholder="password" type="password"></label><br>
      <button type="submit">login</button>
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        Sign in with Google
      </g-signin-button>
      <fb-signin-button
        :params="fbSignInParams"
        @success="onFbSignInSuccess"
        @error="onFbSignInError">
        Sign in with Facebook
      </fb-signin-button>
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
      password: '',
      googleSignInParams: {
        client_id: '366762494274-ocpbfj8q34pgn6f4omkt8l5jq5bhk3bd.apps.googleusercontent.com'
      },
      fbSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'errorMessage',
    ])
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
        redirect: this.$route.query.redirect || '/'
      });
    },
    onSignInSuccess (googleUser) {
      var token = googleUser.Zi.access_token;
      this.$store.dispatch("googleLogin", token);
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
	  onFbSignInSuccess (response) {
      var token = response.authResponse.accessToken;
      this.$store.dispatch("facebookLogin", token);
	  },
	  onFbSignInError (error) {
	    console.log('OH NOES', error)
	  }  
	}
}

</script>

<style>
  .g-signin-button {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
  .fb-signin-button {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
  }
</style>