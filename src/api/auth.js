import axios from 'axios'
const querystring = require('querystring');

export default {
  login (credentials, callback) {
  	console.log('logging in with credentials ' + credentials.email +' and '+ credentials.password)
  	axios.request({
	  url: "/oauth/token",
	  method: "post",
	  baseURL: "http://localhost:8080",
	  data: querystring.stringify({
	    "grant_type": "password",
	    "scope": "read write trust",
	    "client_id":"user",
	    "username": credentials.email,
	    "password": credentials.password
	  }),
	  headers: {
	  	'Authorization': 'Basic dXNlcjpwYXNzd29yZDE=',
	  	'Content-Type':'application/x-www-form-urlencoded'
	  }
	}).then((response) => callback(response))
  }
}
