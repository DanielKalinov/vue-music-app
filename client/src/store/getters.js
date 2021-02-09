export default {
  user(state) {
    return state.user;
  },
  loading(state) {
    return state.loading;
  },
  allSongs(state) {
    return state.allSongs;
  },
  favoriteSongs(state) {
    return state.favoriteSongs;
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
};
