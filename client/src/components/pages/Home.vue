<template>
  <div id="home">
    <div v-if="!user" id="banner-container">
      <div id="banner">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          doloremque quia culpa ab eaque harum temporibus est rerum nesciunt
          nihil!
        </p>
        <router-link to="/signup" class="button primary-btn"
          >Sign Up</router-link
        >
        <router-link to="/login" class="button secondary-btn"
          >Log In</router-link
        >
      </div>
    </div>
    <SongList v-else @play="onPlay" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongList from '../SongList';

export default {
  components: {
    SongList
  },
  methods: {
    onPlay() {
      this.$emit('play');
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
};
</script>

<style lang="scss" scoped>
#home {
  flex-grow: 1;

  #banner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: #3949ab;

    #banner {
      max-width: 960px;

      p {
        margin-bottom: 20px;
      }

      .primary-btn {
        margin-right: 10px;
      }
    }
  }
}
</style>
