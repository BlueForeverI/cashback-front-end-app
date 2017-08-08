<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>Firstname</label> 
      <input v-model="firstName" 
             @input="$v.firstName.$touch"
             v-bind:class="{error: $v.firstName.$error, valid: $v.firstName.$dirty && !$v.firstName.$invalid}"
             placeholder="first name">
      <span  v-if="$v.firstName.$error && !$v.firstName.required">Firstname is required.</span><br/>
      
      <label>Lastname</label> 
      <input v-model="lastName" 
             @input="$v.lastName.$touch" 
             v-bind:class="{error: $v.lastName.$error, valid: $v.lastName.$dirty && !$v.lastName.$invalid}"
             placeholder="last name">
      <span v-if="$v.lastName.$error && !$v.lastName.required">Lastname is required.</span><br/>
      
      <label>Email</label> 
      <input v-model="email"
             @input="$v.email.$touch" 
             v-bind:class="{error: $v.email.$error, valid: $v.email.$dirty && !$v.email.$invalid}"
             placeholder="email">
      <span v-if="$v.email.$error && !$v.email.required">Email is required.</span><br/>
      <span v-if="$v.email.$error && !$v.email.email">Email is not valid</span>

      <label>Password</label> 
      <input v-model="password"
             @input="$v.password.$touch"  
             v-bind:class="{error: $v.password.$error, valid: $v.password.$dirty && !$v.password.$invalid}"
             placeholder="password" 
             type="password">
      <span v-if="$v.password.$error && !$v.password.required">Password is required.</span><br/>

      <label>Confirm Password</label> 
      <input v-model="confirm_password"
             @input="$v.confirm_password.$touch"  
             v-bind:class="{error: $v.confirm_password.$error, valid: $v.confirm_password.$dirty && !$v.confirm_password.$invalid}"
             placeholder="confirm_password" 
             type="password">
      <span v-if="$v.confirm_password.$error && !$v.confirm_password.required">Password is required.</span>
      <span v-if="$v.confirm_password.$error && !$v.confirm_password.sameAsPassword">Two passwords do not match.</span><br/>

      <button type="submit">register</button>
      <g-signin-button
            :params="googleSignInParams"
            @success="onGoogleSignInSuccess"
            @error="onGoogleSignInError">
            Register with Google
      </g-signin-button>
      <fb-signin-button
        :params="fbSignInParams"
        @success="onFbSignInSuccess"
        @error="onFbSignInError">
        Register with Facebook
      </fb-signin-button>
    </form>
    <p>{{errorMessage}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password:'',
      googleSignInParams: {
                client_id: '366762494274-ocpbfj8q34pgn6f4omkt8l5jq5bhk3bd.apps.googleusercontent.com'
      },
      fbSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      }
    }
  },
  validations:{
    firstName:{
      required
    },
    lastName:{
      required
    },
    email:{
      required, email
    },
    password:{
      required
    },
    confirm_password:{
      required,sameAsPassword: sameAs('password')
    }
  },
  computed: {
    ...mapGetters([
      'errorMessage',
    ])
  },
  methods: {
    register() {
      if(this.$v.$invalid===true){
        return;
      }
      
      this.$store.dispatch("register", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        redirect: this.$route.query.redirect || '/'
      });
    },
    onGoogleSignInSuccess (googleUser) {
      var self = this;
      var profile = googleUser.getBasicProfile();
      this.$store.dispatch('register', {
          email: profile['U3'],
          password: profile['Eea'],
          firstName: profile['ofa'],
          lastName: profile['wea'],
          imageUrl: profile['Paa']
      })
      .then(response => {
          var token = googleUser.Zi.access_token;
          self.$store.dispatch("googleLogin", token);
      },
      error => console.log(error));
    },
    onGoogleSignInError (error) {
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

<style scoped>
.error {
  border-color: red;
  background: #FDD;
}

.error:focus {
  outline-color: #F99;
}

.valid {
  border-color: #5A5;
  background: #EFE;
}

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