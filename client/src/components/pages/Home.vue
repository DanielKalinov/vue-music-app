<template>
  <div id="home">
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

<style lang="scss" scoped>
#home {
  flex-grow: 1;
}
</style>
