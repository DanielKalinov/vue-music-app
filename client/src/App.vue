<template>
  <div id="app">
    <Header />
    <div id="header-offset"></div>
    <router-view @play="onPlay"></router-view>
    <Controls ref="controls" />
  </div>
</template>

<script>
import './assets/css/styles.scss';
import Header from './components/Header.vue';
import Controls from './components/Controls.vue';
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch('auth');
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
          'linear-gradient(90deg, rgb(102, 187, 106)' +
          slider.value +
          '%, rgb(224, 224, 224)' +
          slider.value +
          '%)';
        slider.style.background = color;
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
}
</style>
