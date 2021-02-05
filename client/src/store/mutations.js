import router from '../router';
const url = 'http://localhost:3000';

export default {
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
    state.audio.src = '';
    router.replace('/');
  },
  fetchSongs(state, payload) {
    state.allSongs = payload.allSongs;
  },
  playPause(state, payload) {
    const { song, index, playlist } = payload;
    if (state.audio.src === `${url}/stream/${song.songFilename}`) {
      if (state.audio.paused) {
        state.audio.play();
        state.paused = false;
      } else {
        state.audio.pause();
        state.paused = true;
      }
    } else {
      state.audio.src = `${url}/stream/${song.songFilename}`;
      state.audio.play();
      state.currentSong = song;
      state.playlist = playlist;
      state.currentSongIndex = index;
      state.paused = false;
    }

    state.audio.onended = () => {
      state.currentSongIndex++;
      if (state.currentSongIndex >= state[state.playlist].length) {
        state.currentSongIndex = 0;
      }

      const song = state[state.playlist][state.currentSongIndex];
      state.audio.src = `http://localhost:3000/stream/${song.songFilename}`;
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
      state.currentSongIndex = state[state.playlist].length - 1;
    }

    const song = state[state.playlist][state.currentSongIndex];
    state.audio.src = `${url}/stream/${song.songFilename}`;

    state.audio.play();
    state.currentSong = song;
    state.paused = false;
  },
  skipNextControls(state) {
    state.currentSongIndex++;
    if (state.currentSongIndex >= state[state.playlist].length) {
      state.currentSongIndex = 0;
    }

    const song = state[state.playlist][state.currentSongIndex];
    state.audio.src = `${url}/stream/${song.songFilename}`;
    state.audio.play();
    state.currentSong = song;
    state.paused = false;
  },
  addToFavorites(state, payload) {
    state.user = payload.user;
  },
  deleteSong(state, payload) {
    state.allSongs = payload.allSongs;
  },
  editSong(state, payload) {
    state.allSongs = payload.allSongs;
  }
};
