<template>
  <div v-if="currentSong" id="controls-container">
    <div id="controls">
      <div class="song-info">
        <p>{{ currentSong.title }}</p>
        <p>{{ currentSong.artist }}</p>
      </div>
      <div class="buttons">
        <i class="material-icons">skip_previous</i>
        <i class="material-icons" @click="playPauseControls">
          {{ paused ? 'play_arrow' : 'pause' }}
        </i>
        <i class="material-icons">skip_next</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['currentSong', 'paused'])
  },
  methods: {
    ...mapActions(['playPauseControls'])
  }
};
</script>

<style lang="scss" scoped>
#controls-container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #212121;

  #controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    padding: 20px;
    max-width: 960px;

    .buttons {
      i {
        border-radius: 6px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        user-select: none;

        &:hover {
          background-color: #424242;
        }
      }
    }
  }
}
</style>
