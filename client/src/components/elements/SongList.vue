<template>
  <div v-if="user" id="song-list">
    <ul>
      <li v-for="(song, index) in allSongs" :key="song.id">
        <SongItem @play="onPlay" :song="song" :index="index" />
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
    ...mapGetters(['allSongs', 'user'])
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
