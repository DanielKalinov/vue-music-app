<template>
	<header>
		<template v-if="user">
			<ul id="nav-links">
				<li>
					<router-link to="/">Home</router-link>
				</li>
				<li>
					<router-link to="/uploadsong">Upload</router-link>
				</li>
				<li>
					<router-link to="/favorites">Favorites</router-link>
				</li>
				<li>
					<router-link to="/mysongs">My Songs</router-link>
				</li>
			</ul>
			<ul id="auth-links">
				<li>
					<p>{{ user.username }}</p>
				</li>
				<li>
					<button @click="logOut" id="logoutBtn" class="button secondary-btn">
						Log Out
					</button>
				</li>
			</ul>
		</template>
		<template v-else>
			<ul id="nav-links">
				<li>
					<router-link to="/">Home</router-link>
				</li>
			</ul>
			<ul id="auth-links">
				<li>
					<router-link to="/signup" id="signupBtn" class="button primary-btn"
						>Sign Up</router-link
					>
				</li>
				<li>
					<router-link to="/login" id="loginBtn" class="button secondary-btn"
						>Log In</router-link
					>
				</li>
			</ul>
		</template>
	</header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		...mapActions(['logOut'])
	}
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/Header.scss';
</style>
