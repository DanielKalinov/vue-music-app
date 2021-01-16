import { createStore } from 'vuex';
import axios from 'axios';
import router from './router';

axios.defaults.withCredentials = true;
const url = 'http://localhost:3000';

const store = createStore({
  state() {
    return {
      user: null,
      songs: [],
      audio: new Audio(),
      currentSong: null,
      currentSongIndex: null,
      paused: false,
      loading: true
    };
  },
  actions: {
    auth(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${url}/auth`)
          .then((res) => {
            context.commit('auth', { user: res.data.user });
            resolve(res.data.user);
          })
          .catch((err) => {
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
      axios.get('http://localhost:3000/songs').then((res) => {
        context.commit('fetchSongs', { songs: res.data });
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
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    playPause(context, payload) {
      const { song, index } = payload;
      context.commit('playPause', { song, index });
    },
    playPauseControls(context) {
      context.commit('playPauseControls');
    },
    skipPreviousControls(context) {
      context.commit('skipPreviousControls');
    },
    skipNextControls(context) {
      context.commit('skipNextControls');
    }
  },
  mutations: {
    auth(state, payload) {
      if (payload.user) {
        state.user = payload.user;
        state.loading = false;
      } else {
        state.user = null;
        state.loading = false;
      }
    },
    signUp(state, payload) {
      state.user = payload.user;
    },
    login(state, payload) {
      state.user = payload.user;
    },
    logOut(state) {
      state.user = null;
      router.replace('/login');
    },
    fetchSongs(state, payload) {
      state.songs = payload.songs;
    },
    playPause(state, payload) {
      const { song, index } = payload;
      if (state.audio.src === `http://localhost:3000/stream/${song.filename}`) {
        if (state.audio.paused) {
          state.audio.play();
          state.paused = false;
        } else {
          state.audio.pause();
          state.paused = true;
        }
      } else {
        state.audio.src = `http://localhost:3000/stream/${song.filename}`;
        state.audio.play();
        state.currentSong = song;
        state.currentSongIndex = index;
        state.paused = false;
      }

      state.audio.onended = () => {
        state.currentSongIndex++;
        if (state.currentSongIndex >= state.songs.length) {
          state.currentSongIndex = 0;
        }

        const song = state.songs[state.currentSongIndex];
        state.audio.src = `http://localhost:3000/stream/${song.filename}`;
        state.audio.play();
        state.currentSong = song;
        state.paused = false;
      };
    },
    playPauseControls(state) {
      if (state.audio.paused) {
        state.audio.play();
        state.paused = false;
      } else {
        state.audio.pause();
        state.paused = true;
      }
    },
    skipPreviousControls(state) {
      state.currentSongIndex--;
      if (state.currentSongIndex < 0) {
        state.currentSongIndex = state.songs.length - 1;
      }

      const song = state.songs[state.currentSongIndex];
      state.audio.src = `http://localhost:3000/stream/${song.filename}`;
      state.audio.play();
      state.currentSong = song;
      state.paused = false;
    },
    skipNextControls(state) {
      state.currentSongIndex++;
      if (state.currentSongIndex >= state.songs.length) {
        state.currentSongIndex = 0;
      }

      const song = state.songs[state.currentSongIndex];
      state.audio.src = `http://localhost:3000/stream/${song.filename}`;
      state.audio.play();
      state.currentSong = song;
      state.paused = false;
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    songs(state) {
      return state.songs;
    },
    audio(state) {
      return state.audio;
    },
    currentSong(state) {
      return state.currentSong;
    },
    paused(state) {
      return state.paused;
    }
  }
});

export default store;
