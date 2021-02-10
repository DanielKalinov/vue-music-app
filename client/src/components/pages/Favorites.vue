<template>
  <div id="favorites">
    <FavoriteSongList v-if="favoriteSongs.length > 0" @play="onPlay" />
    <div v-else id="msg-container">
      <h2>No songs added to Favorites yet.</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoriteSongList from '../elements/FavoriteSongList';

export default {
  components: {
    FavoriteSongList
  },
  methods: {
    playPause(song, index) {
      this.$store.dispatch('playPause', {
        song,
        index,
        playlist: 'favoriteSongs'
      });
      this.$emit('play');
    },
    onPlay() {
      this.$emit('play');
    }
  },
  computed: {
    ...mapGetters(['user', 'favoriteSongs'])
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;

  li {
    padding: 10px;

    &:hover {
      background-color: #424242;
    }
  }
}
#msg-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 200px;
}
</style>
