<template>
  <div id="app">
    <Header />
    <div id="header-offset"></div>
    <router-view @play="onPlay"></router-view>
    <div id="controls-offset"></div>
    <Controls ref="controls" :currentTime="currentTime" />
  </div>
</template>

<script>
import './assets/css/styles.scss';
import Header from './components/Header.vue';
import Controls from './components/Controls.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      currentTime: 0
    };
  },
  created() {
    this.$store.dispatch('auth').catch(() => {});
  },
  components: { Header, Controls },
  methods: {
    onPlay() {
      const slider = this.$refs.controls.$refs.progressBarSlider;

      this.audio.ontimeupdate = () => {
        const sliderValueInPercent =
          100 * (this.audio.currentTime / this.audio.duration);
        slider.value = sliderValueInPercent;

        const color =
          'linear-gradient(90deg, rgb(100, 181, 246)' +
          slider.value +
          '%, rgb(66, 66, 66)' +
          slider.value +
          '%)';
        slider.style.background = color;

        var mins = ~~((this.audio.currentTime % 3600) / 60);
        var secs = ~~this.audio.currentTime % 60;

        var result = '';

        result += '' + mins + ':' + (secs < 10 ? '0' : '');
        result += '' + secs;

        this.currentTime = result;
      };
    }
  },
  computed: {
    ...mapGetters(['audio', 'user', 'loading'])
  }
};
</script>
-
<style lang="scss">
#app {
  margin: auto;
  max-width: 960px;

  #header-offset {
    margin-top: 61px;
  }

  #controls-offset {
    margin-bottom: 84px;
  }
}
</style>
