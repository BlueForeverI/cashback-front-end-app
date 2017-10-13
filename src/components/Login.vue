<template>
  <div>
    <form class="form-horizontal" @submit.prevent="login">
      <div class="col-sm-offset-2"><h2>Sign in</h2></div>
      <div class="form-group">
        <label class="control-label col-sm-2">Email</label> 
        <div class="col-sm-6">
          <input class="form-control" v-model="email" placeholder="email">
        </div>
       </div>
       <div class="form-group">
        <label class="control-label col-sm-2">Password</label> 
        <div class="col-sm-6">
          <input class="form-control" v-model="password" placeholder="password" type="password">
        </div>
       </div>

       <div class="form-group">
         <div class="col-sm-10 col-sm-offset-2">
          <button class="btn btn-primary" type="submit">Sign in</button>
         </div>
      </div>

      <div class="form-group">
         <div class="col-sm-10 col-sm-offset-4">
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
         </div>
      </div>

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