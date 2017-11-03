<template>
  <div>
    <form  class="form-horizontal" @submit.prevent="register">
    <div class="col-sm-offset-2"><h2>{{ labels.registerTitle }}</h2></div>
      <div class="form-group">
        <label class="control-label col-sm-2">{{ labels.firstNameLabel }}</label> 
        <div class="col-sm-6">
          <input v-model="firstName" 
                 class="form-control"
                 @input="$v.firstName.$touch"
                 v-bind:class="{error: $v.firstName.$error, valid: $v.firstName.$dirty && !$v.firstName.$invalid}"
                 v-bind:placeholder="labels.firstNameLabel">
        </div>
        <span  v-if="$v.firstName.$error && !$v.firstName.required">{{ labels.firstNameRequiredMessage }}</span><br/>
      </div>

      <div class="form-group">
        <label class="control-label col-sm-2">{{ labels.lastNameLabel }}</label> 
        <div class="col-sm-6">
          <input v-model="lastName" 
                 class="form-control"
                 @input="$v.lastName.$touch" 
                 v-bind:class="{error: $v.lastName.$error, valid: $v.lastName.$dirty && !$v.lastName.$invalid}"
                 v-bind:placeholder="labels.lastNameLabel">
        </div>
        <span v-if="$v.lastName.$error && !$v.lastName.required">{{ labels.lastNameRequiredMessage }}</span><br/>
      </div>
      
      <div class="form-group">
        <label class="control-label col-sm-2">{{ labels.emailLabel }}</label> 
        <div class="col-sm-6">
          <input v-model="email"
                 class="form-control"
                 @input="$v.email.$touch" 
                 v-bind:class="{error: $v.email.$error, valid: $v.email.$dirty && !$v.email.$invalid}"
                 v-bind:placeholder="labels.emailLabel">
        </div>
        <span v-if="$v.email.$error && !$v.email.required">{{ labels.emailRequiredMessage }}</span><br/>
        <span v-if="$v.email.$error && !$v.email.email">{{ labels.emailNotValidMessage }}</span>
      </div>
      
      <div class="form-group">
        <label class="control-label col-sm-2">{{ labels.passwordLabel }}</label> 
        <div class="col-sm-6">
          <input v-model="password"
                 class="form-control"
                 @input="$v.password.$touch"  
                 v-bind:class="{error: $v.password.$error, valid: $v.password.$dirty && !$v.password.$invalid}"
                 v-bind:placeholder="labels.passwordLabel" 
                 type="password">
        </div>
        <span v-if="$v.password.$error && !$v.password.required">{{ labels.passwordRequiredMessage }}</span><br/>
      </div>
      
      <div class="form-group">
        <label class="control-label col-sm-2">{{ labels.confirmPasswordLabel }}</label> 
        <div class="col-sm-6">
          <input v-model="confirm_password"
                 class="form-control"
                 @input="$v.confirm_password.$touch"  
                 v-bind:class="{error: $v.confirm_password.$error, valid: $v.confirm_password.$dirty && !$v.confirm_password.$invalid}"
                 v-bind:placeholder="labels.confirmPasswordLabel" 
                 type="password">
        </div>
        <span v-if="$v.confirm_password.$error && !$v.confirm_password.required">{{ labels.repeatPasswordRequiredMessage }}</span>
        <span v-if="$v.confirm_password.$error && !$v.confirm_password.sameAsPassword">{{ labels.passwordsNotMatchingMessage }}</span><br/>
      </div>
      
      <div class="form-group"> <!-- Submit Button -->
        <div class="col-sm-10 col-sm-offset-2">                     
          <button type="submit" class="btn btn-primary">{{ labels.registerButtonLabel }}</button>
        </div>
      </div>

      <div class="form-group">
         <div class="col-sm-10 col-sm-offset-4">                    
         <g-signin-button
            :params="googleSignInParams"
            @success="onGoogleSignInSuccess"
            @error="onGoogleSignInError">
            {{ labels.registerWithGoogleLabel }}
      </g-signin-button>
       <fb-signin-button
        :params="fbSignInParams"
        @success="onFbSignInSuccess"
        @error="onFbSignInError">
        {{ labels.registerWitFacebookLabel }}
      </fb-signin-button>
        </div>
      </div>     
    </form>
    <p>{{errorMessage}}</p>
  </div>
</template>

<script>
import { labels } from '../labels/Register.labels.json'
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
      },
      labels: labels[process.env.LANG]
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