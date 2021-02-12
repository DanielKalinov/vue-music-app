import { createStore } from 'vuex';
import rootActions from './actions';
import rootMutations from './mutations';
import rootGetters from './getters';
import axios from 'axios';

axios.defaults.withCredentials = true;

const store = createStore({
	state() {
		return {
			user: null,
			allSongs: [],
			favoriteSongs: [],
			audio: new Audio(),
			currentSong: null,
			playlist: [],
			currentSongIndex: null,
			paused: true,
			loading: true
		};
	},
	actions: rootActions,
	mutations: rootMutations,
	getters: rootGetters
});

export default store;
