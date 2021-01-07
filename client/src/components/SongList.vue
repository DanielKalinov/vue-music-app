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
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      audio: new Audio()
    };
  },
  created() {
    this.$store.dispatch('fetchSongs');
  },
  methods: {
    playPause(song) {
      if (this.audio.src === `http://localhost:3000/stream/${song.filename}`) {
        if (this.audio.paused) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      } else {
        this.audio.src = `http://localhost:3000/stream/${song.filename}`;
        this.audio.play();
      }
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
