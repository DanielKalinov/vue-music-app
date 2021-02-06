<template>
  <div class="song-item" :class="{ 'active-song-item': isActive }">
    <div class="song-item-header">
      <div class="song-item-post-info">
        <i class="material-icons song-item-account-icon">account_circle</i>
        <div>
          <p>{{ song.author }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
      <i
        v-if="song.author === user.username"
        class="material-icons song-item-edit-icon"
        @click="navigateToEditPage"
        >create</i
      >
    </div>
    <div class="song-item-main">
      <p class="song-item-description">{{ song.description }}</p>
      <div
        class="song-item-player"
        :class="{
          'song-item-player-active': currentSong && currentSong._id === song._id
        }"
      >
        <div class="song-item-metainfo">
          <img
            :src="`http://localhost:3000/songimage/${song.artworkFilename}`"
          />
          <div class="song-item-info">
            <p class="song-item-title">
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
    <div class="song-item-actions">
      <i
        v-if="song.author !== user.username"
        class="material-icons song-item-favorite-btn"
        :class="{ 'favorite-btn-liked': liked }"
        @click="addToFavorites({ song, userID: user.userID })"
        >favorite</i
      >
      <i
        v-if="song.author === user.username"
        class="material-icons song-itme-delete-btn"
        @click="deleteSong({ id: song._id })"
        >delete</i
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['song', 'index'],
  methods: {
    ...mapActions(['addToFavorites', 'deleteSong']),
    playPause(song) {
      this.$store.dispatch('playPause', {
        song,
        index: this.index,
        playlist: 'allSongs'
      });
      this.$emit('play');
    },
    navigateToEditPage() {
      this.$router.push({
        path: `/editsong/${this.song._id}`
      });
    }
  },
  computed: {
    ...mapGetters(['currentSong', 'paused', 'user']),
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
    liked() {
      const songIsFavorite = this.user.favoriteSongs.find(
        (favoriteSong) => favoriteSong._id === this.song._id
      );
      if (songIsFavorite) {
        return true;
      } else {
        return false;
      }
    },
    playPauseButton() {
      if (this.currentSong && this.currentSong._id === this.song._id) {
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
@import '../../assets/css/SongItem.scss';
</style>
