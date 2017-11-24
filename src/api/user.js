import axios from 'axios'

export default {
	fetchInfo(callback, errorCallback){
		axios.get(process.env.API_URL+'/api/user/me',{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => callback(response))
          .catch((error) => { errorCallback(error)});
	}
}