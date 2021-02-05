<template>
  <div id="favorites">
    <FavoriteSongList @play="onPlay" />
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
</style>
