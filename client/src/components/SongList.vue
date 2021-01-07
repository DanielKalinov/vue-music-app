<template>
  <div id="song-list">
    <ul v-for="song in songs" :key="song.id">
      <li @click="playPause(song)">
        {{ song.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  created() {
    this.$store.dispatch('fetchSongs');
  },
  methods: {
    ...mapActions(['playPause'])
  },
  computed: {
    ...mapGetters(['songs'])
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;

  li {
    border-bottom: solid 1px #212121;
    padding: 20px;
    cursor: pointer;

    &:hover {
      background-color: #212121;
    }
  }
}
</style>
