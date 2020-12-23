<template>
  <div id="app">
    <Header></Header>
    <div id="header-offset"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/styles.scss';
import Header from './components/Header.vue';

export default {
  components: { Header },
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
