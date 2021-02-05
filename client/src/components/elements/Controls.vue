<template>
  <div
    class="controls"
    :class="{
      'controls-visible': currentSong
    }"
  >
    <div id="controls-song-metainfo">
      <img
        v-if="currentSong"
        :src="`http://localhost:3000/songimage/${currentSong.artworkFilename}`"
      />
      <div v-else id="img-placeholder"></div>
      <div id="controls-song-info">
        <p id="controls-song-title">
          {{ currentSong ? currentSong.title : '' }}
        </p>
        <p id="controls-song-artist">
          {{ currentSong ? currentSong.artist : '' }}
        </p>
      </div>
    </div>
    <div id="progress-bar-container">
      <p id="progress-bar-current-time">
        {{ currentSong ? currentTime : '0:00' }}
      </p>
      <input
        type="range"
        min="0"
        max="100"
        value="0"
        id="progress-bar-slider"
        @input="onInput"
        ref="progressBarSlider"
        :disabled="!currentSong"
      />
      <p id="progress-bar-duration">
        {{ currentSong ? currentSong.duration : '0:00' }}
      </p>
    </div>
    <div id="controls-buttons">
      <i class="material-icons" @click="skipPreviousControls">skip_previous</i>
      <i class="material-icons" @click="playPauseControls">
        {{ paused ? 'play_arrow' : 'pause' }}
      </i>
      <i class="material-icons" @click="skipNextControls">skip_next</i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['currentTime', 'duration'],
  computed: {
    ...mapGetters([
      'user',
      'loading',
      'audio',
      'currentSong',
      'paused',
      'sliderValue'
    ])
  },
  methods: {
    ...mapActions([
      'playPauseControls',
      'skipPreviousControls',
      'skipNextControls'
    ]),
    onInput(e) {
      const slider = e.currentTarget;
      this.audio.currentTime = this.audio.duration * (slider.value / 100);
      const color =
        'linear-gradient(90deg, rgb(100, 181, 246)' +
        slider.value +
        '%, rgb(66, 66, 66)' +
        slider.value +
        '%)';

      slider.style.background = color;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/Controls.scss';
</style>
