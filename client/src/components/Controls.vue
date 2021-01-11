<template>
  <div id="controls-container">
    <div id="controls">
      <div v-if="currentSong" id="song-info">
        <p>{{ currentSong.title }}</p>
        <p>{{ currentSong.artist }}</p>
      </div>
      <div id="progress-bar-container">
        <p v-if="currentSong" style="width: 200px;">
          {{ currentTime }}
        </p>
        <input
          type="range"
          min="0"
          max="100"
          :value="0"
          id="progress-bar-slider"
          @input="onInput"
          ref="progressBarSlider"
        />
        <p v-if="currentSong" style="width: 200px; text-align: right;">
          {{ currentSong.duration }}
        </p>
      </div>
      <div id="buttons">
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
  props: ['currentTime'],
  computed: {
    ...mapGetters(['loading', 'audio', 'currentSong', 'paused', 'sliderValue'])
  },
  methods: {
    ...mapActions(['playPauseControls']),
    onInput(e) {
      const slider = e.currentTarget;
      this.audio.currentTime = this.audio.duration * (slider.value / 100);

      const color =
        'linear-gradient(90deg, rgb(100, 181, 246)' +
        slider.value +
        '%, rgb(224, 224, 224)' +
        slider.value +
        '%)';

      slider.style.background = color;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/styles.scss';

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

    #progress-bar-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 400px;
      height: 10px;

      #progress-bar-slider {
        -webkit-appearance: none;
        border-radius: 6px;
        height: 6px;
        width: 400px;
        cursor: pointer;
        background: linear-gradient(
          90deg,
          rgb(224, 224, 224),
          50%,
          rgb(224, 224, 224) 50%
        );
        outline: none;

        &:active::-webkit-slider-thumb {
          box-shadow: 0 0 0 16px rgba($color: $primary, $alpha: 0.1);
        }

        &:active::-moz-range-thumb {
          box-shadow: 0 0 0 16px rgba($color: $primary, $alpha: 0.1);
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          border: none;
          border-radius: 50%;
          height: 16px;
          width: 16px;
          cursor: pointer;
          background-color: $primary;
          box-shadow: 0 0 4px rgba($color: black, $alpha: 0.4);
          transition: all 0.1s ease-in-out;
        }

        &::-moz-range-thumb {
          border: none;
          border-radius: 50%;
          height: 16px;
          width: 16px;
          cursor: pointer;
          background-color: $primary;
          box-shadow: 0 0 4px rgba($color: black, $alpha: 0.4);
          transition: all 0.1s ease-in-out;
        }
      }
    }

    #buttons {
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

.hidden-controls-container {
  visibility: hidden;
}
</style>
