import axios from 'axios';
import router from '../router';
const url = 'http://localhost:3000';

export default {
	auth(context) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${url}/auth`)
				.then((res) => {
					context.commit('auth', { user: res.data.user });
					resolve({ user: res.data.user });
				})
				.catch((err) => {
					context.commit('auth', { user: null });
					reject(err);
				});
		});
	},
	signUp(context, payload) {
		const { email, username, password } = payload;
		return new Promise((resolve, reject) => {
			axios
				.post(`${url}/signup`, { email, username, password })
				.then((res) => {
					resolve(res);

					context.commit('signUp', { user: res.data.user });

					router.replace('/');
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	logIn(context, payload) {
		const { email, password } = payload;
		return new Promise((resolve, reject) => {
			axios
				.post(`${url}/login`, {
					email,
					password
				})
				.then((res) => {
					resolve(res);
					context.commit('login', { user: res.data.user });

					router.replace('/');
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	logOut(context) {
		axios.delete(`${url}/logout`).then(() => {
			context.commit('logOut');
		});
	},
	fetchSongs(context) {
		axios.get(`${url}/songs`).then((res) => {
			context.commit('fetchSongs', { allSongs: res.data.songs });
		});
	},
	uploadSong(context, payload) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${url}/uploadsong`, payload, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then((res) => {
					resolve(res.data);

					context.commit('uploadSong', {
						uploadedSongs: res.data.uploadedSongs
					});

					router.replace('/');
				})
				.catch((err) => {
					reject(err.response.data);
				});
		});
	},
	playPause(context, payload) {
		context.commit('playPause', payload);
	},
	playPauseControls(context) {
		context.commit('playPauseControls');
	},
	skipPreviousControls(context) {
		context.commit('skipPreviousControls');
	},
	skipNextControls(context) {
		context.commit('skipNextControls');
	},
	addToFavorites(context, payload) {
		axios
			.post(`${url}/addfavorite/${payload.song._id}`, {
				userID: payload.userID,
				song: payload.song
			})
			.then((res) => {
				context.commit('addToFavorites', {
					favoriteSongs: res.data.favoriteSongs
				});
			});
	},
	deleteSong(context, payload) {
		axios
			.post(`${url}/deletesong/${payload.song._id}`, {
				userID: payload.userID,
				song: payload.song
			})
			.then((res) => {
				context.commit('deleteSong', {
					allSongs: res.data.allSongs,
					uploadedSongs: res.data.uploadedSongs
				});
			});
	},
	editSong(context, payload) {
		const { userID, song } = payload;
		axios
			.put(`${url}/editsong/${song.songID}`, { userID, song })
			.then((res) => {
				context.commit('editSong', {
					allSongs: res.data.allSongs,
					uploadedSongs: res.data.uploadedSongs
				});
				router.replace('/');
			});
	}
};
