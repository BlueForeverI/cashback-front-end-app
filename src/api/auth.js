import axios from 'axios'
import base64 from 'base-64'
const querystring = require('querystring');

export default {
    login(credentials, callback, errorCallback) {
        var data = querystring.stringify({
            "grant_type": process.env.OAUTH_GRANT_TYPE,
            "scope": process.env.OAUTH_SCOPE,
            "client_id": process.env.OAUTH_CLIENT_ID,
            "username": credentials.email,
            "password": credentials.password
        })
        var clientIdAndSecretBase64 = process.env.OAUTH_CLIENT_ID + ":" + process.env.OAUTH_CLIENT_SECRET;
        var config = {
            headers: {
                'Authorization': 'Basic ' + base64.encode(clientIdAndSecretBase64),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        
        axios.post(process.env.API_URL + '/oauth/token', data, config)
            .then((response) => callback(response))
            .catch((error) => {
                if (error.response) {
                    console.log('server error')
                    console.log(error.response.data);
                    errorCallback(error)
                } else {
                    console.log('request error')
                    console.log('Error', error.message);
                }
            });
    },
    externalLogin(token, provider) {
        var config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        return new Promise((resolve, reject) => {
            axios.get(process.env.API_URL + '/oauth/token/' + provider, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    reject(error);
                });
        });
    },
    googleLogin(googleToken) {
        return this.externalLogin(googleToken, "google");
    },
    facebookLogin(facebookToken) {
        return this.externalLogin(facebookToken, "facebook")
    },
    register(userData) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return new Promise((resolve, reject) => {
            axios.post(process.env.API_URL + '/api/user', JSON.stringify(userData), config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        });
    }
}