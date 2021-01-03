<template>
  <div id="app">
    <template v-if="!loading">
      <Header></Header>
      <div id="header-offset"></div>
      <router-view></router-view>
      <!-- <audio controls>
        <source src="http://localhost:3000/stream" type="audio/mpeg" />
      </audio> -->
    </template>
    <div v-else class="spinner"></div>
  </div>
</template>

<script>
import './assets/css/styles.scss';
import Header from './components/Header.vue';
import { mapGetters } from 'vuex';

export default {
  components: { Header },
  computed: {
    ...mapGetters(['user', 'loading'])
  },
  created() {
    this.$store.dispatch('auth');
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
