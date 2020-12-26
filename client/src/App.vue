<template>
  <div id="app">
    <Header @logout="onLogout"></Header>
    <div id="header-offset"></div>
    <h1 v-if="user">{{ user.email }}</h1>
    <router-view @login="onLogin"></router-view>
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
