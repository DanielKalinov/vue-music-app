<template>
  <div id="favorites">
    <ul v-if="user">
      <li
        v-for="(song, index) in favoriteSongs"
        :key="song._id"
        @click="playPause(song, index)"
      >
        <p>{{ song.title }}</p>
        <p>{{ song.artist }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    playPause(song, index) {
      this.$store.dispatch('playPause', {
        song,
        index,
        playlist: 'favoriteSongs'
      });
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
