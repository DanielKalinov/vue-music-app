<template>
  <div id="home">
    <div v-if="!user" id="banner-container">
      <div id="banner">
        <div id="banner-content">
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
    </div>
    <SongList v-else @play="onPlay" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongList from '../elements/SongList';

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
  #banner-container {
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-image: url('/banner_image.jpg');

    #banner {
      #banner-content {
        margin-left: 200px;
        border-radius: 6px;
        padding: 20px;
        max-width: 640px;
        background-color: rgba($color: black, $alpha: 0.4);

        p {
          margin-bottom: 20px;
        }

        .primary-btn {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
