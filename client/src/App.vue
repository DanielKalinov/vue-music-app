<template>
  <div id="app">
    <template v-if="!loading">
      <template v-if="user">
        <Header />
        <div id="header-offset"></div>
        <Controls ref="controls" :currentTime="currentTime" />
      </template>
      <router-view @play="onPlay" v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
      <div v-if="user" id="controls-offset"></div>
    </template>
    <template v-else>
      <div class="spinner"></div>
    </template>
  </div>
</template>

<script>
import './assets/css/styles.scss';
import Header from './components/elements/Header.vue';
import Controls from './components/elements/Controls.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      currentTime: '0:00'
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
        if (!sliderValueInPercent) {
          slider.value = 0;
        }
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
  #header-offset {
    margin-top: 61px;
  }

  #controls-offset {
    margin-bottom: 84px;
  }
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active {
  transition: opacity 0.1s ease-out;
}

.route-leave-active {
  transition: opacity 0.1s ease-in;
}
</style>
