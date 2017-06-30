import axios from 'axios'
const querystring = require('querystring');

export default {
  login (credentials, callback, errorCallback) {

  	var data = querystring.stringify({
	    "grant_type": "password",
	    "scope": "read write trust",
	    "client_id":"user",
	    "username": credentials.email,
	    "password": credentials.password
	  })
	  
  	var config = {
  		 headers: {
		  	'Authorization': 'Basic dXNlcjpwYXNzd29yZDE=',
		  	'Content-Type':'application/x-www-form-urlencoded'
		  }
  	}
  	axios.post('http://localhost:8080/oauth/token', data, config)
  		.then((response) => callback(response))
  		.catch((error) => {
  			if (error.response) {
  				console.log('server error')
  				console.log(error.response.data);
  				errorCallback(error)
  			}else{
  				console.log('request error')
  				console.log('Error', error.message);
  			}
  		});
 //  	axios.request({
	//   url: "/oauth/token",
	//   method: "post",
	//   baseURL: "http://localhost:8080",
	//   data: querystring.stringify({
	//     "grant_type": "password",
	//     "scope": "read write trust",
	//     "client_id":"user",
	//     "username": credentials.email,
	//     "password": credentials.password
	//   }),
	//   headers: {
	//   	'Authorization': 'Basic dXNlcjpwYXNzd29yZDE=',
	//   	'Content-Type':'application/x-www-form-urlencoded'
	//   }
	// }).then((response) => callback(response)).catch(function (error){console.log('errorrrrrr')});
  }
}
