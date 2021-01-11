<template>
  <div id="song-list">
    <ul v-for="song in songs" :key="song.id">
      <li>
        <SongItem @play="onPlay" :song="song" />
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
  methods: {
    onPlay() {
      this.$emit('play');
    }
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
