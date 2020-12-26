<template>
  <div id="app">
    <template v-if="!loading">
      <Header @logout="onLogout" :user="user"></Header>
      <div id="header-offset"></div>
      <router-view @login="onLogin"></router-view>
    </template>
    <div v-else class="spinner"></div>
  </div>
</template>

<script>
import './assets/css/styles.scss';
import Header from './components/Header.vue';

export default {
  data() {
    return {
      user: null,
      loading: true
    };
  },
  components: { Header },
  methods: {
    onLogin(user) {
      this.user = user;
    },
    onLogout() {
      this.user = null;
    }
  },
  created() {
    this.$http
      .get('http://localhost:3000/auth', { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          this.user = res.data.user;
          this.loading = false;
        } else {
          this.user = null;
          this.loading = false;
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
