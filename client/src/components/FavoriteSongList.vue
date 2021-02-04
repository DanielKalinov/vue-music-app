<template>
  <div v-if="user" id="favorite-song-list">
    <ul>
      <li v-for="(song, index) in user.favoriteSongs" :key="song._id">
        <FavoriteSongItem @play="onPlay" :song="song" :index="index" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoriteSongItem from './FavoriteSongItem';

export default {
  components: {
    FavoriteSongItem
  },
  methods: {
    onPlay() {
      this.$emit('play');
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
};
</script>

<style lang="scss" scoped>
ul {
  margin: auto;
  max-width: 640px;
  list-style: none;
}
</style>
