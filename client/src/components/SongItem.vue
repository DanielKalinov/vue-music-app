<template>
  <div class="song-item" :class="{ 'active-song-item': isActive }">
    <div class="song-item-header">
      <div class="song-item-post-info">
        <i class="material-icons">account_circle</i>
        <div>
          <p>{{ song.author }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
    </div>
    <div class="song-item-main">
      <p class="song-item-description">{{ song.description }}</p>
      <div class="song-item-player">
        <div class="song-item-metainfo">
          <img
            :src="`http://localhost:3000/songimage/${song.artworkFilename}`"
          />
          <div class="song-item-info">
            <p
              class="song-item-title"
              :class="{
                'active-song-item': currentSong && currentSong._id === song._id
              }"
            >
              {{ song.title }}
            </p>
            <p class="song-item-artist">{{ song.artist }}</p>
          </div>
        </div>
        <i
          class="material-icons song-item-play-pause-btn"
          @click="playPause(song)"
          >{{ playPauseButton }}</i
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['song', 'index'],
  methods: {
    playPause(song) {
      this.$store.dispatch('playPause', { song, index: this.index });
      this.$emit('play');
    }
  },
  computed: {
    ...mapGetters(['currentSong', 'paused']),
    isActive() {
      if (this.currentSong && this.currentSong._id === this.song._id) {
        return true;
      } else {
        return false;
      }
    },
    date() {
      const date = new Date(this.song.date);
      return date.toDateString();
    },
    playPauseButton() {
      if (this.currentSong === this.song) {
        if (this.paused) {
          return 'play_arrow';
        } else {
          return 'pause';
        }
      } else {
        return 'play_arrow';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/styles.scss';

.song-item {
  display: inline-block;
  margin: 10px;
  width: 100%;
  padding: 20px;
  background-color: #212121;
  border-radius: 6px;

  .song-item-header {
    .song-item-post-info {
      display: flex;
      align-items: center;
    }
    i {
      font-size: 40px;
      margin-right: 10px;
    }
  }

  .song-item-main {
    .song-item-description {
      margin: 20px 0;
    }

    .song-item-player {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: solid 1px #424242;
      border-radius: 6px;
      padding: 20px;

      img {
        margin-right: 20px;
        border-radius: 6px;
        height: 140px;
        width: 140px;
        object-fit: cover;
        box-shadow: 0 4px 10px 2px rgba($color: black, $alpha: 0.4);
      }

      .song-item-metainfo {
        display: flex;
        align-items: center;

        .song-item-info {
          .song-item-title {
            font-weight: bold;
          }

          .song-item-artist {
            font-size: 14px;
            color: #9e9e9e;
          }
        }
      }

      .song-item-play-pause-btn {
        border-radius: 50%;
        padding: 10px;
        font-size: 40px;
        cursor: pointer;
        background-color: $primary;
        color: #212121;
        transition: all 0.1s ease-in-out;

        &:hover {
          background-color: lighten($color: $primary, $amount: 10);
        }
      }
    }
  }
}

.active-song-item {
  color: $primary;
}
</style>
