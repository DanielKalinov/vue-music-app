<template>
  <div v-if="user" id="controls">
    <div id="song-info">
      <p>{{ currentSong ? currentSong.title : ' ' }}</p>
      <p>{{ currentSong ? currentSong.artist : ' ' }}</p>
    </div>
    <div id="progress-bar-container">
      <p style="width: 80px;">
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
      <p style="width: 80px; text-align: right;">
        {{ currentSong ? currentSong.duration : '0:00' }}
      </p>
    </div>
    <div id="buttons">
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
@import '../assets/css/styles.scss';

#controls {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 10px;
  width: 100%;
  background-color: #212121;

  #song-info {
    width: 240px;
  }

  #progress-bar-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 600px;
    height: 10px;

    #progress-bar-slider {
      -webkit-appearance: none;
      border-radius: 6px;
      height: 4px;
      width: 800px;
      cursor: pointer;
      background: linear-gradient(
        90deg,
        rgb(66, 66, 66) 50%,
        rgb(66, 66, 66) 50%
      );
      outline: none;
      transition: all 0.1s ease-in-out;

      &:hover {
        height: 6px;

        &::-moz-range-thumb {
          transform: scale(1);
        }

        &::-webkit-slider-thumb {
          transform: scale(1);
        }
      }

      &:disabled {
        cursor: auto;

        &:hover {
          height: 4px;

          &::-moz-range-thumb {
            transform: scale(0);
          }

          &::-webkit-slider-thumb {
            transform: scale(0);
          }
        }
      }

      &:active::-webkit-slider-thumb {
        box-shadow: 0 0 0 16px rgba($color: $primary, $alpha: 0.1);
      }

      &:active::-moz-range-thumb {
        box-shadow: 0 0 0 16px rgba($color: $primary, $alpha: 0.1);
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        transform: scale(0);
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
        transform: scale(0);
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

.hidden-controls-container {
  visibility: hidden;
}
</style>
