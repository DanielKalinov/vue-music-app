<template>
  <div
    class="song-item"
    :class="{ 'active-song-item': isActive }"
    @click="playPause(song)"
  >
    <div>
      <p>{{ song.title }}</p>
      <p>{{ song.artist }}</p>
    </div>
    <p>{{ song.duration }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['song', 'index'],
  methods: {
    playPause(song) {
      this.$store.dispatch('playPause', { song, index: this.index });
      this.$emit('play');
    }
  },
  computed: {
    ...mapGetters(['currentSong']),
    isActive() {
      if (this.currentSong && this.currentSong._id === this.song._id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #212121;
  padding: 20px;
  cursor: pointer;

  &:hover {
    background-color: #212121;
  }
}

.active-song-item {
  background-color: #424242;

  &:hover {
    background-color: #424242;
  }
}
</style>
