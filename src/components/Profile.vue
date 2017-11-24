<template>
	<div>
		<img :src="profile_img_url" class="rounded-circle" width="30" height="30">
        <span class="mr-2 ml-2" v-text="firstName"></span>
	</div>
</template>
<script type="text/javascript">
	import { mapGetters } from 'vuex'

	export default {
		computed: {
    		...mapGetters([
     			 'firstName',
     			 'profile_img_url'
   		    ])
  	    },
		created(){
			this.$store.dispatch("fetchUserInfo");
		}
	}
</script>