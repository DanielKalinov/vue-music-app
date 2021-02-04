<template>
  <header>
    <template v-if="user">
      <ul id="nav-links">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/uploadsong">Upload</router-link>
        </li>
        <li>
          <router-link to="/favorites">Favorites</router-link>
        </li>
      </ul>
      <ul id="auth-links">
        <li>
          <p>{{ user.username }}</p>
        </li>
        <li>
          <button @click="logOut" id="logoutBtn" class="button secondary-btn">
            Log Out
          </button>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul id="nav-links">
        <li>
          <router-link to="/">Home</router-link>
        </li>
      </ul>
      <ul id="auth-links">
        <li>
          <router-link to="/signup" id="signupBtn" class="button primary-btn"
            >Sign Up</router-link
          >
        </li>
        <li>
          <router-link to="/login" id="loginBtn" class="button secondary-btn"
            >Log In</router-link
          >
        </li>
      </ul>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logOut'])
  }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  background-color: rgba($color: #212121, $alpha: 0.8);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px 2px rgba($color: #000, $alpha: 0.4);

  ul {
    display: flex;
    align-items: center;
    list-style: none;

    li {
      a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
      }

      p {
        padding: 10px;
        user-select: none;
      }
    }
  }

  #signupBtn {
    margin-right: 10px;
  }
}
</style>
