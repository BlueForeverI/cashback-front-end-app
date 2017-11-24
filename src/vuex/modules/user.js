import user from '../../api/user'

const state = {
	username: 'initial',
	firstName: 'initial',
	profile_img_url: 'https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png'
}

const getters = {
	username: state => state.username,
	firstName: state => state.firstName,
	profile_img_url: state => state.profile_img_url
}

const actions = {
	fetchUserInfo({commit}) {
		user.fetchInfo(response => {
			commit("USERINFO_FETCHED", response.data.data);
		}, error => {
			console.log('error fetching user info ' + error);
		});
	}
}

const mutations = {
	USERINFO_FETCHED(state, data) {
		state.firstName = data.firstName;	
		state.profile_img_url = data.imageUrl;
	}
}

export default {
	state, 
	getters,
	actions,
	mutations
}