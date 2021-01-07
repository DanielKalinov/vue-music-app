<template>
  <div id="app">
    <template v-if="!loading">
      <Header />
      <div id="header-offset"></div>
      <router-view></router-view>
      <Controls />
    </template>
    <div v-else class="spinner"></div>
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
  computed: {
    ...mapGetters(['user', 'loading'])
  }
};
</script>

<style lang="scss">
#app {
  margin: auto;
  max-width: 960px;

  #header-offset {
    margin-top: 61px;
  }
}
</style>
