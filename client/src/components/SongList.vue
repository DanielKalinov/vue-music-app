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
export default {
  data() {
    return {
      audio: new Audio(),
      songs: []
    };
  },
  created() {
    this.$http.get('http://localhost:3000/songs').then((res) => {
      this.songs = res.data;
    });
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
