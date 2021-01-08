<template>
  <div id="song-list">
    <ul v-for="song in songs" :key="song.id">
      <li>
        <SongItem :song="song" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongItem from './SongItem';

export default {
  created() {
    this.$store.dispatch('fetchSongs');
  },
  components: {
    SongItem
  },

  computed: {
    ...mapGetters(['songs'])
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
