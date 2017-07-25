<template>
    <div>
        <h2>Register</h2>
        <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Register with Google
        </g-signin-button>
        <p>{{errorMessage}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            googleSignInParams: {
                client_id: '366762494274-ocpbfj8q34pgn6f4omkt8l5jq5bhk3bd.apps.googleusercontent.com'
            }
        }
    },
    computed: {
        ...mapGetters(['errorMessage'])
    },
    methods: {
        onSignInSuccess (googleUser) {
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
        onSignInError (error) {
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
</style>