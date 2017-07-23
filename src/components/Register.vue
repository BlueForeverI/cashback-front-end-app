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
      confirm_password:''
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
</style>