<template>
	<header class="header-global">
		<base-nav class="navbar-main" transparent type="" effect="light" expand style="font-family: 'Comic Sans MS'">
			<router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
<!--				<img src="img/brand/blockchain2.png" alt="" />-->
        <i class="ni ni-atom ni-archive-2"></i>
			</router-link>

			<ul class="navbar-nav navbar-nav-hover align-items-lg-center">
				<a slot="title" href="/" class="nav-link" role="button">
					<span class="nav-link-inner--text" style="font-family: 'Comic Sans MS'">Home Page</span>
				</a>
<!--				<a href="/landing" class="nav-link" role="button"><li class="nav-item">Copyright Market</li></a>-->
				<a href="/profile" class="nav-link" role="button" style="font-family: 'Comic Sans MS'">
          <li class="nav-item">
          Copyright Register</li></a>




        <a href="http://localhost:5001/webui"
           style="font-family: 'Comic Sans MS'"
           target = "_blank" class="nav-link" role="button"><li class="nav-item">
          IPFS Station</li></a>


        <a href="/search" class="nav-link" style="font-family: 'Comic Sans MS'"
           role="button">
          <li class="nav-item">
          Image Retrieval</li></a>
			</ul>

			<ul class="navbar-nav align-items-lg-center ml-lg-auto">
<!--        没有登陆时显示sign up/in-->
				<li class="nav-item d-none d-lg-block ml-lg-4" v-if="!loggedin">
					<a target="_blank" role="button" v-if="!loggedin" class="btn btn-neutral btn-icon" @click="toLogin()">
						<span class="btn-inner--icon">
<!--							<i class="fa fa-cloud-download mr-2"></i>-->
              	<i class="fa fa-exchange mr-2"></i>
						</span>
						<span class="nav-link-inner--text">Sign in/Sign up</span>
					</a>
				</li>
<!--        已经登陆显示用户名-->
				<li class="nav-item d-none d-lg-block ml-lg-4" v-if="loggedin">
					<!-- <button class="btn btn-success" type="button" @click="toProfile()">
                        {{ username }}
                    </button> -->
					<base-dropdown>
						<base-button slot="title" type="success" class="dropdown-toggle">
							{{ username }}
						</base-button>
						<a class="dropdown-item" @click="toProfile()">Personal Info</a>
						<a class="dropdown-item" @click="logout()">Log out</a>
					</base-dropdown>
				</li>
			</ul>
		</base-nav>
	</header>
</template>
<script>
import BaseNav from '@/components/BaseNav';
import BaseDropdown from '@/components/BaseDropdown';
import CloseButton from '@/components/CloseButton';

export default {
	components: {
		BaseNav,
		CloseButton,
		BaseDropdown,
	},
	data() {
		return {
			//   username: this.$store.getters.name
			username: '',
		};
	},
	created: function() {
		const info = JSON.parse(localStorage.getItem('user-info'));
		this.username = info.nickname;
	},
	watch: {
		username() {
			const info = JSON.parse(localStorage.getItem('user-info'));
			if (info) {
				return info.nickname;
			} else {
				return undefined;
			}
		},
	},
	computed: {
		loggedin: {
			get() {
				if (this.$store.getters.token) {
					return true;
				} else {
					return false;
				}
			},
		},
		// username: {
		//   get() {
		//     const info = JSON.parse(localStorage.getItem('user-info'))
		//     if(info){
		//         return info.nickname
		//     } else {
		//         return undefined
		//     }
		//   }
		// }
	},
	methods: {
		toLogin() {
			this.$router.push({ path: '/login' });
		},
		toProfile() {
			this.$router.push({ path: '/profile' });
		},
		logout() {
			this.$store.dispatch('user/logout').then(() => {
				this.$router.push({ path: '/' });
			});
		},
	},
};
</script>
<style></style>
