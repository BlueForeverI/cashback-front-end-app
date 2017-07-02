import axios from 'axios'
import { api_url, grant_type, client_id, client_secret, scope } from '../../env.js'
import base64 from 'base-64'
const querystring = require('querystring');

export default {
    login(credentials, callback, errorCallback) {
        var data = querystring.stringify({
            "grant_type": grant_type,
            "scope": scope,
            "client_id": client_id,
            "username": credentials.email,
            "password": credentials.password
        })
        var clientIdAndSecretBase64 = client_id + ":" + client_secret;
        var config = {
            headers: {
                'Authorization': 'Basic ' + base64.encode(clientIdAndSecretBase64),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post(api_url + '/oauth/token', data, config)
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
    googleLogin(googleToken, callback, errorCallback) {
        var config = {
            headers: {
                'Authorization': 'Bearer ' + googleToken
            }
        }

        axios.get(api_url + '/oauth/token/google', config)
            .then((response) => callback(response))
            .catch((error) => {
                errorCallback(error);
            });
    }
}