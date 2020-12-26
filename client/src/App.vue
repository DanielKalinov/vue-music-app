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
  data() {
    return {
      user: null
    };
  },
  components: { Header },
  created() {
    this.$http
      .get('http://localhost:3000/auth', { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          this.user = res.data.user;
        } else {
          this.user = null;
        }
      });
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
