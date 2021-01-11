<template>
  <div id="home">
    <h1>Home</h1>
    <SongList @play="onPlay" />
  </div>
</template>

<script>
import SongList from '../SongList';

export default {
  components: {
    SongList
  },
  methods: {
    onPlay() {
      this.$emit('play');
    }
  }
};
</script>

<style lang="scss" scoped></style>
